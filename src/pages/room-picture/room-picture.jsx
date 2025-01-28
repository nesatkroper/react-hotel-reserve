import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRpicture } from "@/app/reducer/rpictureSlice";
import Layout from "@/components/app/layout";
import RoomPictureAdd from "./components/room-picture-add";
import AppDataTable from "@/components/app/table/app-data-table";
import { RoomPictureColumns } from "./components/room-picture-column";

const RoomPicture = () => {
  const dispatch = useDispatch();
  const { rpiData, rpiLoading } = useSelector((state) => state?.rpictures);

  useEffect(() => {
    dispatch(getRpicture());
  }, [dispatch]);

  console.log(rpiData);

  return (
    <Layout>
      <AppDataTable
        data={rpiData}
        columns={RoomPictureColumns}
        loading={rpiLoading}
        addElement={<RoomPictureAdd />}
        add="Add Room Picture"
        main="room_id"
        title="Room Pictures Table"
      />
    </Layout>
  );
};

export default RoomPicture;
