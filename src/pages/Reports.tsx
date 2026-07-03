import ReportsHeader from "../components/ReportsView/ReportsHeader";
import ReportsSmartSummary from "../components/ReportsView/ReportsSmartSummary";
import ReportsSummary from "../components/ReportsView/ReportsSummary";
import ReportsCharts from "../components/ReportsView/ReportsCharts";
import ReportsRankings from "../components/ReportsView/ReportsRankings";
import ReportsCustomers from "../components/ReportsView/ReportsCustomers";

const Reports = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <ReportsHeader />
      <ReportsSmartSummary />
      <ReportsSummary />
      <ReportsCharts />
      <ReportsRankings />
      <ReportsCustomers />
    </div>
  );
};

export default Reports;
