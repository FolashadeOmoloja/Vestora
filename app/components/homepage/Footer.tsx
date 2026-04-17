const LINKS = {
  Products: ["Treasury Bills", "Mutual Funds", "Stocks", "ETFs", "Bonds", "Fixed Deposits"],
  Company: ["About Us", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Contact Us", "FAQ", "Status"],
  Legal: ["Terms & Conditions", "Privacy Policy", "CBN Disclaimers", "Risk Disclosure"],
};

export default function Footer() {
  return (
    <footer className="bg-[#071d0e] px-6 pt-14 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="text-white text-lg font-semibold mb-3">
              Vest<span className="text-[#3db86a]">ora</span>
            </p>
            <p className="text-white/35 text-xs leading-relaxed mb-4">
              Multi-asset investment platform backed by Vestora. CBN licensed and NDIC protected.
            </p>
            <div className="flex gap-2">
              {["iOS", "Android"].map((p) => (
                <button
                  key={p}
                  className="text-[10px] text-white/50 border border-white/15 px-2.5 py-1 rounded hover:border-white/35 transition-colors"
                >
                  {p} App
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white/70 text-xs font-semibold mb-4 uppercase tracking-wide">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/35 text-xs hover:text-white/70 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-xs">
            © 2025 Vestora. Licensed by the Central Bank of Nigeria.
          </p>
          <p className="text-white/20 text-xs max-w-sm text-right">
            Investments involve risk. Past performance does not guarantee future returns.
          </p>
        </div>
      </div>
    </footer>
  );
}
