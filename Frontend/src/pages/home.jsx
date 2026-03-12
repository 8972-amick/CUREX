import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

/* ─────────────────────────────────────────────
   Hook: returns true once the element has entered
   the viewport (fires once, then disconnects).
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

/* ─────────────────────────────────────────────
   FadeUp — wraps any block in a scroll-triggered
   translate + opacity transition.
   `delay` is a Tailwind delay class e.g. "delay-150"
───────────────────────────────────────────── */
function FadeUp({ children, delay = "", className = "" }) {
  const [ref, visible] = useInView(0.12);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${delay}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card — FadeUp wrapper styled as a feature card
───────────────────────────────────────────── */
function Card({ title, body, delay = "" }) {
  return (
    <FadeUp delay={delay}>
      <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
        <h3 className="text-xl font-semibold text-emerald-600">{title}</h3>
        <p className="mt-3 text-gray-600">{body}</p>
      </div>
    </FadeUp>
  );
}

/* ─────────────────────────────────────────────
   Hero — items animate in on mount via useState
   so we can stagger with Tailwind delay utilities
───────────────────────────────────────────── */
function HeroContent({ navigate }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const base = "transition-all duration-700 ease-out";
  const hidden = "opacity-0 translate-y-7";
  const shown  = "opacity-100 translate-y-0";

  return (
    <div className="max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
      {/* Title */}
      <h1
        className={`text-white text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg
          ${base} delay-100 ${mounted ? shown : hidden}`}
      >
        Your health <br />
        <span className="text-emerald-300">is our priority</span>
      </h1>

      {/* Subtitle */}
      <p
        className={`mt-6 max-w-xl text-gray-200 text-lg
          ${base} delay-300 ${mounted ? shown : hidden}`}
      >
        CUREX connects healthcare professionals and facilities with trusted,
        flexible staffing solutions also AI featured solutions.
      </p>

      {/* Buttons */}
      <div
        className={`mt-8 flex gap-4
          ${base} delay-500 ${mounted ? shown : hidden}`}
      >
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-md
            hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/about")}
          className="px-6 py-3 border border-white text-white font-semibold rounded-md
            hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Learn More
        </button>
        <button
          onClick={() => navigate("/symptoms")}
          className="px-6 py-3 bg-white/10 backdrop-blur text-white border border-white/30
            font-semibold rounded-md hover:bg-white hover:text-black hover:scale-105
            active:scale-95 transition-all duration-200"
        >
          Symptom Analysis
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">

      {/* ── HERO ── */}
      <section className="relative w-full">
        <img
          src="img1.png"
          alt="CUREX healthcare platform"
          className="w-full h-[80vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent">
          <HeroContent navigate={navigate} />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Why Choose CUREX?
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Built to simplify healthcare staffing with speed, trust, and flexibility.
            </p>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="Trusted Professionals"
              body="Verified healthcare providers ready to work when you need them."
              delay="delay-0"
            />
            <Card
              title="Flexible Staffing"
              body="Short-term or long-term staffing tailored to your needs."
              delay="delay-150"
            />
            <Card
              title="Fast & Secure"
              body="Secure platform with quick matching and onboarding."
              delay="delay-300"
            />
          </div>
        </div>
      </section>

      {/* ── AI FEATURES ── */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              AI integrated features
            </h2>
          </FadeUp>
        </div>

        <div className="mt-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="AI powered symptom checker"
            body="Analyze your symptoms and get possible conditions and advice in seconds."
            delay="delay-0"
          />
          <Card
            title="Licensce verification and background checks"
            body="AI powered verification for healthcare professionals to ensure trust and safety."
            delay="delay-150"
          />
          <Card
            title="Fast & Secure"
            body="Secure platform with quick matching and onboarding."
            delay="delay-300"
          />
        </div>
      </section>

      {/* ── JOIN ── */}
      <section className="py-14 bg-gray-50">
        <FadeUp className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Join CUREX Today
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Experience the future of healthcare staffing and AI-powered solutions.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-8 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-md
              hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Get Started
          </button>
        </FadeUp>
      </section>

      {/* ── CONTACT ── */}
      <section className="py-14 bg-gray-50">
        <FadeUp className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Contact Us
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have questions or want to learn more? Reach out to our team for
            personalized assistance.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="mt-8 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-md
              hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Contact Us
          </button>
        </FadeUp>
      </section>

      <Footer />
    </div>
  );
};

export default Home;