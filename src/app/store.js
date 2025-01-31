import { configureStore } from "@reduxjs/toolkit";
import userReduce from "@/app/reducer/user-slice";
import roomReduce from "@/app/reducer/room-slice";
import departmentReduce from "@/app/reducer/department-slice";
import positionReduce from "@/app/reducer/position-slice";
import customerReduce from "@/app/reducer/customer-slice";
import employeeReduce from "@/app/reducer/employee-slice";
import rdetailReduce from "@/app/reducer/room-detail-slice";
import reservationReduce from "@/app/reducer/reservationSlice";
import rpictureReduce from "@/app/reducer/room-picture-slice";
import pcategoryReduce from "@/app/reducer/product-category-slice";
import productReduce from "@/app/reducer/product-slice";
import counterReduce from "./reducer/counter";
import searchCateReduce from "@/app/reducer/search-category-slice";
import banknoteRduce from "@/app/reducer/bank-note-slice";
import openshiftReduce from "@/app/reducer/open-shift-slice";
import closeshiftReduce from "@/app/reducer/close-shift-slice";

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
    reservations: reservationReduce,
    pcategories: pcategoryReduce,
    products: productReduce,
    searchCates: searchCateReduce,
    banknotes: banknoteRduce,
    openshifts: openshiftReduce,
    closeshifts: closeshiftReduce,
    counters: counterReduce,
  },
});
