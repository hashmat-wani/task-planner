import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  Slide,
  TextField,
  Dialog,
  DialogTitle,
  Checkbox,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { STATUS } from "../utils/enums";
import { forwardRef, useContext, useEffect, useState } from "react";
import { FlexBox } from "./FlexBox";
import { shades } from "../theme";
import { createUserSprint } from "../state/sprintsSlice";
import { loadingContext } from "../context/LoadingContext";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { fetchAllUsers } from "../state/userSlice";
import { editTask } from "../state/tasksSlice";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide ref={ref} {...props} />;
});

export default function EditTask({ task, open, setOpen }) {
  const dispatch = useDispatch();

  //   const initialValues = {
  //     draft: "",
  //     assignees: [],
  //     type: "",
  //   };
  const [formData, setFormData] = useState(task);

  const { toggleLoading } = useContext(loadingContext);

  const { status } = useSelector((state) => state.tasks, shallowEqual);
  const { allUsers } = useSelector((state) => state.user, shallowEqual);

  const handleClose = () => {
    setOpen(false);
    setFormData(task);
  };

  const handleEdit = () => {
    // sprintId,status
    const assignees = formData.assignees.map((el) => el._id);
    const args = {
      payload: { ...formData, assignees },
      handleClose,
    };
    dispatch(editTask(args));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const missingField = () =>
    formData.draft.trim() === "" || formData.type === "";

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
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Box my="15px">
            <TextField
              onChange={handleChange}
              value={formData.draft}
              label="Draft"
              size="small"
              placeholder="e.g. Implement Auth"
              required
              fullWidth
              name="draft"
            />

            {/* ---------Assignees--------- */}

            <Autocomplete
              multiple
              limitTags={2}
              sx={{ my: 2 }}
              size="small"
              onChange={(event, newValue) => {
                setFormData({ ...formData, assignees: newValue });
              }}
              value={formData.assignees}
              options={allUsers}
              disableCloseOnSelect
              getOptionLabel={(option) =>
                `${option.firstName} ${option?.lastName}`
              }
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.firstName} {option?.lastName}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Assignees"
                  placeholder="Assignees"
                />
              )}
            />

            {/* --------Type------------ */}

            <FormControl required size="small" fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                size="small"
                value={formData.type}
                label="Type"
                onChange={handleChange}
                name="type"
                required
              >
                <MenuItem value="bug">Bug</MenuItem>
                <MenuItem value="feature">Feature</MenuItem>
                <MenuItem value="story">Story</MenuItem>
              </Select>
            </FormControl>
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
                onClick={handleEdit}
                sx={{
                  textTransform: "none",
                  height: "100%",
                  borderRadius: "7px",
                }}
                disabled={status === STATUS.LOADING || missingField()}
                fullWidth
                variant="contained"
              >
                Update
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
