type MetricCardProps = {
  label: string;
  value: string;
  changePercentage: number;
  comparisonLabel?: string;
};

const MetricCard = ({
  label,
  value,
  changePercentage,
  comparisonLabel = "vs. mes anterior",
}: MetricCardProps) => {
  const isPositive = changePercentage >= 0;

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-3">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">
        <span
          className="font-semibold"
          style={{ color: isPositive ? "#309C43" : "#DC2626" }}
        >
          {isPositive ? "+" : ""}
          {changePercentage}%
        </span>{" "}
        {comparisonLabel}
      </p>
    </div>
  );
};

export default MetricCard;