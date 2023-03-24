import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./AppRoutes";
import EmailVerificationAlert from "./components/EmailVerificationAlert";
import Loading from "./components/Loading";
import { loadingContext } from "./context/LoadingContext";
import Footer from "./scenes/global/Footer";
import Navbar from "./scenes/global/Navbar";
import { verifyUser } from "./state/userSlice";

function App() {
  const [emailVerificationAlert, setEmailVerificationAlert] = useState(false);
  const { toggleLoading } = useContext(loadingContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUser({ toggleLoading }));
    // dispatch(fetchUserSprints());
  }, []);

  return (
    <div className="App">
      <Navbar {...{ setEmailVerificationAlert }} />
      <AppRoutes setEmailVerificationAlert={setEmailVerificationAlert} />
      <Footer />
      <Loading />
      <EmailVerificationAlert
        {...{ emailVerificationAlert, setEmailVerificationAlert }}
      />
    </div>
  );
}

export default App;
