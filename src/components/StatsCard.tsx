import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  bgColor = "bg-white",
}) => {
  return (
    <div className={`${bgColor} rounded-xl shadow-sm p-5`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>

          {change && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium ${
                  change.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {change.isPositive ? "+" : ""}
                {change.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">
                from last month
              </span>
            </div>
          )}
        </div>

        <div className="text-teal-500 opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
