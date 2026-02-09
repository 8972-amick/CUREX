import React from 'react'
import { useState } from 'react';

const symptomAnalysis = () => {
    const [symptoms, setSymptoms] = useState("");
    const handleAnalyze = () => {
        // Placeholder for symptom analysis logic
        alert(`Analyzing symptoms: ${symptoms}`);
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-emerald-600 mb-4">
          Symptom Analysis
        </h2>

        <p className="text-gray-600 mb-6">
          Enter your symptoms below. This tool does not replace a doctor.
        </p>

        <textarea
          rows="4"
          placeholder="e.g. fever, headache, sore throat"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <button
          onClick={handleAnalyze}
          className="mt-4 w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition"
        >
          Analyze Symptoms
        </button>
      </div>
    </div>
    
  );
};

export default symptomAnalysis;