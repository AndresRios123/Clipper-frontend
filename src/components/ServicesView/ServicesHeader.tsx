import { Plus } from "lucide-react";

type ServicesHeaderProps = {
  onNewService?: () => void;
};

const ServicesHeader = ({ onNewService }: ServicesHeaderProps) => {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Servicios</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona los servicios que ofreces en tu negocio.
          </p>
        </div>

        <button
          type="button"
          onClick={onNewService}
          className="flex items-center justify-center gap-2 bg-[#7883FF] text-white text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-[#6670e8] transition-colors"
        >
          <Plus size={16} />
          Nuevo servicio
        </button>
      </div>
    </div>
  );
};

export default ServicesHeader;
