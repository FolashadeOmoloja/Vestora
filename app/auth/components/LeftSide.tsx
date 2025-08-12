import { Shield, TrendingUp, Banknote, Building } from "lucide-react";
import React, { useEffect, useState } from "react";

const LeftSide = () => {
  // Animated elements state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [floatingElements, setFloatingElements] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  // Initialize floating elements
  useEffect(() => {
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 20,
      y: Math.random() * 20,
      delay: Math.random() * 2,
    }));
    setFloatingElements(elements);
  }, []);

  // Slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: "Secure Treasury Investments",
      description:
        "Invest in Nigerian Treasury Bills with guaranteed returns and government backing",
      icon: "/coins.gif",
      gradient: "from-white to-white",
    },
    {
      title: "Competitive Returns",
      description:
        "Earn attractive interest rates on your investments with flexible tenure options",
      icon: "/coins.gif",
      gradient: "from-green-600 to-green-800",
    },
    {
      title: "Instant Liquidity",
      description:
        "Access your funds quickly with our seamless redemption process",
      icon: "/coins.gif",
      gradient: "from-orange-600 to-orange-800",
    },
  ];
  return (
    <div className="flex-1 relative bg-gradient-to-br from-[#002C6C] via-[#003d8a] to-[#0056b3] overflow-hidden">
      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0">
        <div
          className="absolute top-40 left-10 w-20 h-20 border border-white border-opacity-20 rounded-full animate-spin opacity-30"
          style={{ animationDuration: "20s" }}
        />
        <div className="absolute top-10 right-32 w-24 h-24 border border-[#FFD100] border-opacity-15 rounded-lg animate-pulse" />
        <div className="absolute bottom-20 left-16 rotate-130  w-16 h-16 border border-[#FFD100] border-opacity-15 rounded-lg animate-pulse" />

        <div
          className="absolute bottom-20 right-20 w-20 h-20 border-2 border-white border-opacity-20 rotate-45 animate-spin opacity-40"
          style={{ animationDuration: "15s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full p-12 text-center">
        {/* Sliding Content */}
        <div className="max-w-sm w-full mx-auto">
          <div className="relative h-50 overflow-hidden">
            {slides.map((slide, index) => {
              const Icon = slide.icon;
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 transform ${
                    currentSlide === index
                      ? "translate-x-0 opacity-100"
                      : index < currentSlide
                      ? "-translate-x-full opacity-0"
                      : "translate-x-full opacity-0"
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 `}
                    >
                      <img src={slide.icon} alt="" className="w-full h-full" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {slide.title}
                    </h3>
                    <p className="text-blue-100 text-base leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-7">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
};

export default LeftSide;
