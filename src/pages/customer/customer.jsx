import Layout from "@/components/app/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import { useDispatch, useSelector } from "react-redux";
import { CustomerColumns } from "./components/customer-columns";
import { useEffect } from "react";
import { getCustomers } from "@/app/reducer/customer-slice";

const Customer = () => {
  const dispatch = useDispatch();
  const { cusData, cusLoading } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);
  return (
    <>
      <Layout>
        <AppDataTable
          data={cusData}
          loading={cusLoading}
          columns={CustomerColumns}
          title="Customers"
          main="customer_name"
        />
      </Layout>
    </>
  );
};

export default Customer;
