// src/features/FeatureExtractor.tsx
import React, { useState } from 'react';
import { Tag, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import ToolCard from '../components/ToolCard';
import ImageUpload from '../components/ImageUpload';
import api from '../api'; // Make sure baseURL is correct

// Define the shape of each extracted item
interface ExtractedItem {
  name: string;
  image_path: string;
}

const FeatureExtractor: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<ExtractedItem[]>([]);

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleExtract = async () => {
    if (!uploadedImage) {
      toast.error('Please upload an image first');
      return;
    }

    setIsLoading(true);
    setItems([]);

    try {
      const formData = new FormData();
      formData.append('file', uploadedImage);

      const response = await api.post<{ extracted_items: ExtractedItem[] }>(
        '/extract/', // Corrected endpoint based on your backend
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setItems(response.data.extracted_items);
      toast.success('Items extracted successfully!');
    } catch (err) {
      console.error('Extract Error:', err);
      toast.error('Failed to extract items.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolCard title="Feature Extractor" icon={<Tag size={24} />}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload + Button */}
          <div className="space-y-4">
            <ImageUpload onImageUpload={handleImageUpload} />

            {imagePreview && (
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <img src={imagePreview} alt="Uploaded Preview" className="object-cover w-full h-48" />
              </div>
            )}

            <button
              onClick={handleExtract}
              disabled={isLoading}
              className="w-full btn btn-primary flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Extracting...
                </>
              ) : (
                <>
                  <UploadCloud className="h-4 w-4" />
                  Extract Features
                </>
              )}
            </button>
          </div>

          {/* Results Panel */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Extracted Items
            </h3>

            {items.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  {isLoading
                    ? 'Analyzing image for fashion pieces...'
                    : 'Upload a clothing image to detect items.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                  >
                    <img
                      src={`http://localhost:8000/${item.image_path}`}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-md mb-2"
                    />
                    <p className="text-sm font-semibold text-gray-700 dark:text-white">
                      {item.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolCard>
  );
};

export default FeatureExtractor;
