import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchSprintTasks } from "../state/tasksSlice";
import TaskContainer from "./TaskContainer";
import InfoContainer from "./InfoContainer";

const Sprint = ({ sprintId }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks, shallowEqual);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    dispatch(fetchSprintTasks({ sprintId, userId }));
  }, [sprintId, userId]);
  return (
    <Box sx={{ overflowX: "auto" }} display="flex" gap={2} height="100%">
      <InfoContainer {...{ sprintId, setUserId }} />
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
