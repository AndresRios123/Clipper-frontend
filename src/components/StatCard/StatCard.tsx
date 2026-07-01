import type { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string | number;
  changePercentage: number;
  iconBgColor: string;
  comparisonLabel?: string;
};

const StatCard = ({
  icon,
  label,
  value,
  changePercentage,
  iconBgColor,
  comparisonLabel = "vs. mes anterior",
}: StatCardProps) => {
  const isPositive = changePercentage >= 0;

  return (
    <div className="bg-white rounded-2xl p-4 flex items-start gap-3">
      <div
        className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBgColor }}
      >
        {icon}
      </div>

      <div className="flex flex-col min-w-0">
        <p className="text-xs text-gray-500 truncate">{label}</p>
        <p className="text-lg md:text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">
          <span
            className="font-semibold"
            style={{ color: isPositive ? "#0C7D31" : "#DC2626" }}
          >
            {isPositive ? "+" : ""}
            {changePercentage}%
          </span>{" "}
          {comparisonLabel}
        </p>
      </div>
    </div>
  );
};

export default StatCard;