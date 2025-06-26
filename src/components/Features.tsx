
import { Palette, Zap, Download, Smartphone } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant Transformation",
      description: "Paste your tweet or thought and get a beautiful Instagram post in seconds. No design skills required.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Palette,
      title: "Light & Dark Versions",
      description: "Every post comes in both light and dark themes, giving you options for different moods and audiences.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Smartphone,
      title: "Perfect Square Format",
      description: "Optimized for Instagram's square format with beautiful typography and spacing.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Download,
      title: "Ready to Share",
      description: "Download high-quality images ready for posting. No watermarks, just your content looking amazing.",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Why content creators{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              love Thready
            </span>
          </h2>
          <p className="text-lg leading-8 text-gray-600">
            Simple, powerful features that make sharing your thoughts beautiful and effortless.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 animate-fade-in delay-1000">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full px-6 py-3 border border-purple-200 hover:scale-105 transition-transform duration-300">
            <span className="text-purple-700 font-medium">Ready to transform your content?</span>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
