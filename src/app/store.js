import { configureStore } from "@reduxjs/toolkit";
import userReduce from "@/app/reducer/userSlice";
import roomReduce from "@/app/reducer/roomSlice";
import departmentReduce from "@/app/reducer/departmentSlice";
import positionReduce from "@/app/reducer/positionSlice";
import customerReduce from "@/app/reducer/customerSlice";
import employeeReduce from "@/app/reducer/employeeSlice";
import rdetailReduce from "@/app/reducer/rdetailSlice";
import reservationReduce from "@/app/reducer/reservationSlice";
import rpictureReduce from "@/app/reducer/rpictureSlice";

export default configureStore({
  reducer: {
    users: userReduce,
    rooms: roomReduce,
    departments: departmentReduce,
    positions: positionReduce,
    customers: customerReduce,
    employees: employeeReduce,
    rdetails: rdetailReduce,
    rpictures: rpictureReduce,
    reservations: rpictureReduce,
  },
});
