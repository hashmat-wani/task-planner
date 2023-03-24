import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { privateInstance } from "../utils/apiInstances";
import { STATUS } from "../utils/enums";

const initialState = { sprints: [], status: STATUS.IDLE };

const sprintsSlice = createSlice({
  name: "sprints",
  initialState,
  reducers: {
    setSprints: (state, action) => ({ ...state, sprints: action.payload }),
    setStatus: (state, action) => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const { setSprints, setStatus } = sprintsSlice.actions;
export default sprintsSlice.reducer;

export const createSprint =
  ({ toggleLoading, name }) =>
  (dispatch) => {
    privateInstance
      .post("/api/sprint", {
        name,
      })
      .then(() => {
        toast.success("Added successfully!");
        dispatch(fetchUserSprints({ toggleLoading }));
      })
      .catch(() => {
        toast.error("Something went wrong. Try again..!");
      });
  };

export const fetchUserSprints =
  ({ toggleLoading, setValue }) =>
  (dispatch) => {
    toggleLoading();
    privateInstance
      .get("/api/sprint")
      .then(({ data }) => {
        dispatch(setStatus(STATUS.IDLE));
        dispatch(setSprints(data.data));
        if (setValue) {
          setValue(data?.data[0].slug);
        }
      })
      .catch((err) => {
        dispatch(setStatus(STATUS.ERROR));
      })
      .finally(toggleLoading);
  };

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
