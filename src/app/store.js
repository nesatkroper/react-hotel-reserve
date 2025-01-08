import { configureStore } from "@reduxjs/toolkit";
import userReduce from "@/app/reducer/userSlice";
import roomReduce from "@/app/reducer/roomSlice";
import departmentReduce from "@/app/reducer/departmentSlice";
import positionReduce from "@/app/reducer/positionSlice";

export default configureStore({
  reducer: {
    users: userReduce,
    rooms: roomReduce,
    departments: departmentReduce,
    positions: positionReduce,
    // Add other reducers here as needed.
  },
});
