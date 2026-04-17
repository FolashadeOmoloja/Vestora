interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "outline";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  className = "",
  variant = "default",
  type = "button",
  disabled = false,
}: ButtonProps) => {
  const baseClasses =
    "p-4 duration-200 rounded-lg text-base font-semibold transition-all duration-200 hover:scale-[0.98] hover:shadow-lg hover:shadow-[#3db86a]/20";
  const variantClasses =
    variant === "outline"
      ? "border border-[#3db86a] bg-white text-[#0a2e16] hover:bg-[#f4faf6] hover:shadow-lg hover:shadow-[#3db86a]/15"
      : "bg-[#3db86a] text-white hover:bg-[#35a55e] hover:shadow-lg hover:shadow-[#3db86a]/35";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className} disabled:bg-gray-300  disabled:cursor-not-allowed`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

export const DashboardBtn = ({
  cta,
  showYellowDot = true,
  onClick = () => {},
  className = "",
  disabled = false,
  loading = false,
  variant = "default",
  icon = null,
}: {
  cta: string;
  onClick?: () => void;
  showYellowDot?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: "default" | "outline";
  icon?: React.ReactNode | null;
}) => {
  const baseClasses = `w-full text-sm font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${className}`;
  const variantClasses =
    variant === "outline"
      ? ` ${
          disabled
            ? "border-2 border-gray-300 text-gray-500 cursor-not-allowed"
            : "border-2 border-[#3db86a] bg-white text-[#0a2e16] hover:bg-[#f4faf6] hover:shadow-lg hover:shadow-[#3db86a]/15"
        }  `
      : ` ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#3db86a] hover:bg-[#35a55e] text-white shadow-md hover:shadow-lg "
        }  `;

  return (
    <button
      className={` ${variantClasses} ${baseClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {showYellowDot && loading === false && (
        <span
          className={`w-2 h-2  rounded-full ${
            disabled ? "bg-gray-500" : "bg-white/90"
          }`}
        ></span>
      )}
      {loading && (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
      )}
      {cta}
    </button>
  );
};
