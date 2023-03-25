import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  CircularProgress,
  DialogContent,
  Slide,
  Typography,
} from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { STATUS } from "../utils/enums";
import { forwardRef, useContext } from "react";
import { FlexBox } from "./FlexBox";
import { shades } from "../theme";
import { deleteSprint } from "../state/sprintsSlice";
import { loadingContext } from "../context/LoadingContext";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide ref={ref} {...props} />;
});

export default function DeleteSprint({ open, setOpen, id, setValue }) {
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.sprints, shallowEqual);
  const { toggleLoading } = useContext(loadingContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const args = {
      sprintId: id,
      toggleLoading,
      setValue,
      handleClose,
    };
    dispatch(deleteSprint(args));
  };

  return (
    <div>
      <Dialog
        sx={{
          ".MuiDialog-container .MuiPaper-root": {
            width: "400px",
            margin: "10px",
            minWidth: "300px",
            borderRadius: "20px",
            p: "10px",
          },
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>Delete Sprint</DialogTitle>
        <DialogContent>
          <Box my="15px">
            <Typography>Are you sure you want to delete Sprint?</Typography>

            <Typography fontSize="13px" my="7px">
              By deleting sprint, you'll lose all tasks related to this sprint.
            </Typography>

            <Typography fontSize="16px" my="15px">
              This action cannot be undone.
            </Typography>
          </Box>

          <FlexBox
            height="45px"
            m="35px 0 10px"
            gap="10px"
            justifyContent="space-between"
            sx={{
              alignItems: "stretch",
            }}
          >
            <Button
              disabled={status === STATUS.LOADING}
              onClick={handleClose}
              sx={{
                textTransform: "none",
                p: "0 25px",
                backgroundColor: shades.secondary[300],
                borderRadius: "7px",
              }}
            >
              Cancel
            </Button>

            <Box
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <Button
                onClick={handleDelete}
                sx={{
                  background: "#ff6b60",
                  ":hover": {
                    background: "#fa4033",
                  },
                  textTransform: "none",
                  height: "100%",
                  borderRadius: "7px",
                }}
                disabled={status === STATUS.LOADING}
                fullWidth
                variant="contained"
              >
                Delete sprint
              </Button>
              {status === STATUS.LOADING && (
                <CircularProgress
                  size={18}
                  sx={{
                    color: "#000000",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-9px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </FlexBox>
        </DialogContent>
      </Dialog>
    </div>
  );
}
