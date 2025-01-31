import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDepartments } from "@/app/reducer/department-slice";
import Layout from "@/components/app/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import DepartmentAdd from "./components/department-add";
import { DepartmentColumns } from "./components/department-columns";

const Department = () => {
  const dispatch = useDispatch();
  const { depData, depLoading } = useSelector((state) => state?.departments);

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  return (
    <Layout>
      <AppDataTable
        data={depData}
        columns={DepartmentColumns}
        loading={depLoading}
        addElement={<DepartmentAdd />}
        title="Departments"
        main="department_name"
      />
    </Layout>
  );
};

export default Department;
