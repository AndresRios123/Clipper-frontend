type Service = {
  name: string;
  percentage: number;
};

type TopServicesCardProps = {
  title?: string;
  services: Service[];
};

const TopServicesCard = ({
  title = "Servicios más vendidos",
  services,
}: TopServicesCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
      <p className="text-sm font-bold text-gray-900">{title}</p>

      <ul className="flex flex-col gap-3">
        {services.map((service) => (
          <li
            key={service.name}
            className="grid grid-cols-[1fr_2fr_40px] items-center gap-3"
          >
            <span className="text-xs text-gray-600 truncate">
              {service.name}
            </span>

            <div className="h-2 rounded-full bg-[#D9D9D9] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#7AB672]"
                style={{ width: `${service.percentage}%` }}
              />
            </div>

            <span className="text-xs text-gray-500 text-right">
              {service.percentage}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopServicesCard;