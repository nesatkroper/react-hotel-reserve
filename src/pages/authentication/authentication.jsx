import Layout from "@/components/app/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import { useDispatch } from "react-redux";

const Authentication = () => {
  const dispatch = useDispatch();

  return (
    <Layout>
      <AppDataTable />
    </Layout>
  );
};

export default Authentication;
