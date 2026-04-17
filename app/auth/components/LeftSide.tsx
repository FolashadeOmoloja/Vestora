import React, { useEffect, useState } from "react";

const LeftSide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    },
    {
      title: "Competitive Returns",
      description:
        "Earn attractive interest rates on your investments with flexible tenure options",
      icon: "/coins.gif",
    },
    {
      title: "Instant Liquidity",
      description:
        "Access your funds quickly with our seamless redemption process",
      icon: "/coins.gif",
    },
  ];

  return (
    <div className="hidden lg:flex flex-1 relative bg-[#0a2e16] overflow-hidden min-h-screen">
      <div className="absolute inset-0">
        <div
          className="absolute top-40 left-10 w-20 h-20 border border-[#3db86a]/25 rounded-full animate-spin opacity-40"
          style={{ animationDuration: "20s" }}
        />
        <div className="absolute top-10 right-32 w-24 h-24 border border-[#3db86a]/20 rounded-lg animate-pulse" />
        <div className="absolute bottom-20 left-16 w-16 h-16 border border-white/10 rounded-lg animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-20 h-20 border-2 border-[#3db86a]/20 rotate-45 animate-spin opacity-30"
          style={{ animationDuration: "15s" }}
        />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full w-full p-12 text-center">
        <div className="max-w-sm w-full mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#3db86a]/15 border border-[#3db86a]/30 text-[#3db86a] text-xs px-3 py-1.5 rounded-full mb-8">
            Vestora · Treasury &amp; beyond
          </div>
          <div className="relative min-h-[280px] overflow-hidden">
            {slides.map((slide, index) => (
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
                  <div className="inline-flex items-center justify-center w-20 h-20 mb-6">
                    <img src={slide.icon} alt="" className="w-full h-full" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {slide.title}
                  </h3>
                  <p className="text-white/55 text-base leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
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
