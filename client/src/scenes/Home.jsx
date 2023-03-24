import { useContext, useEffect, useState } from "react";
import { Box, Fab, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Sprint from "../components/Sprint";
import AddIcon from "@mui/icons-material/Add";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchUserSprints } from "../state/sprintsSlice";
import { loadingContext } from "../context/LoadingContext";

export default function Home() {
  const [value, setValue] = useState(null);

  const dispatch = useDispatch();
  const { toggleLoading } = useContext(loadingContext);

  const { sprints } = useSelector((state) => state.sprints, shallowEqual);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchUserSprints({ toggleLoading, setValue }));
  }, []);

  // useEffect(() => {
  //   dispatch(fetchUserSprints({ toggleLoading, setValue }));
  // }, [value]);

  return (
    <Box
      sx={{
        // border: "1px solid red",
        height: "calc(100vh - 170px)",
        m: "30px auto",
        maxWidth: "1300px",
      }}
    >
      {value && (
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {sprints.map((el, idx) => (
                <Tab key={idx} label={el.name} value={el.slug} />
              ))}
            </TabList>
          </Box>
          {sprints.map((el, idx) => (
            <TabPanel
              key={idx}
              sx={{
                height: "calc(100% - 48px)",
                borderTop: 1,
                borderColor: "divider",
                padding: "10px",
              }}
              value={el.slug}
            >
              <Sprint />
            </TabPanel>
          ))}
        </TabContext>
      )}
      <Fab
        sx={{ position: "absolute", bottom: 70, right: 20 }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
