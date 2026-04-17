"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Products from "@/components/Products";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const router = useRouter();

  const handleLogin = () => router.push("/auth/login");
  const handleSignup = () => router.push("/auth/onboarding");

  return (
    <div className="min-h-screen bg-white">
      <Navbar onLogin={handleLogin} onSignup={handleSignup} />
      <Hero onGetStarted={handleSignup} />
      <TrustBar />
      <Products />
      <HowItWorks />
      <Features />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA onGetStarted={handleSignup} />
      <Footer />
    </div>
  );
}
