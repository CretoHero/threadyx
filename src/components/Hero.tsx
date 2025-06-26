
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 sm:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Logo/Brand */}
          <div className="mb-8 flex justify-center animate-fade-in">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Thready
              </span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6 animate-fade-in delay-200">
            Transform your{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              tweets
            </span>{" "}
            into stunning{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Instagram posts
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl leading-8 text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in delay-300">
            Turn your thoughts and tweets into beautiful, shareable square posts perfect for Instagram. 
            Get both light and dark versions instantly.
          </p>

          {/* CTA Button with Auth Logic */}
          <div className="flex justify-center animate-fade-in delay-500">
            <SignedOut>
              <SignInButton fallbackRedirectUrl="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center space-x-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-12 h-12"
                    }
                  }}
                />
              </div>
            </SignedIn>
          </div>

          {/* Social proof or feature highlight */}
          <div className="mt-16 flex justify-center animate-fade-in delay-700">
            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Instant Generation</span>
              </div>
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
                <span>Light & Dark Versions</span>
              </div>
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-400"></div>
                <span>Instagram Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
