import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { privateInstance } from "../utils/apiInstances";
import { STATUS } from "../utils/enums";

const initialState = {
  tasks: { todo: [], inProgress: [], done: [] },
  singleUserTasks: { todo: [], inProgress: [], done: [] },
  status: STATUS.IDLE,
};

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

export const createTask =
  ({ payload, handleClose }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .post("/api/task", payload)
      .then(() => {
        toast.success("Added successfully!");
        handleClose();
        dispatch(fetchSprintTasks({ sprintId: payload.sprint }));
      })
      .catch(() => {
        toast.error("Something went wrong. Try again..!");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };

export const fetchSprintTasks =
  ({ sprintId, userId }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .get(`/api/task/${sprintId}`, { params: { userId } })
      .then(({ data }) => {
        dispatch(setStatus(STATUS.IDLE));
        dispatch(setTasks(data.data));
      })
      .catch((err) => {
        dispatch(setStatus(STATUS.ERROR));
      });
  };

export const editTask =
  ({ payload, handleClose }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .patch(`/api/task/${payload._id}`, payload)
      .then(() => {
        // toast.success("Edited successfully!");
        if (handleClose) handleClose();
        dispatch(fetchSprintTasks({ sprintId: payload.sprint }));
      })
      .catch(() => {
        toast.error("Something went wrong. Try again..!");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };
export const deleteTask =
  ({ task }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .delete(`/api/task/${task?._id}`)
      .then(() => {
        toast.success("Deleted successfully");
        dispatch(fetchSprintTasks({ sprintId: task?.sprint }));
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };
