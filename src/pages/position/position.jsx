import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPositions } from "@/app/reducer/position-slice";
import { DepartmentColumns } from "../department/components/department-columns";
import Layout from "@/components/app/layout";
import AppDataTable from "@/components/app/table/app-data-table";

const Position = () => {
  const dispatch = useDispatch();
  const { posData, posLoading } = useSelector((state) => state.positions);

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  return (
    <Layout>
      <AppDataTable
        data={posData}
        loading={posLoading}
        columns={DepartmentColumns}
        main="position_name"
        title="Positions"
      />
    </Layout>
  );
};

export default Position;
