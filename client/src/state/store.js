import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import resetPwdReducer from "./resetPwdSlice";
import sprintsReducer from "./sprintsSlice";
import tasksReducer from "./tasksSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    sprints: sprintsReducer,
    tasks: tasksReducer,
    resetPwdReducer,
  },
});
