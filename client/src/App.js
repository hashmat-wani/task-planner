import { useContext, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AppRoutes from "./AppRoutes";
import EmailVerificationAlert from "./components/EmailVerificationAlert";
import Loading from "./components/Loading";
import { loadingContext } from "./context/LoadingContext";
import Navbar from "./components/Navbar";
import { fetchAllUsers, verifyUser } from "./state/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DragDropContext } from "react-beautiful-dnd";
import { editTask } from "./state/tasksSlice";

function App() {
  const [emailVerificationAlert, setEmailVerificationAlert] = useState(false);
  const { toggleLoading } = useContext(loadingContext);
  const dispatch = useDispatch();

  const { activeSprint } = useSelector((state) => state.sprints, shallowEqual);

  useEffect(() => {
    dispatch(verifyUser({ toggleLoading }));
    dispatch(fetchAllUsers());
  }, []);

  const onDragEnd = (result) => {
    const { draggableId, source, destination } = result;
    // console.log(result);

    if (!destination || destination.droppableId === source.droppableId) return;

    const payload = {
      _id: draggableId,
      status: destination.droppableId,
      sprint: activeSprint,
    };
    dispatch(editTask({ payload }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
    </DragDropContext>
  );
}

export default App;
