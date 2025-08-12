import { useEffect, useState } from "react";

const LeftPanelSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 0, img: "/ntb1.jpg", text: "Secure Your Future with Treasury Bills" },
    {
      id: 1,
      img: "/ntb2.webp",
      text: "Invest in Government-Backed Securities",
    },
    { id: 2, img: "ntb4.png", text: "Its Safe, Secure and Reliable" },
    { id: 3, img: "ntb3.png", text: "No hassle, just seamless Investment" },
  ];

  const slideColors = [
    "bg-[#FFD100]",
    "bg-teal-500",
    "bg-amber-500",
    "bg-slate-400",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hidden md:flex-1 md:flex flex-col justify-center items-center relative bg-[#002C6C] bg-opacity-10 backdrop-blur-md">
      {/* Small text display box */}
      <div className="w-4/5 max-w-lg h-16 relative rounded-2xl  mb-6">
        {slides.map((slide, index) => (
          <div
            key={`text-${slide.id}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`w-[80%] p-4 h-full ${slideColors[index]} rounded-2xl flex items-center justify-center text-white font-sans font-semibold`}
            >
              {slide.text}
            </div>
          </div>
        ))}
      </div>

      {/* Main image slide container */}
      <div className="w-4/5 max-w-lg h-72 relative rounded-2xl overflow-hidden shadow-2xl">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-semibold">
              <img
                src={slide.img}
                alt={slide.text}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-3 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white bg-opacity-40 hover:bg-opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftPanelSlide;
// <div
//   className={`w-full h-full ${slide.color} flex items-center justify-center text-white text-2xl font-semibold`}
// >
//   {slide.text}
// </div>
