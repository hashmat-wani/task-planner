import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { privateInstance } from "../utils/apiInstances";
import { STATUS } from "../utils/enums";

const initialState = { tasks: [], status: STATUS.IDLE };

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => ({ ...state, tasks: action.payload }),
    setStatus: (state, action) => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const { setTasks, setStatus } = tasksSlice.actions;
export default tasksSlice.reducer;

// export const createTask =
//   ({ toggleLoading, name }) =>
//   (dispatch) => {
//     privateInstance
//       .post("/api/sprint", {
//         name,
//       })
//       .then(() => {
//         toast.success("Added successfully!");
//         dispatch(fetchUserSprints({ toggleLoading }));
//       })
//       .catch(() => {
//         toast.error("Something went wrong. Try again..!");
//       });
//   };

// export const fetchSprintTasks =
//   ({ toggleLoading, sprintId }) =>
//   (dispatch) => {
//     toggleLoading();
//     privateInstance
//       .get(`/api/task/${sprintId}`)
//       .then(({ data }) => {
//         dispatch(setStatus(STATUS.IDLE));
//         dispatch(setTasks(data.data));
//       })
//       .catch((err) => {
//         dispatch(setStatus(STATUS.ERROR));
//       })
//       .finally(toggleLoading);
//   };

// export const deleteSprint =
//   ({ id }) =>
//   (dispatch) => {
//     privateInstance
//       .delete(`/api/v1/pins/${id}`)
//       .then(() => {
//         toast.success("Deleted successfully");
//         dispatch(fetchPins());
//       })
//       .catch((err) => {
//         const message = err?.response?.data?.message;
//         toast.error(message || "Something went wrong.");
//       });
//   };
