import { Navigate, Route, Routes } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import Home from "./scenes/Home";
import SignUp from "./scenes/auth/SignUp";
import SignIn from "./scenes/auth/SignIn";
import VerifyEmail from "./scenes/auth/VerifyEmail";
import ResetPwd from "./scenes/auth/resetPassword/ResetPwd";
import NewPassword from "./scenes/auth/resetPassword/NewPassword";
import ResetPwdInstructions from "./scenes/auth/resetPassword/ResetPwdInstructions";
import { Box } from "@mui/material";
import PrivateRoute from "./components/PrivateRoute";

const AppRoutes = ({ setEmailVerificationAlert }) => {
  const { user } = useSelector((state) => state.user, shallowEqual);
  const { email } = useSelector((state) => state.resetPwdReducer, shallowEqual);

  return (
    <Box flex={1}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/signin"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <SignIn setEmailVerificationAlert={setEmailVerificationAlert} />
            )
          }
        />
        <Route
          path="/verifyemail"
          element={
            user && !user?.verified ? <VerifyEmail /> : <Navigate to="/" />
          }
        />

        <Route
          path="/reset-password"
          element={user ? <Navigate to="/" /> : <ResetPwd />}
        />
        <Route
          path="/reset-password/instructions"
          element={
            user ? (
              <Navigate to="/" />
            ) : email ? (
              <ResetPwdInstructions />
            ) : (
              <Navigate to="/reset-password" />
            )
          }
        />
        <Route
          path="/new-password"
          element={user ? <Navigate to="/" /> : <NewPassword />}
        />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
