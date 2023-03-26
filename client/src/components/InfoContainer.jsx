import {
  Autocomplete,
  Box,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { shades } from "../theme";

const InfoContainer = ({ sprintId, setUserId }) => {
  const { sprints } = useSelector((state) => state.sprints, shallowEqual);
  const sprint = sprints.find((el) => el._id === sprintId);
  // const { tasks } = useSelector((state) => state.tasks, shallowEqual);
  // const sprintUsers = [
  //   ...tasks?.todo,
  //   ...tasks?.inProgress,
  //   ...tasks?.done,
  // ].reduce((ac, el) => [...ac, ...el?.assignees], []);
  const { user, allUsers } = useSelector((state) => state.user, shallowEqual);

  return (
    <Container color={shades.primary[300]}>
      <Autocomplete
        onChange={(e, val) => {
          setUserId(val?._id || null);
        }}
        freeSolo
        // disableClearable
        options={allUsers}
        getOptionLabel={(option) =>
          `${option.firstName} ${option?.lastName ? option?.lastName : ""}`
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Assignee"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      {sprint?.user?._id === user?._id ? (
        <>
          <Typography>
            All assignees of the sprint can see and edit the tasks, but only you
            can edit this Sprint.
          </Typography>
          <h1>Created by You</h1>
        </>
      ) : (
        <>
          <Typography>
            All assignees of the sprint can see and edit the tasks, but can't
            edit this Sprint.
          </Typography>
          <h1>
            Created by {sprint?.user?.firstName} {sprint?.user?.lastName}
          </h1>
        </>
      )}
    </Container>
  );
};

export default InfoContainer;

const Container = styled(Box)({
  padding: "10px",
  width: "240px",
  minWidth: "240px",
  display: "flex",
  flexDirection: "column",
  rowGap: "15px",
  textAlign: "center",
});
