import {
  User,
  CheckCircle,
  Building2,
  ChevronRight,
  Shield,
  Lock,
} from "lucide-react";
import { useState } from "react";

export const AccountInfo = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Folashade Omoloja",
    phoneNumber: "+234 801 234 5678",
    email: "omolojashade@gmmail.com",
    bvn: "12345678901",
    dateOfBirth: "1990-01-15",
    address: "123 Victoria Island, Lagos",
    bankName: "First Bank Nigeria",
    accountNumber: "1234567890",
    accountName: "Folashade Omoloja",
  });

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#002C6C] flex items-center gap-2">
        <User className="w-5 h-5" />
        Account Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="settings-label">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="form-input text-sm"
          />
        </div>

        <div>
          <label className="settings-label">Phone Number</label>
          <input
            type="text"
            value={formData.phoneNumber}
            readOnly
            className="form-input text-sm"
          />
        </div>

        <div>
          <label className="settings-label">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="form-input text-sm"
          />
        </div>

        <div>
          <label className="settings-label">BVN</label>
          <div className="relative">
            <input
              type="text"
              value={formData.bvn}
              readOnly
              className="form-input text-sm"
            />
            <CheckCircle className="absolute right-3 top-5 w-5 h-5 text-teal-700" />
          </div>
          <p className="text-xs text-[#002C6C] mt-1">
            KYC Completed - Cannot be changed
          </p>
        </div>

        <div>
          <label className="settings-label">Date of Birth</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            className="form-input text-sm"
          />
        </div>

        <div>
          <label className="settings-label">Residential Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="form-input text-sm"
          />
        </div>
      </div>

      {/* Bank Account Details */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-[#002C6C] mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Bank Account Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="settings-label">Bank Name</label>
            <input
              type="text"
              value={formData.bankName}
              onChange={(e) =>
                setFormData({ ...formData, bankName: e.target.value })
              }
              className="form-input text-sm"
            />
          </div>
          <div>
            <label className="settings-label">Account Number</label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) =>
                setFormData({ ...formData, accountNumber: e.target.value })
              }
              className="form-input text-sm"
            />
          </div>
          <div>
            <label className="settings-label">Account Name</label>
            <input
              type="text"
              value={formData.accountName}
              onChange={(e) =>
                setFormData({ ...formData, accountName: e.target.value })
              }
              className="form-input text-sm"
            />
          </div>
        </div>
      </div>

      {/* Password Management */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-[#002C6C] mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Password Management
        </h4>
        <div className="space-y-4">
          <button className="flex items-center justify-between w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-[#333333]">Change Password</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#005377]" />
              <div>
                <p className="text-[#333333] font-medium">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security
                </p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorAuth(!twoFactorAuth)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFactorAuth ? "bg-[#FFD100]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFactorAuth ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
