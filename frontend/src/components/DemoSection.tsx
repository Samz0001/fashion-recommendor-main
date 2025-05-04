import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

const DemoSection: React.FC = () => {
  return (
    <section id="get-started" className="py-16 md:py-24 bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">See it in Action</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of AI fashion recommendations with our interactive demo.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2 lg:w-2/5 bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
            <div className="p-4 bg-gray-800 text-white flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              <span className="font-medium">Camera View</span>
              <div className="ml-auto flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span className="text-xs">LIVE</span>
              </div>
            </div>
            <div className="aspect-[4/3] bg-gray-900 flex items-center justify-center relative">
              <img 
                src="https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Camera view" 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 border-4 border-white/30 m-4 pointer-events-none"></div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Capture
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                Upload Image
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 lg:w-2/5 bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
            <div className="p-4 bg-purple-600 text-white flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              <span className="font-medium">AI Recommendations</span>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Outfit Analysis</h3>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-700">Detected: <span className="font-medium">White t-shirt, dark jeans</span></p>
                  <p className="text-gray-700">Style: <span className="font-medium">Casual</span></p>
                  <p className="text-gray-700">Weather: <span className="font-medium">68°F, Partly Cloudy</span></p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">We Recommend</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src="https://images.pexels.com/photos/6046183/pexels-photo-6046183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Denim jacket" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2">
                    <p className="font-medium text-gray-900">Denim Jacket</p>
                    <p className="text-sm text-gray-600">Perfect for today's weather</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Sneakers" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2">
                    <p className="font-medium text-gray-900">White Sneakers</p>
                    <p className="text-sm text-gray-600">Completes your casual look</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-purple-600 text-white text-lg font-medium rounded-md hover:bg-purple-700 transition-all duration-200 transform hover:translate-y-[-2px] shadow-lg">
            Try It Now
          </button>
          <p className="mt-4 text-gray-600">No account required. Start getting recommendations instantly.</p>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;