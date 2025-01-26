import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRooms } from "@/app/reducer/roomSlice";
import Layout from "@/components/app/layout";
import RoomAdd from "./components/room-add";
import AppDataTable from "@/components/app/table/app-data-table";
import { RoomColumns } from "./components/room-columns";

const Room = () => {
  const dispatch = useDispatch();
  const { rooData, rooLoading } = useSelector((state) => state?.rooms);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  return (
    <Layout>
      <AppDataTable
        data={rooData}
        columns={RoomColumns}
        title="Rooms Table"
        main="room_name"
        loading={rooLoading}
        add="Add Room"
        addElement={<RoomAdd />}
      />
    </Layout>
  );
};

export default Room;
