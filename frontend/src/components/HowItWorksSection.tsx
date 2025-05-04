import React from 'react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  imageUrl: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, imageUrl }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg mb-6">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute -top-4 -left-4 h-10 w-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Capture Your Outfit",
      description: "Use your webcam or upload a photo of your current outfit or clothing item.",
      imageUrl: "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      number: 2,
      title: "AI Analysis",
      description: "Our AI analyzes your outfit, considering style, colors, patterns, and weather.",
      imageUrl: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      number: 3,
      title: "Get Personalized Recommendations",
      description: "Receive tailored fashion suggestions to complete or enhance your look.",
      imageUrl: "https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to elevate your style with AI-powered recommendations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              imageUrl={step.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;