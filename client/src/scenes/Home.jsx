import { useContext, useEffect, useState } from "react";
import { Box, Fab, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Sprint from "../components/Sprint";
import AddIcon from "@mui/icons-material/Add";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchUserSprints } from "../state/sprintsSlice";
import { loadingContext } from "../context/LoadingContext";
import CreateSprint from "../components/CreateSprint";
import AddTask from "../components/AddTask";

export default function Home() {
  const [value, setValue] = useState(null);

  const [openCreateSprint, setOpenCreateSprint] = useState(false);

  const dispatch = useDispatch();
  const { toggleLoading } = useContext(loadingContext);

  const { sprints } = useSelector((state) => state.sprints, shallowEqual);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchUserSprints({ toggleLoading, setValue }));
  }, []);

  return (
    <Box
      sx={{
        // border: "1px solid red",
        height: "calc(100vh - 140px)",
        m: "30px auto",
        maxWidth: "1300px",
      }}
    >
      <CreateSprint open={openCreateSprint} setOpen={setOpenCreateSprint} />
      {value && (
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {sprints.map((el, idx) => (
                <Tab key={idx} label={el.name} value={el._id} />
              ))}
            </TabList>
          </Box>
          <TabPanel
            sx={{
              height: "100%",
              borderTop: 1,
              borderColor: "divider",
              padding: "10px",
            }}
            value={value}
          >
            <Sprint sprintId={value} />
          </TabPanel>
        </TabContext>
      )}
      <Fab
        sx={{ position: "absolute", bottom: 70, right: 20 }}
        color="primary"
        aria-label="add"
        onClick={() => setOpenCreateSprint(true)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
