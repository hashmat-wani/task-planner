import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./AppRoutes";
import EmailVerificationAlert from "./components/EmailVerificationAlert";
import Loading from "./components/Loading";
import { loadingContext } from "./context/LoadingContext";
import Navbar from "./components/Navbar";
import { fetchAllUsers, verifyUser } from "./state/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [emailVerificationAlert, setEmailVerificationAlert] = useState(false);
  const { toggleLoading } = useContext(loadingContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUser({ toggleLoading }));
    dispatch(fetchAllUsers());
  }, []);

  return (
    <div className="App">
      <Navbar {...{ setEmailVerificationAlert }} />
      <AppRoutes setEmailVerificationAlert={setEmailVerificationAlert} />
      <Loading />
      <EmailVerificationAlert
        {...{ emailVerificationAlert, setEmailVerificationAlert }}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
