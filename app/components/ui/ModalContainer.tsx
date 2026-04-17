import { X } from "lucide-react";
import React from "react";

const ModalContainer = ({
  handleClose,
  children,
  Icon,
  heading,
  text,
  scroll = false,
  backdrop = "bg-black/60 backdrop-blur-sm",
}: {
  handleClose: () => void;
  children: React.ReactNode;
  Icon: React.ReactNode;
  heading: string;
  text: string;
  scroll?: boolean;
  backdrop?: string;
}) => {
  return (
    <div
      className={`fixed inset-0 ${backdrop} flex items-center justify-center z-50 p-4`}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full max-w-lg relative overflow-hidden transform transition-all ${
          scroll ? "max-h-[90vh] overflow-y-auto" : ""
        }`}
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#0a2e16] to-[#1a5c2e] px-6 py-4 relative">
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1 rounded-full bg-white/10"
            onClick={handleClose}
          >
            <X size={20} />
          </button>

          <div className="flex items-center space-x-2">
            <div className="bg-[#3db86a] p-2 rounded-lg text-white [&_svg]:text-white">
              {Icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{heading}</h2>
              <p className="text-white/70 text-sm">{text}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default ModalContainer;
