import { Box, styled, Typography } from "@mui/material";
import React from "react";
import Task from "./Task";
import AddIcon from "@mui/icons-material/Add";
import { FlexBox } from "./FlexBox";
import { shades } from "../theme";

const TaskContainer = () => {
  return (
    <Container color={shades.primary[300]}>
      <Heading>
        <FlexBox gap="8px">
          <Box
            sx={{
              height: "15px",
              width: "15px",
              borderRadius: "50%",
              background: "red",
            }}
          ></Box>

          <h1>Todo</h1>
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
            5
          </Box>
        </FlexBox>
        <Typography>This item hasn't been started</Typography>
      </Heading>
      <Tasks>
        {Array(15)
          .fill()
          .map((el) => (
            <Task />
          ))}
      </Tasks>
      <Bottom>
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
});

const Bottom = styled(FlexBox)({
  padding: "0 10px",
  gap: "6px",
});
