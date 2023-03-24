import { createSlice } from "@reduxjs/toolkit";
import { MODE, SERVER_DEV_API, SERVER_PROD_API } from "../utils/env";
import { instance, privateInstance } from "../utils/apiInstances";
import { toast } from "react-toastify";
import { STATUS } from "../utils/enums";

const initialState = {
  user: null,
  allUsers: [],
  status: STATUS.IDLE,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: { ...state.user, ...action.payload },
    }),
    setAllUsers: (state, action) => ({
      ...state,
      allUsers: action.payload,
    }),

    clearUser: (state, action) => ({ ...state, user: null }),

    setStatus: (state, action) => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const { setUser, clearUser, setAllUsers, setStatus } = userSlice.actions;
export default userSlice.reducer;

export const register =
  ({ values, resetForm, setSubmitting, navigate }) =>
  () => {
    const { firstName, lastName, email, password } = values;
    instance
      .post("/api/auth/register", {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
      })

      .then((data) => {
        navigate("/signin");
        resetForm();
        toast.success(data.data.message);
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => setSubmitting(false));
  };

export const login =
  ({
    values,
    setSubmitting,
    navigate,
    to = "/",
    setEmailVerificationAlert,
    toggleLoading,
  }) =>
  (dispatch) => {
    const { email, password, isPersistent } = values;

    instance
      .post(
        "/api/auth/login",
        {
          email: email.trim().toLowerCase(),
          password: password.trim(),
          isPersistent,
        },
        { withCredentials: true }
      )
      .then(() => {
        const popup = {
          onSuccess: {
            message: "Login successfull!",
            type: "success",
          },
          onError: {
            message: "Something went wrong. Please try again..!",
            type: "info",
          },
        };
        const args = {
          alert: setEmailVerificationAlert,
          toggleLoading,
          popup,
          navigate,
          to,
        };
        return dispatch(verifyUser(args));
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => setSubmitting(false));
  };

export const logOut =
  ({ toggleLoading, navigate, handleCloseUserMenu, popupMsg = true }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .post("/api/auth/logout")
      .then(() => {
        if (handleCloseUserMenu) handleCloseUserMenu();
        const popup = popupMsg
          ? {
              onSuccess: {
                title: "Something went wrong. Please try again..!",
                type: "info",
              },
              onError: {
                message: "Logout Successfull!",
                type: "success",
              },
            }
          : null;

        const args = {
          toggleLoading,
          popup,
          navigate,
          to: "/signin",
        };
        return dispatch(verifyUser(args));
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };

export const loginWithGoogle = () => () => {
  window.open(
    `${MODE === "dev" ? SERVER_DEV_API : SERVER_PROD_API}/api/auth/google`,
    "_self"
  );
};

export const verifyUser =
  ({ alert, toggleLoading, popup, navigate, to }) =>
  (dispatch) => {
    toggleLoading();
    privateInstance
      .get("/api/user/me")
      .then((data) => {
        const { user } = data?.data;
        dispatch(setUser(user));
        if (popup) {
          const { message, type } = popup.onSuccess;
          toast[type](message);
        }
        if (navigate && to) {
          setTimeout(() => navigate(to, { replace: true }), 0);
        }
        if (alert && !user?.verified) {
          alert(true);
        }
      })
      .catch(async (err) => {
        dispatch(clearUser());
        if (popup) {
          const { message, type } = popup.onError;
          toast[type](message);
        }
        if (navigate && to) {
          setTimeout(() => navigate(to, { replace: true }), 0);
        }
      })
      .finally(() => {
        toggleLoading();
      });
  };

export const refreshToken = () => () => {
  return instance.get("/api/auth/refreshtoken", { withCredentials: true });
};

export const verifyEmail =
  ({ otp, navigate }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .post("/api/mail/verifyemailverificationotp", { otp })
      .then((data) => {
        toast.success(data.data?.message);
        dispatch(setUser({ verified: true }));
        navigate(-1);
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };

export const sendEmail = (navigate, cb) => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  privateInstance
    .post("/api/mail/sendemailverificationotp", {})
    .then((data) => {
      toast.success(data.data?.message);
      if (cb) cb();
      navigate("/verifyemail");
    })
    .catch((err) => {
      const message = err?.response?.data?.message;
      toast.error(message || "Something went wrong.");
    })
    .finally(() => dispatch(setStatus(STATUS.IDLE)));
};

export const fetchAllUsers = () => (dispatch) => {
  privateInstance
    .get("/api/user/all")
    .then(({ data }) => {
      dispatch(setAllUsers(data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
