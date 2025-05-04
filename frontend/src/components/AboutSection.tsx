import React from 'react';
import { Code, Database, Brain } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About Smart AI Fashion Recommender
          </h2>
          
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p className="text-lg">
              Smart AI Fashion Recommender is an innovative clothing recommendation tool that combines cutting-edge technologies. Built with a React frontend, FastAPI backend, MongoDB database, and custom machine learning logic, our platform has been trained on carefully curated fashion data to provide intelligent style suggestions.
            </p>
            
            <p className="text-lg">
              The platform supports real-time webcam uploads and provides intelligent recommendations based on multiple factors including current weather conditions, gender preferences, and occasion requirements. Our system continuously learns and adapts to emerging fashion trends, ensuring you always receive the most relevant and stylish suggestions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center text-primary-500 mb-4">
                  <Code size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Modern Tech Stack</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                  React, FastAPI, MongoDB
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center text-primary-500 mb-4">
                  <Database size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Smart Data</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                  Curated Fashion Database
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center text-primary-500 mb-4">
                  <Brain size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Powered</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                  Custom ML Algorithms
                </p>
              </div>
            </div>
            
            <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Team</h3>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">Mehak Goel</p>
                <p className="text-gray-600 dark:text-gray-300">Nikhil Sharma</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">Chitkara University</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;