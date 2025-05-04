import React from 'react';
import { Brain, CloudSun, User, Camera } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100 h-full">
      <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Brain size={24} />,
      title: "AI-Based Outfit Predictions",
      description: "Our advanced machine learning algorithms analyze your outfit and suggest complementary items for a complete look."
    },
    {
      icon: <CloudSun size={24} />,
      title: "Real-Time Weather Integration",
      description: "Get outfit recommendations that adapt to your local weather conditions so you're always dressed appropriately."
    },
    {
      icon: <User size={24} />,
      title: "Personalized Recommendations",
      description: "Tailored suggestions based on your gender, occasion, and personal style preferences."
    },
    {
      icon: <Camera size={24} />,
      title: "Style Prediction from Images",
      description: "Capture your current outfit with your webcam or upload a photo to get instant style recommendations."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Smart Features for Smarter Style</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI fashion recommender combines cutting-edge technology with fashion expertise
            to help you look your best.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;