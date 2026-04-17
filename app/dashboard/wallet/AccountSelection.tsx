import { linkedAccounts } from "@/app/utils/dummy";
import { formatCurrency, handleAccountSelect } from "@/app/utils/Functions";
import { CreditCard } from "lucide-react";

const AccountSelection = ({
  selectedAccount,
  setSelectedAccount,
  label,
}: any) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0a2e16] mb-3">
        {label}
      </label>
      <div className="space-y-2">
        {linkedAccounts.map((account) => (
          <div
            key={account.id}
            onClick={() => handleAccountSelect(account, setSelectedAccount)}
            className={`p-3 border-[1.5px] rounded-lg cursor-pointer transition-all ${
              selectedAccount?.id === account.id
                ? "border-[#0a2e16] "
                : "border-gray-200 hover:border-[#0a2e16]"
            }`}
          >
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#0a2e16] rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {account.name}
                    </span>
                    {account.isPrimary && (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    ****{account.number.slice(-4)} • {account.type}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {formatCurrency(account.balance)}
                </p>
                <p className="text-xs text-gray-500">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSelection;
