type DashboardHeaderProps = {
  businessName?: string;
  userInitials?: string;
};

const DashboardHeader = ({
  businessName = "Barbería Clipper",
  userInitials = "BC",
}: DashboardHeaderProps) => {
  return (
    <header className="w-full bg-white px-8 py-4 flex items-center justify-end gap-3 border-b border-gray-100">
      <span className="text-sm font-semibold text-gray-900">
        {businessName}
      </span>
      <div className="w-9 h-9 rounded-full bg-[#2B2B2B] flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-semibold">
          {userInitials}
        </span>
      </div>
    </header>
  );
};

export default DashboardHeader;