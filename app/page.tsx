"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Shield,
  Clock,
  DollarSign,
  Repeat,
  FileText,
  Brain,
  Star,
  Download,
  Menu,
  X,
  ArrowRight,
  Check,
  Play,
  TrendingUp,
  BarChart3,
  PieChart,
} from "lucide-react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [stats, setStats] = useState({
    totalInvestors: 0,
    totalInvestments: 0,
    averageReturn: 0,
    activeTbills: 0,
  });

  const animatedWords = ["with Ease", "Securely", "Seamlessly"];
  const router = useRouter();

  const sectionRefs = {
    hero: useRef(null),
    howItWorks: useRef(null),
    features: useRef(null),
    stats: useRef(null),
    testimonial: useRef(null),
    apps: useRef(null),
    faq: useRef(null),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % animatedWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSections((prev) => new Set([...prev, key]));
              }
            });
          },
          { threshold: 0.1, rootMargin: "50px" }
        );

        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  // Animate stats when stats section is visible
  useEffect(() => {
    if (visibleSections.has("stats")) {
      const targetStats = {
        totalInvestors: 15847,
        totalInvestments: 2.8,
        averageReturn: 17.2,
        activeTbills: 156,
      };

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setStats({
          totalInvestors: Math.floor(targetStats.totalInvestors * progress),
          totalInvestments: Number(
            (targetStats.totalInvestments * progress).toFixed(1)
          ),
          averageReturn: Number(
            (targetStats.averageReturn * progress).toFixed(1)
          ),
          activeTbills: Math.floor(targetStats.activeTbills * progress),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setStats(targetStats);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [visibleSections]);

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Bank-Grade Security",
      description:
        "Built on FirstBank's trusted infrastructure with enterprise-grade security protocols.",
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Fast Onboarding",
      description:
        "Quick KYC verification and account setup in minutes, not days.",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      title: "Fixed Returns",
      description:
        "Guaranteed returns with competitive treasury bill rates up to 18% per annum.",
    },
    {
      icon: <Repeat className="w-8 h-8 text-blue-600" />,
      title: "Auto Rollover",
      description:
        "Seamlessly reinvest your matured investments with automated rollover options.",
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Digital Receipts",
      description:
        "Instant proof of investment certificates and transaction receipts.",
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: "Smart Recommendations",
      description:
        "AI-powered investment suggestions based on your portfolio and goals.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Onboard Easily",
      description:
        "Complete KYC with your BVN and link your bank account securely",
    },
    {
      number: "02",
      title: "View Available T-Bills",
      description:
        "Browse treasury bills with different tenors, rates, and maturity dates",
    },
    {
      number: "03",
      title: "Invest & Track",
      description:
        "Make investments and monitor your portfolio with real-time updates",
    },
  ];

  const faqs = [
    {
      question: "What are Treasury Bills?",
      answer:
        "Treasury Bills are short-term government securities with maturities ranging from 91 to 364 days. They offer fixed returns and are backed by the Federal Government of Nigeria.",
    },
    {
      question: "How secure are my investments?",
      answer:
        "Your investments are secured by FirstBank's enterprise-grade security infrastructure and are backed by the Federal Government of Nigeria through the Central Bank.",
    },
    {
      question: "What is the minimum investment amount?",
      answer:
        "You can start investing with as little as ₦10,000, making treasury bills accessible to everyone.",
    },
    {
      question: "Can I liquidate my investment early?",
      answer:
        "Yes, you can request early liquidation through the platform. The treasury desk will review and approve eligible requests.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-900">
                  FirstBank Treasury
                </h1>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#how-it-works"
                  className="text-gray-600 hover:text-blue-900 px-3 py-2 text-sm font-medium"
                >
                  How it Works
                </a>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-900 px-3 py-2 text-sm font-medium"
                >
                  Features
                </a>
                <a
                  href="#faq"
                  className="text-gray-600 hover:text-blue-900 px-3 py-2 text-sm font-medium"
                >
                  FAQ
                </a>
                <button
                  className="text-blue-900  font-medium hover:text-blue-800 hover:text-shadow-2xs transition-colors"
                  onClick={() => router.push("/auth/login")}
                >
                  Login
                </button>
                <button
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                  onClick={() => router.push("/auth/onboarding")}
                >
                  Sign up
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#how-it-works" className="block px-3 py-2 text-gray-600">
                How it Works
              </a>
              <a href="#features" className="block px-3 py-2 text-gray-600">
                Features
              </a>
              <a href="#faq" className="block px-3 py-2 text-gray-600">
                FAQ
              </a>
              <button className="w-full text-left bg-blue-900 text-white px-3 py-2 rounded-lg font-medium mt-2">
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        ref={sectionRefs.hero}
        className="bg-gradient-to-br from-blue-50 to-yellow-50 py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`text-center lg:text-left transition-all duration-1000 ${
                visibleSections.has("hero")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="mb-6">
                <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Shield className="w-4 h-4 mr-2" />
                  Secured by FirstBank Treasury Division
                </div>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Invest in Treasury Bills{" "}
                <span className="text-blue-900 inline-block min-w-[200px] text-left">
                  <span key={currentWord} className="animate-pulse">
                    {animatedWords[currentWord]}
                  </span>
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Access fixed-income investment opportunities directly from
                FirstBank. No paperwork, no stress.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-blue-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-800 transition-all transform hover:scale-105 flex items-center justify-center">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-900 hover:text-blue-900 transition-all flex items-center justify-center">
                  <Play className="mr-2 w-5 h-5" />
                  Learn More
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  CBN Compliant
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Bank-Level Security
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                visibleSections.has("hero")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 mx-auto max-w-md">
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 text-white mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Treasury Dashboard
                  </h3>
                  <div className="text-3xl font-bold mb-1">₦2,450,000</div>
                  <div className="text-blue-200 text-sm">
                    Total Investment Value
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">
                        91-Day T-Bill
                      </div>
                      <div className="text-sm text-gray-500">
                        Matures: Dec 15, 2025
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">+15.2%</div>
                      <div className="text-sm text-gray-500">APY</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">
                        182-Day T-Bill
                      </div>
                      <div className="text-sm text-gray-500">
                        Matures: Jan 20, 2026
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-yellow-600">
                        +18.5%
                      </div>
                      <div className="text-sm text-gray-500">APY</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements with enhanced animations */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 animate-bounce">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-full p-3 animate-pulse">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-1/2 -left-6 bg-blue-500 rounded-full p-3 animate-bounce delay-300">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="absolute top-16 -right-8 bg-purple-500 rounded-full p-3 animate-pulse delay-700">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div className="absolute bottom-16 -right-6 bg-indigo-500 rounded-full p-2 animate-bounce delay-1000">
                <PieChart className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Backed by Trust
          </h2>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-blue-900 font-bold text-xl">FirstBank</div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-gray-600">CBN Licensed</div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-gray-600">Bank-Grade Security</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        ref={sectionRefs.howItWorks}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has("howItWorks")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with treasury bill investments in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-center group transition-all duration-1000 ${
                  visibleSections.has("howItWorks")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-900 transition-colors duration-300">
                    <span className="text-2xl font-bold text-blue-900 group-hover:text-white transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 transform translate-x-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        ref={sectionRefs.features}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has("features")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Use Our Treasury App?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of treasury bill investments with our
              comprehensive platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 duration-1000 ${
                  visibleSections.has("features")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Stats Section */}
      <section ref={sectionRefs.stats} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has("stats")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join a growing community of smart investors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className={`text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl transition-all duration-1000 ${
                visibleSections.has("stats")
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2">
                {stats.totalInvestors.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-semibold">
                Active Investors
              </div>
              <div className="mt-4">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto animate-pulse" />
              </div>
            </div>

            <div
              className={`text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl transition-all duration-1000 ${
                visibleSections.has("stats")
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-green-700 mb-2">
                ₦{stats.totalInvestments}B+
              </div>
              <div className="text-gray-600 font-semibold">Total Invested</div>
              <div className="mt-4">
                <BarChart3 className="w-8 h-8 text-green-600 mx-auto animate-bounce" />
              </div>
            </div>

            <div
              className={`text-center p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl transition-all duration-1000 ${
                visibleSections.has("stats")
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-yellow-600 mb-2">
                {stats.averageReturn}%
              </div>
              <div className="text-gray-600 font-semibold">Average Return</div>
              <div className="mt-4">
                <PieChart
                  className="w-8 h-8 text-yellow-600 mx-auto animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              </div>
            </div>

            <div
              className={`text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl transition-all duration-1000 ${
                visibleSections.has("stats")
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-purple-700 mb-2">
                {stats.activeTbills}+
              </div>
              <div className="text-gray-600 font-semibold">Active T-Bills</div>
              <div className="mt-4 relative">
                <div className="absolute inset-0 bg-purple-200 rounded-full animate-ping opacity-75"></div>
                <DollarSign className="w-8 h-8 text-purple-600 mx-auto relative" />
              </div>
            </div>
          </div>

          {/* Mini Chart Visualization */}
          <div
            className={`mt-16 bg-gray-50 rounded-2xl p-8 transition-all duration-1000 ${
              visibleSections.has("stats")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Investment Growth Over Time
            </h3>
            <div className="flex items-end justify-center space-x-2 h-32">
              {[40, 65, 52, 78, 69, 85, 92, 88, 95].map((height, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-1000 w-8 ${
                    visibleSections.has("stats") ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    height: `${height}%`,
                    transitionDelay: `${800 + index * 100}ms`,
                  }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <blockquote className="text-2xl lg:text-3xl text-white font-medium mb-6">
              "The easiest treasury bill experience I've had. The platform is
              intuitive and the returns are excellent."
            </blockquote>
            <div className="text-blue-200">
              <div className="font-semibold">Adebayo Ogundimu</div>
              <div>FirstBank Customer</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Apps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get the Mobile App
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Manage your treasury bill investments on the go
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Download className="w-5 h-5 mr-2" />
                Download for iOS
              </button>
              <button className="bg-black text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Download className="w-5 h-5 mr-2" />
                Download for Android
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about treasury bill investments
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    setActiveAccordion(activeAccordion === index ? null : index)
                  }
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      activeAccordion === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Investing?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerians who trust FirstBank Treasury for their
            investment needs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105">
              Create Free Account
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all">
              Learn about Treasury Bills
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FirstBank Treasury</h3>
              <p className="text-gray-400 mb-4">
                Secure treasury bill investments backed by FirstBank's trusted
                infrastructure.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Treasury Bills
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    CBN Disclaimers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 FirstBank Treasury. All rights reserved. Licensed by
              the Central Bank of Nigeria.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
