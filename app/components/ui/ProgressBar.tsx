// Progress Bar Component
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: any[];
}

const ProgressBar = ({ currentStep, totalSteps, steps }: ProgressBarProps) => {
  return (
    <div className="w-full mb-14">
      {/* Progress Line */}
      <div className="relative flex items-center justify-between mb-2 max-sm:px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 -translate-y-1/2 z-0"></div>
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-[#3db86a] -translate-y-1/2 z-10 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>

        {/* Step Circles */}
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={stepNumber}
              className={`relative z-20 flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-all duration-300 ${
                isCompleted || isCurrent
                  ? "bg-[#3db86a] border-[#3db86a] text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {isCompleted ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                stepNumber
              )}
              {/* Step Labels */}

              <div
                className={`absolute flex gap-2 items-center top-9 text-sm font-medium transition-colors duration-300 ${
                  index + 1 <= currentStep ? "text-[#1a5c2e]" : "text-gray-400"
                }`}
              >
                {steps[index].icon}
                <span className="text-xs">{steps[index].label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
