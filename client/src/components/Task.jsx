import { Avatar, AvatarGroup, Box, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { FlexBox } from "./FlexBox";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EditTask from "./EditTask";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteTask } from "../state/tasksSlice";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <Draggable draggableId={task?._id.toString()} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <EditTask {...{ task, open, setOpen }} />
          <Bar mb="15px">
            <Chip label={task.type}>{task.type}</Chip>
            <AvatarGroup max={3}>
              {task.assignees.map((el, idx) => (
                <Avatar
                  key={idx}
                  sx={{ width: 20, height: 20 }}
                  alt="assignee logo"
                  src={el?.avatar}
                  title={`${el?.firstName} ${el?.lastName ? el.lastName : ""}`}
                />
              ))}
            </AvatarGroup>
          </Bar>
          <Bar>
            <Typography>{task.draft}</Typography>
            <Box className="action" display="none">
              <ModeEditIcon
                onClick={() => {
                  setOpen(true);
                }}
                sx={{
                  cursor: "pointer",
                  mr: "8px",
                }}
              />
              <DeleteOutlineIcon
                onClick={() => {
                  dispatch(deleteTask({ task }));
                }}
                sx={{
                  color: "#d32f2f",
                  cursor: "pointer",
                }}
              />
            </Box>
          </Bar>
        </Card>
      )}
    </Draggable>
  );
};

export default Task;

const Card = styled(Box)({
  padding: "10px",
  background: "#ffffff",
  border: "1px solid lightgray",
  borderRadius: "10px",
  transition: "0.2s",
  ":hover": {
    boxShadow: "0 0 3px black",
    transform: "scale(1.02)",
    ".action": { display: "block" },
  },
});

const Bar = styled(FlexBox)({
  justifyContent: "space-between",
});

const Chip = styled(Box)(({ label }) => ({
  borderRadius: "18px",
  fontSize: "10px",
  padding: "3px 6px",
  background:
    label === "bug" ? "#d32f2f" : label === "feature" ? "#1976d2" : "#2da44e",
  color: "#ffffff",
}));
