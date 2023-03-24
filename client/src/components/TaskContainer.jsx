import { Box, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import Task from "./Task";
import AddIcon from "@mui/icons-material/Add";
import { FlexBox } from "./FlexBox";
import { shades } from "../theme";
import AddTask from "./AddTask";

const TaskContainer = ({ sprintId, color, title, info, status, tasks }) => {
  const [openAddTask, setOpenAddTask] = useState(false);

  return (
    <Container color={shades.primary[300]}>
      <AddTask
        sprintId={sprintId}
        status={status}
        open={openAddTask}
        setOpen={setOpenAddTask}
      />

      <Heading>
        <FlexBox gap="8px">
          <Box
            sx={{
              height: "15px",
              width: "15px",
              borderRadius: "50%",
              background: color,
            }}
          ></Box>

          <h1>{title}</h1>
          <Box
            sx={{
              height: "15px",
              width: "15px",
              borderRadius: "50%",
              background: "lightgray",
              fontSize: "11px",
              display: "grid",
              placeItems: "center",
              fontWeight: "bold",
            }}
          >
            {tasks.length}
          </Box>
        </FlexBox>
        <Typography>{info}</Typography>
      </Heading>
      <Tasks>
        {tasks.map((task) => (
          <Task task={task} />
        ))}
      </Tasks>
      <Bottom onClick={() => setOpenAddTask(true)}>
        <AddIcon /> Add item
      </Bottom>
    </Container>
  );
};

export default TaskContainer;

const Container = styled(Box)({
  background: "#f6f8fa",
  padding: "10px",
  minWidth: "400px",
  display: "flex",
  flexDirection: "column",
  rowGap: "15px",
  border: "1px solid lightgray",
  borderRadius: "10px",
});

const Heading = styled(Box)({
  padding: "0 10px",
});

const Tasks = styled(Box)({
  display: "flex",
  flexDirection: "column",
  rowGap: "10px",
  padding: "10px",
  overflowY: "auto",
  flex: 1,
});

const Bottom = styled(FlexBox)({
  padding: "0 10px",
  gap: "6px",
  cursor: "pointer",
});
