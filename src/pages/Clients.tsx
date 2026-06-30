import ClientsHeader from "../components/ClientsView/ClientsHeader";
import ClientsListSection from "../components/ClientsView/ClientslistSection";
import ClientsTable from "../components/ClientsView/ClientsTable";

const Clients = () => {
  return (
    <div>
      <ClientsHeader/>
      <ClientsListSection/>
      <ClientsTable/>
    </div>
  );
};

export default Clients;
