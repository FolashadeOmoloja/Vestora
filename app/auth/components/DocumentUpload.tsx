import Button from "@/app/components/ui/Button";
import { ArrowLeft, ArrowRight, CheckCircle, Upload, X } from "lucide-react";
import React, { useState } from "react";

interface PersonalDetailsData {
  documents: {
    idCard: File | null;
    utilityBill: File | null;
    passport: File | null;
  };
}

const DocumentUpload = ({
  onContinue,
  onBack,
}: {
  onContinue: () => void;
  onBack: () => void;
}) => {
  const [formData, setFormData] = useState<PersonalDetailsData>({
    documents: {
      idCard: null,
      utilityBill: null,
      passport: null,
    },
  });

  const handleContinue = () => {
    onContinue();
  };

  const handleBack = () => {
    onBack();
  };

  const handleFileUpload = (
    type: keyof PersonalDetailsData["documents"],
    file: File | null,
  ) => {
    setFormData((prev: PersonalDetailsData) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [type]: file,
      },
    }));
  };

  const FileUpload = ({
    type,
    label,
    accept,
    required = true,
    description,
  }: {
    type: keyof PersonalDetailsData["documents"];
    label: string;
    accept: string;
    required?: boolean;
    description: string;
  }) => {
    const file = formData.documents[type];

    return (
      <div className="space-y-2 text-[#0a2e16]">
        <label className="block text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
            file
              ? "border-green-300 bg-green-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          {file ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleFileUpload(type, null)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept={accept}
                  onChange={(e) =>
                    handleFileUpload(type, e.target.files?.[0] || null)
                  }
                  className="hidden"
                />
                <span className="text-[#1a5c2e] font-medium hover:underline">
                  Choose file
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-[#0a2e16] mb-4">
        Required documents
      </h3>

      <div className="space-y-4">
        <FileUpload
          type="idCard"
          label="Valid ID card"
          accept="image/*,.pdf"
          description="National ID, Driver's License, or International Passport (max 5MB)"
        />

        <FileUpload
          type="utilityBill"
          label="Proof of address"
          accept="image/*,.pdf"
          description="Utility bill not older than 3 months (max 5MB)"
        />

        <FileUpload
          type="passport"
          label="Passport photograph"
          accept="image/*"
          required={false}
          description="Optional: recent passport photo (max 2MB)"
        />

        <div className="flex justify-between gap-3 mt-8">
          <Button
            type="button"
            onClick={handleBack}
            variant="outline"
            className="min-w-50 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <Button
            type="button"
            onClick={handleContinue}
            className="min-w-50 flex items-center justify-center"
          >
            Next
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-500">
            Need help with document requirements?
            <span className="text-[#0a2e16] font-medium cursor-pointer hover:underline ml-1">
              View guidelines
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
