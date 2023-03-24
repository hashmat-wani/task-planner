import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchSprintTasks } from "../state/tasksSlice";
import TaskContainer from "./TaskContainer";

const Sprint = ({ sprintId }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks, shallowEqual);
  useEffect(() => {
    dispatch(fetchSprintTasks({ sprintId }));
  }, [sprintId]);
  return (
    <Box sx={{ overflowX: "auto" }} display="flex" gap={2} height="100%">
      <TaskContainer
        title="Todo"
        color="#2da44e"
        info="This item hasn't been started"
        sprintId={sprintId}
        status="to-do"
        tasks={tasks?.todo}
      />
      <TaskContainer
        title="In Progress"
        color="#bf8700"
        info="This is actively being worked on"
        sprintId={sprintId}
        status="in-progress"
        tasks={tasks?.inProgress}
      />
      <TaskContainer
        title="Done"
        color="#8250df"
        info="This has been completed"
        sprintId={sprintId}
        status="done"
        tasks={tasks?.done}
      />
    </Box>
  );
};

export default Sprint;
