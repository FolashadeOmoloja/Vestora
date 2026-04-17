import { CheckCircle, Shield, RotateCw, AlertCircle } from "lucide-react";
import { DashboardBtn } from "../../components/ui/Button";
import { FaRotateRight, FaUserShield } from "react-icons/fa6";

const StatusCards = () => {
  // Mock data - you can replace with real data
  const kycProgress = {
    completed: 85,
    total: 100,
    status: "in-progress", // 'completed', 'in-progress', 'pending'
    nextStep: "Bank Verification",
  };

  const autoRollover = {
    enabled: true,
    activeBonds: 3,
    nextRollover: "Jul 25, 2025",
  };

  // Calculate progress ring stroke
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (kycProgress.completed / kycProgress.total) * circumference;

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full mt-8">
      {/* KYC Progress Card */}
      <section className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#e8f5ed] rounded-lg">
              <FaUserShield className="h-5 w-5 text-[#1a5c2e]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0a2e16] text-lg">
                Profile Progress
              </h3>
              <p className="text-sm text-gray-600">Complete your Profile</p>
            </div>
          </div>

          {/* Progress Ring */}
          <div className="relative w-20 h-20">
            <svg
              className="w-20 h-20 transform -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="#c6e8d0"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="#3db86a"
                strokeWidth="8"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-[#0a2e16]">
                {kycProgress.completed}%
              </span>
            </div>
          </div>
        </div>

        {/* Status Information */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                kycProgress.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : kycProgress.status === "in-progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {kycProgress.status === "completed"
                ? "Verified"
                : kycProgress.status === "in-progress"
                ? "In Progress"
                : "Pending"}
            </span>
          </div>

          {kycProgress.status !== "completed" && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Next Step:</span>
              <span className="text-sm font-medium text-[#1a5c2e] ">
                {kycProgress.nextStep}
              </span>
            </div>
          )}
        </div>

        <DashboardBtn
          cta={
            kycProgress.status === "completed"
              ? "View Certificate"
              : "Continue Verification"
          }
          className="mt-8"
        />
      </section>

      {/* Auto-Rollover Status Card */}
      <section className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#e8f5ed] rounded-lg">
              <FaRotateRight className="h-5 w-5 text-[#1a5c2e]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0a2e16] text-lg">
                Auto-Rollover
              </h3>
              <p className="text-sm text-gray-600">Automatic NTB renewals</p>
            </div>
          </div>

          {/* Status Toggle Visual */}
          <div className="flex flex-col items-end">
            <div
              className={`relative w-12 h-6 rounded-full transition-colors ${
                autoRollover.enabled ? "bg-[#3db86a]" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  autoRollover.enabled ? "translate-x-7" : "translate-x-1"
                }`}
              ></div>
              {autoRollover.enabled && (
                <div className="absolute top-1 left-1 w-4 h-4 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <span
              className={`text-xs mt-1 font-medium ${
                autoRollover.enabled ? "text-green-600" : "text-gray-500"
              }`}
            >
              {autoRollover.enabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        {/* Status Information */}
        <div className="space-y-3">
          {autoRollover.enabled ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Bonds:</span>
                <span className="text-sm font-medium text-[#1a5c2e]">
                  {autoRollover.activeBonds}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Next Rollover:</span>
                <span className="text-sm font-medium text-[#1a5c2e]">
                  {autoRollover.nextRollover}
                </span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-700 font-medium">
                    Your investments will automatically renew at maturity
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-xs text-yellow-700 font-medium">
                  Enable auto-rollover to avoid manual renewals
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}

        <DashboardBtn
          cta={
            autoRollover.enabled ? "Manage Settings" : "Enable Auto-Rollover"
          }
          className="mt-4"
        />
      </section>
    </div>
  );
};

export default StatusCards;
