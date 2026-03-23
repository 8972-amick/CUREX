import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:3000";

const SymptomAnalysis = () => {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    const trimmed = symptoms.trim();
    if (!trimmed) {
      toast.warning("Please enter at least one symptom");
      return;
    }

    const symptomList = trimmed
      .split(/[,;]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (symptomList.length === 0) {
      toast.warning("Please enter valid symptoms (e.g. fever, headache)");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(`${backendUrl}/api/symptoms/analyze`, {
        symptoms: symptomList,
      });

      setResult(res.data);
    } catch (err) {
      console.error("Symptom analysis error:", err);
      toast.error(err?.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full border border-emerald-100/50">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 text-2xl mb-4">
            🔬
          </div>
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">
            Symptom Analysis
          </h2>
          <p className="text-gray-600 text-sm">
            Enter your symptoms below. This tool provides preliminary guidance
            only and does not replace professional medical advice.
          </p>
        </div>

        <textarea
          rows="4"
          placeholder="e.g. fever, headache, sore throat (comma or semicolon separated)"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
          disabled={loading}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-4 w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Analyze Symptoms"}
        </button>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-amber-800 font-medium text-sm mb-2">
              ⚠️ {result.disclaimer || "This is not a medical diagnosis. Please consult a doctor."}
            </p>
            {result.possibleConditions?.length > 0 ? (
              <div>
                <p className="font-semibold text-gray-800 mb-1">
                  Possible conditions (rule-based):
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {result.possibleConditions.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
                {result.matchedSymptoms?.length > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Matched symptoms: {result.matchedSymptoms.join(", ")}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-700">
                {result.advice || "No matching symptoms found. Please consult a doctor."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomAnalysis;