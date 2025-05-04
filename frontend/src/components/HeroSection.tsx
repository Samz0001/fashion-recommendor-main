import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Style Smarter with AI
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Capture or upload your look and get smart outfit suggestions powered by AI and weather insights.
            </p>
            <div className="mt-8">
            <Link
        to="/auth"
        className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 transition-all duration-200 transform hover:-translate-y-0.5"
      >
        <Sparkles className="mr-2 h-5 w-5" />
        Get Recommendations
      </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3775120/pexels-photo-3775120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Fashion AI Demo" 
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-sm font-semibold mb-1">AI RECOMMENDATION</div>
                  <div className="text-xl font-bold">Complete your look with a denim jacket</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;