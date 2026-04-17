import { RefreshCw, CheckCircle } from "lucide-react";
import { useState } from "react";

export const AutoRollover = () => {
  const [autoRollover, setAutoRollover] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleRolloverToggle = () => {
    setAutoRollover(!autoRollover);
    if (!autoRollover) {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#0a2e16] flex items-center gap-2">
        <RefreshCw className="w-5 h-5" />
        Auto-Rollover Settings
      </h3>

      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <p className="text-green-700 font-medium">
            Your investments will automatically renew at maturity
          </p>
        </div>
      )}

      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
        <div>
          <p className="text-[#333333] font-medium text-lg">
            Auto-Rollover Status
          </p>
          <p className="text-sm text-gray-500">
            Automatically reinvest maturing NTBs
          </p>
        </div>
        <button
          onClick={handleRolloverToggle}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
            autoRollover ? "bg-teal-700" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
              autoRollover ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {autoRollover && (
        <div className="space-y-4  rounded-lg">
          <h4 className="font-semibold text-[#0a2e16]">
            Default Rollover Preferences
          </h4>

          <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white">
            <div>
              <p className="text-[#333333] font-medium">
                Notification before rollover
              </p>
              <p className="text-sm text-gray-500">
                Notify me 48hrs before auto-rollover
              </p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-teal-700">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
