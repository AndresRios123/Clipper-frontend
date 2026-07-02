import type { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string | number;
  changePercentage?: number;
  iconBgColor: string;
  comparisonLabel?: string;
  bottomLabel?: string;
};

const StatCard = ({
  icon,
  label,
  value,
  changePercentage,
  iconBgColor,
  comparisonLabel = "vs. mes anterior",
  bottomLabel,
}: StatCardProps) => {
  const isPositive = changePercentage !== undefined ? changePercentage >= 0 : true;

  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col md:flex-row md:items-start gap-3">
      <div
        className="w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBgColor }}
      >
        {icon}
      </div>

      <div className="flex flex-col">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-lg md:text-xl font-bold text-gray-900">{value}</p>
        {bottomLabel ? (
          <p className="text-xs text-gray-500">{bottomLabel}</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default StatCard;