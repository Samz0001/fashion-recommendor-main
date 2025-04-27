import os
import tempfile
import shutil
import logging
from pathlib import Path
from io import BytesIO

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from rembg import remove
from PIL import Image
from ultralytics import YOLO
import python_weather
from recom_screenshot import RecOutfit  # make sure this file exists and is correct

# ─── Constants ──────────────────────────────────────────────────────────────
WEATHER_API_KEY = " 34e121927666d0e27871fff871970f46"

# ─── Logger Setup ────────────────────────────────────────────────────────────
logging.basicConfig(filename="app.log", level=logging.INFO,
                    format="%(asctime)s [%(levelname)s] - %(message)s")

# ─── FastAPI App Setup ───────────────────────────────────────────────────────
app = FastAPI(debug=True, title="Fashion AI",
              summary="This API Provides Access to all Endpoints of Fashion AI Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Helper Functions ────────────────────────────────────────────────────────

def remove_bg(img):
    removedBGimage = remove(img)
    return removedBGimage

def extract(source_path):
    model = YOLO("model/best.pt")  # Ensure this path is correct
    results = model.predict(source=source_path, conf=0.4, save=False)
    class_names = ['sunglass', 'hat', 'jacket', 'shirt', 'pants', 'shorts', 'skirt', 'dress', 'bag', 'shoe']
    source = Image.open(source_path)
    items_list = []

    for result in results:
        for box in result.boxes.xyxy:
            x_min, y_min, x_max, y_max = box
            label_index = int(result.boxes.cls.tolist()[0])
            label_name = class_names[label_index]
            if label_name.lower() not in ['sunglass', 'hat', 'bag']:
                cropped = source.crop((float(x_min), float(y_min), float(x_max), float(y_max)))
                items_list.append({label_name: cropped})
    return items_list

# ─── Endpoints ───────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "Hello from Fashion AI"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    return {"style": "casual"}  # dummy endpoint, you can modify later

@app.post("/remove_background/")
async def remove_background(file: UploadFile = File(...)):
    try:
        upload_dir = Path("temp")
        upload_dir.mkdir(parents=True, exist_ok=True)

        file_path = upload_dir / file.filename
        with open(file_path, "wb") as image_file:
            shutil.copyfileobj(file.file, image_file)

        image = Image.open(file_path)
        removed_bg_image = remove_bg(image)

        shutil.rmtree(upload_dir, ignore_errors=True)

        with BytesIO() as temp_buffer:
            removed_bg_image.save(temp_buffer, format="PNG")
            temp_buffer.seek(0)

            with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as temp_file:
                temp_file.write(temp_buffer.read())
                temp_file_path = temp_file.name

        return FileResponse(temp_file_path, media_type="image/png", headers={"Content-Disposition": "attachment; filename=removed.png"})

    except Exception as e:
        logging.error(f"Remove Background Error: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/extract/")
async def upload_and_extract(file: UploadFile = File(...)):
    try:
        upload_dir = Path("temp")
        upload_dir.mkdir(parents=True, exist_ok=True)

        file_path = upload_dir / file.filename
        with open(file_path, "wb") as image_file:
            shutil.copyfileobj(file.file, image_file)

        items_list = extract(file_path)
        images_list = []

        for item in items_list:
            image_name, image = list(item.items())[0]
            image = remove_bg(image)
            save_path = upload_dir / f"{image_name}.png"
            image.save(save_path)
            images_list.append({'name': image_name, 'image_path': str(save_path)})

        shutil.rmtree(upload_dir, ignore_errors=True)
        return JSONResponse(content={"extracted_items": images_list})

    except Exception as e:
        logging.error(f"Extract Error: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/getweather/{area}")
async def get_weather(area: str):
    try:
        async with python_weather.Client(unit=python_weather.IMPERIAL) as client:
            weather = await client.get(area)
            temperature_f = weather.current.temperature
            temperature_c = (temperature_f - 32) * 5/9
            season = 'winter' if temperature_c < 25 else 'summer'

            return {
                "temperature_celsius": temperature_c,
                "season": season,
                "description": weather.current.description,
                "kind": str(weather.current.kind)
            }
    except Exception as e:
        logging.error(f"Weather Fetch Error: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/get_recommendation/")
async def get_recommendation(file: UploadFile, Gender: str, Ocassion: str, Season: str):
    try:
        upload_dir = Path("temp")
        upload_dir.mkdir(parents=True, exist_ok=True)

        file_path = upload_dir / file.filename
        with open(file_path, "wb") as image_file:
            shutil.copyfileobj(file.file, image_file)

        input_image = {
            'image_path': file_path,
            'Image Tags': {
                'Gender': Gender.lower(),
                'Season': Season.lower(),
                'Occasion': Ocassion.lower()
            }
        }

        recoutfit = RecOutfit(input_image, 'Wardrobe')
        recommended_outfit, recommended_image = recoutfit.controller()

        with BytesIO() as temp_buffer:
            recommended_image.save(temp_buffer, format="JPEG")
            temp_buffer.seek(0)

            with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
                temp_file.write(temp_buffer.read())
                temp_file_path = temp_file.name

        shutil.rmtree(upload_dir, ignore_errors=True)
        return FileResponse(temp_file_path, media_type="image/jpeg", headers={"Content-Disposition": "attachment; filename=recommendation.jpg"})

    except Exception as e:
        logging.error(f"Recommendation Error: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/get_recommendations_collage/")
async def get_recommendations_collage(file: UploadFile, Gender: str, Ocassion: str, Season: str):
    try:
        upload_dir = Path("temp")
        upload_dir.mkdir(parents=True, exist_ok=True)

        file_path = upload_dir / file.filename
        with open(file_path, "wb") as image_file:
            shutil.copyfileobj(file.file, image_file)

        items_list = extract(file_path)
        collage_images = []

        for item in items_list:
            image_name, image = list(item.items())[0]
            image = remove_bg(image)

            temp_img_path = upload_dir / "temp.png"
            image.save(temp_img_path)

            input_image = {
                'image_path': file_path,
                'Image Tags': {
                    'Gender': Gender.lower(),
                    'Season': Season.lower(),
                    'Occasion': Ocassion.lower()
                }
            }

            recoutfit = RecOutfit(input_image, 'Wardrobe')
            _, rec_image = recoutfit.controller()
            collage_images.append(rec_image)

        try:
            os.remove(temp_img_path)
        except Exception as e:
            logging.warning(f"Temp Image Cleanup Warning: {e}")

        total_width = sum(img.width for img in collage_images)
        max_height = max(img.height for img in collage_images)
        collage = Image.new("RGB", (total_width, max_height))

        x_offset = 0
        for img in collage_images:
            collage.paste(img, (x_offset, 0))
            x_offset += img.width

        with BytesIO() as temp_buffer:
            collage.save(temp_buffer, format="JPEG")
            temp_buffer.seek(0)

            with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
                temp_file.write(temp_buffer.read())
                temp_file_path = temp_file.name

        shutil.rmtree(upload_dir, ignore_errors=True)
        return FileResponse(temp_file_path, media_type="image/jpeg", headers={"Content-Disposition": "attachment; filename=collage.jpg"})

    except Exception as e:
        logging.error(f"Collage Recommendation Error: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)

# ─── Uvicorn Direct Run Support ──────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
