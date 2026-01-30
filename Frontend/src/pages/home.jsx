import React, { useState, useEffect } from 'react';
import { Search, Shield, Activity, ChevronRight, Menu, X, CheckCircle, Clock, Users, Stethoscope, FileCheck, Zap } from 'lucide-react';

export default function home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Search,
      title: "AI Symptoms Analyzer",
      description: "Describe your symptoms and get instant AI-powered analysis with potential conditions, severity levels, and recommended actions.",
      color: "cyan"
    },
    {
      icon: Shield,
      title: "License Verification",
      description: "Instantly verify medical licenses and credentials of healthcare professionals to ensure you're getting care from qualified experts.",
      color: "purple"
    },
    {
      icon: Stethoscope,
      title: "Smart Doctor Matching",
      description: "Get matched with the right specialists based on your symptoms, location, availability, and insurance coverage.",
      color: "cyan"
    },
    {
      icon: FileCheck,
      title: "Health Records",
      description: "Securely store and access your medical history, prescriptions, and test results all in one place.",
      color: "purple"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access healthcare guidance anytime, anywhere. Our AI assistant is always ready to help with your health concerns.",
      color: "cyan"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get quick preliminary assessments in seconds, helping you decide if you need immediate medical attention.",
      color: "purple"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Describe Your Symptoms",
      description: "Tell us what you're experiencing through our intuitive symptom checker interface."
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our advanced AI analyzes your symptoms against millions of medical cases and conditions."
    },
    {
      number: "03",
      title: "Get Recommendations",
      description: "Receive personalized recommendations and verified doctor matches for your specific needs."
    },
    {
      number: "04",
      title: "Connect with Care",
      description: "Book appointments with verified professionals or get immediate telehealth consultations."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1000ms]"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse [animation-delay:500ms]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-cyan-400/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Cure<span className="text-cyan-400">x</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                How It Works
              </a>
              <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                About
              </a>
              <button className="px-5 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 transition-all font-semibold">
                Sign In
              </button>
              <button className="px-6 py-2.5 rounded-full bg-linear-to-r from-cyan-400 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:-translate-y-0.5">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="#features" className="block text-gray-300 hover:text-cyan-400 transition-colors py-2">
                Features
              </a>
              <a href="#how-it-works" className="block text-gray-300 hover:text-cyan-400 transition-colors py-2">
                How It Works
              </a>
              <a href="#about" className="block text-gray-300 hover:text-cyan-400 transition-colors py-2">
                About
              </a>
              <button className="w-full px-6 py-2.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-semibold">
                Sign In
              </button>
              <button className="w-full px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 relative z-10">
              <div className="inline-block">
                <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30">
                  AI-Powered Healthcare
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Your Smart
                <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Doctor
                </span>
                at Your Fingertips
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                Advanced AI technology that analyzes your symptoms, verifies medical licenses, 
                and connects you with trusted healthcare professionals instantly.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold flex items-center space-x-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:-translate-y-1">
                  <span>Start Analysis</span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-full border-2 border-cyan-400/30 text-white hover:bg-cyan-400/10 transition-all font-semibold">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-purple-500/10 border border-cyan-400/20 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-cyan-400">98%</div>
                  <div className="text-sm text-gray-400 font-mono">Accuracy</div>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-400/10 to-cyan-500/10 border border-purple-400/20 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-purple-400">50K+</div>
                  <div className="text-sm text-gray-400 font-mono">Users</div>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-purple-500/10 border border-cyan-400/20 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-cyan-400">24/7</div>
                  <div className="text-sm text-gray-400 font-mono">Available</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[600px]">
                {/* Pulsing Circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-cyan-400/30 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-purple-400/20 animate-pulse [animation-delay:150ms]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-xl"></div>
                
                {/* Floating Icons */}
                <div className="absolute top-20 right-20 p-5 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-cyan-400/30 backdrop-blur-xl animate-bounce shadow-lg shadow-cyan-500/30">
                  <Search className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="absolute bottom-32 left-16 p-5 rounded-2xl bg-gradient-to-br from-purple-400/20 to-cyan-500/20 border border-purple-400/30 backdrop-blur-xl animate-bounce [animation-delay:300ms] shadow-lg shadow-purple-500/30">
                  <Shield className="w-8 h-8 text-purple-400" />
                </div>
                <div className="absolute top-40 left-12 p-5 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-cyan-400/30 backdrop-blur-xl animate-bounce [animation-delay:700ms] shadow-lg shadow-cyan-500/30">
                  <Activity className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 inline-block">
              Core Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-6">
              Everything You Need for
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Better Healthcare
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive tools powered by advanced AI to help you make informed health decisions
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 rounded-3xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                  feature.color === 'cyan' 
                    ? 'from-cyan-400/20 to-purple-500/20 border-cyan-400/30' 
                    : 'from-purple-400/20 to-cyan-500/20 border-purple-400/30'
                } border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${
                    feature.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'
                  }`} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-32 px-6 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 inline-block">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-6">
              How <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Curex</span> Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get diagnosed and connected with healthcare professionals in four simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-400/30 to-purple-500/30"></div>
                )}
                
                <div className="relative">
                  {/* Number Circle */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border-2 border-cyan-400/30 flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                    <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-400 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border border-cyan-400/30 p-12 md:p-16 overflow-hidden backdrop-blur-sm">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Take Control of
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Your Health?
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of users who trust Curex for their healthcare needs. 
                Start your free analysis today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold flex items-center space-x-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:-translate-y-1">
                  <span>Get Started Free</span>
                  <ChevronRight size={20} />
                </button>
                <button className="px-8 py-4 rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all font-semibold backdrop-blur-sm">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-cyan-400/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">
                  Cure<span className="text-cyan-400">x</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted AI-powered healthcare companion, available 24/7.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-cyan-400/10 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Curex. All rights reserved. Built with care for better healthcare.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}