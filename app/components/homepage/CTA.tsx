export default function CTA({ onGetStarted }: { onGetStarted?: () => void }) {
  return (
    <section className="bg-[#0a2e16] py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-white text-3xl font-semibold mb-4">
          Ready to grow your wealth?
        </h2>
        <p className="text-white/55 text-base mb-8 max-w-md mx-auto">
          Join thousands of Nigerians building long-term wealth across T-Bills, stocks, mutual funds, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onGetStarted}
            className="bg-[#3db86a] hover:bg-[#35a55e] text-white font-medium px-7 py-3.5 rounded-lg text-sm transition-all hover:scale-[1.02]"
          >
            Create free account
          </button>
          <button className="border border-white/25 hover:border-white/50 text-white px-7 py-3.5 rounded-lg text-sm transition-colors">
            Explore investment options
          </button>
        </div>
        <p className="text-white/30 text-xs mt-5">No fees to sign up · KYC takes 5 minutes</p>
      </div>
    </section>
  );
}
