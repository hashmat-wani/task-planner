import { Box } from "@mui/material";
import React from "react";
import TaskContainer from "./TaskContainer";

const Sprint = () => {
  return (
    <Box sx={{ overflowX: "auto" }} display="flex" gap={2} height="100%">
      <TaskContainer />
      <TaskContainer />
      <TaskContainer />
    </Box>
  );
};

export default Sprint;
