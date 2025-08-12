import { DashboardBtn } from "@/app/components/ui/Button";
import InvestmentModal from "../ntb-listing/InvestmentModal";
import { investDest } from "@/app/utils/TableData";

const AiRecommendations = ({
  ntb,
  modalOpen,
  setModalOpen,
  setSelectedInvesmtentDets,
  selectedInvesmtentDets,
  setActiveTab,
}: {
  ntb: any;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedInvesmtentDets: React.Dispatch<
    React.SetStateAction<investDest | null>
  >;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  selectedInvesmtentDets: investDest | null;
}) => {
  return (
    <div
      key={ntb.code}
      className="border border-gray-200 rounded-lg sm:p-6 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4 flex-wrap gap-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{ntb.code}</h3>
          <p className="text-sm text-gray-600">{ntb.description}</p>
        </div>
        <div className="flex items-center gap-2 ">
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              ntb.matchScore >= 90
                ? "bg-green-100 text-green-800"
                : ntb.matchScore >= 50
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {ntb.matchScore}% Match
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Rate</p>
          <p className="font-semibold text-green-600">{ntb.rate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Tenor</p>
          <p className="font-semibold">{ntb.tenor}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Min. Investment</p>
          <p className="font-semibold">₦{ntb.minInvestment}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Risk Level</p>
          <p
            className={`font-semibold ${
              ntb.risk === "Low"
                ? "text-green-600"
                : ntb.risk === "Medium"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {ntb.risk}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Why this matches you:</p>
        <div className="flex flex-wrap gap-2">
          {ntb.reasons.map((reason: string, idx: number) => (
            <span
              key={idx}
              className="px-3 py-1 bg-teal-50 text-teal-700 text-xs rounded-full"
            >
              {reason}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3 max-sm:flex-wrap">
        <DashboardBtn
          cta="Invest Now"
          className="basis-1/2"
          onClick={() => {
            setSelectedInvesmtentDets(ntb);
            setModalOpen(true);
          }}
        />
        <DashboardBtn
          cta="Learn More"
          className="basis-1/2"
          onClick={() => setActiveTab("chat")}
          variant="outline"
          showYellowDot={false}
        />

        {modalOpen && selectedInvesmtentDets && (
          <InvestmentModal
            onClose={() => setModalOpen(false)}
            investmentDetails={selectedInvesmtentDets}
            backdrop="bg-black/20 backdrop-blur-xs "
          />
        )}
      </div>
    </div>
  );
};

export default AiRecommendations;
