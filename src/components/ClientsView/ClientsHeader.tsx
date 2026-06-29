import { Plus } from "lucide-react";

type ClientsHeaderProps = {
  onNewClient?: () => void;
};

const ClientsHeader = ({ onNewClient }: ClientsHeaderProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <p className="text-sm text-gray-500 mt-1">
          Gestiona la información de tus clientes y su historial.
        </p>
      </div>

      <button
        type="button"
        onClick={onNewClient}
        className="flex items-center gap-2 bg-[#7883FF] text-white text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-[#6670e8] transition-colors flex-shrink-0"
      >
        <Plus size={16} />
        Nuevo cliente
      </button>
    </div>
  );
};

export default ClientsHeader;