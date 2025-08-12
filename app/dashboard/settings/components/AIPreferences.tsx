import { TrendingUp } from "lucide-react";
import { useState } from "react";

export const AIPreferences = () => {
  const [formData, setFormData] = useState({
    availableBudget: "500000",
    preferredTenor: "182",
    riskTolerance: "low",
    targetReturn: "15",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    transactions: true,
    maturity: true,
    aiAlerts: false,
  });

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#002C6C] flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        AI Investment Preferences
      </h3>
      <p className="text-gray-600">
        Used to personalize recommendations on the AI Forecast page.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="settings-label">Available Budget (₦)</label>
          <input
            type="number"
            value={formData.availableBudget}
            onChange={(e) =>
              setFormData({ ...formData, availableBudget: e.target.value })
            }
            className="form-input text-sm"
            placeholder="500,000"
          />
        </div>

        <div>
          <label className="settings-label">Preferred Tenor</label>
          <select
            value={formData.preferredTenor}
            onChange={(e) =>
              setFormData({ ...formData, preferredTenor: e.target.value })
            }
            className="form-input text-sm"
          >
            <option value="91">91 Days</option>
            <option value="182">182 Days</option>
            <option value="364">364 Days</option>
          </select>
        </div>

        <div>
          <label className="settings-label">Target Return (%)</label>
          <input
            type="number"
            value={formData.targetReturn}
            onChange={(e) =>
              setFormData({ ...formData, targetReturn: e.target.value })
            }
            className="form-input text-sm"
            placeholder="15"
          />
        </div>
        <div>
          <label className="settings-label">Risk Tolerance</label>
          <input
            type="text"
            value="Low"
            readOnly
            className="form-input text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
        <div>
          <p className="text-[#333333] font-medium">
            AI Recommendation Notifications
          </p>
          <p className="text-sm text-gray-500">
            Get notified of new AI recommendations
          </p>
        </div>
        <button
          onClick={() =>
            setNotifications({
              ...notifications,
              aiAlerts: !notifications.aiAlerts,
            })
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            notifications.aiAlerts ? "bg-teal-700" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              notifications.aiAlerts ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
};
