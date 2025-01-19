import Layout from "@/components/app/layout";
import MyBigBarChartInteractive from "./components/big-bar-chart-interactive";
import MyAreaChart from "./components/area-chart-gradient";
import MyBarChart from "./components/bar-chart-multiple";
import MyPieChart from "./components/pie-chart-donut";
import MyBigAreaChartInteractive from "./components/big-area-chart-interactive";

const Dashboard = () => {
  return (
    <>
      <Layout>
        <MyBigBarChartInteractive />
        <div className="grid grid-cols-3 gap-3">
          <MyAreaChart />
          <MyBarChart />
          <MyPieChart />
          {/* <MyBarChart /> */}
        </div>
        <MyBigAreaChartInteractive />
      </Layout>
    </>
  );
};

export default Dashboard;
