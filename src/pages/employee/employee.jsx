import Layout from "@/components/app/layout";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "@/app/reducer/employee-slice";
import { useEffect } from "react";
import EmployeeAdd from "./components/employee-add";
import AppDataTable from "@/components/app/table/app-data-table";
import { EmployeeColumns } from "./components/employee-columns";

const Employee = () => {
  const dispatch = useDispatch();
  const { empData, empLoading } = useSelector((state) => state?.employees);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <Layout>
      <AppDataTable
        data={empData}
        loading={empLoading}
        columns={EmployeeColumns}
        addElement={<EmployeeAdd />}
        title="Employeese"
        add="Add Employee"
        main="employee_name"
      />
    </Layout>
  );
};

export default Employee;
