import { Bell } from "lucide-react";
import { useState } from "react";

// 1. Define keys as a union type
type NotificationKey =
  | "email"
  | "sms"
  | "transactions"
  | "maturity"
  | "aiAlerts";

// 2. Define the shape of the notification state
type NotificationState = Record<NotificationKey, boolean>;

export const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationState>({
    email: true,
    sms: true,
    transactions: true,
    maturity: true,
    aiAlerts: false,
  });

  // 3. Define your list with correct typing
  const notificationOptions: {
    key: NotificationKey;
    label: string;
    desc: string;
  }[] = [
    {
      key: "email",
      label: "Email Alerts",
      desc: "Receive important updates via email",
    },
    {
      key: "sms",
      label: "SMS Alerts",
      desc: "Get SMS notifications for critical actions",
    },
    {
      key: "transactions",
      label: "Transaction Notifications",
      desc: "Notify me of all transactions",
    },
    {
      key: "maturity",
      label: "Maturity Reminders",
      desc: "Remind me when investments mature",
    },
    {
      key: "aiAlerts",
      label: "AI Forecast Alerts",
      desc: "Get AI-powered investment recommendations",
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#0a2e16] flex items-center gap-2">
        <Bell className="w-5 h-5" />
        Preferences & Notifications
      </h3>

      <div className="space-y-4">
        {notificationOptions.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 border border-gray-300 rounded-lg"
          >
            <div>
              <p className="text-[#333333] font-medium">{item.label}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
            <button
              onClick={() =>
                setNotifications((prev) => ({
                  ...prev,
                  [item.key]: !prev[item.key],
                }))
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications[item.key] ? "bg-teal-700" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications[item.key] ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
