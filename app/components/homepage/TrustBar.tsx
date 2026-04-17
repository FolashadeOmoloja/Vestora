export default function TrustBar() {
  const items = [
    "Vestora",
    "CBN Licensed",
    "NDIC Protected",
    "Bank-Grade Security",
    "15,000+ Investors",
    "₦4.2B+ Managed",
  ];

  return (
    <div className="bg-[#e8f5ed] border-b border-[#c6e8d0] py-3 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-3 text-[#1a5c2e] text-xs font-medium">
            {item}
            {i < items.length - 1 && (
              <span className="text-[#a0cdb0] hidden sm:inline">·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
