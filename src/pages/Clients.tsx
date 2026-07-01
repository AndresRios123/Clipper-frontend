import ClientsHeader from "../components/ClientsView/ClientsHeader";
import ClientsListSection from "../components/ClientsView/ClientslistSection";

const Clients = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <ClientsHeader />
      <ClientsListSection />
    </div>
  );
};

export default Clients;