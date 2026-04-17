const STEPS = [
  {
    num: "01",
    title: "Create your account",
    desc: "Complete KYC with your BVN, NIN, or passport in under 5 minutes. No branch visits.",
  },
  {
    num: "02",
    title: "Choose your investment",
    desc: "Browse T-Bills, mutual funds, stocks, ETFs, or bonds. Filter by return, risk, and tenor.",
  },
  {
    num: "03",
    title: "Fund & invest",
    desc: "Transfer from any Nigerian bank account. Investments confirmed instantly.",
  },
  {
    num: "04",
    title: "Track & grow",
    desc: "Monitor real-time performance, receive statements, and reinvest at maturity.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#f4f8f5] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#e8f5ed] text-[#1a5c2e] text-xs font-medium px-3 py-1 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-[#0a2e16] text-3xl font-semibold mb-3">
            Start investing in 4 simple steps
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            From sign-up to your first investment in under 10 minutes
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[26px] left-[12.5%] right-[12.5%] h-px bg-[#c6e8d0] z-0" />

          {STEPS.map((step, i) => (
            <div key={step.num} className="relative z-10 text-center">
              <div className="w-[52px] h-[52px] rounded-full border-2 border-[#3db86a] bg-white flex items-center justify-center mx-auto mb-5 text-[#0a2e16] text-base font-semibold">
                {step.num}
              </div>
              <h3 className="text-[#0a2e16] text-sm font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
