import React from "react";

const StatCard = ({ label, value, icon, color }) => {
  const Icon = icon;
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition">
      
      <div className={`p-3 rounded-md ${color}`}>
        <Icon className="w-6 h-6" />
      </div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-2xl font-semibold">{value}</h3>
      </div>

    </div>
  );
};

export default StatCard;