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
import { createTask } from "../state/tasksSlice";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide ref={ref} {...props} />;
});

export default function AddTask({
  sprintId,
  status: taskStatus,
  open,
  setOpen,
}) {
  const dispatch = useDispatch();

  const initialValues = {
    draft: "",
    assignees: [],
    type: "",
  };
  const [formData, setFormData] = useState(initialValues);

  const { toggleLoading } = useContext(loadingContext);

  const { status } = useSelector((state) => state.tasks, shallowEqual);
  const { allUsers } = useSelector((state) => state.user, shallowEqual);

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValues);
  };

  const handleAdd = () => {
    // sprintId,status
    const assignees = formData.assignees.map((el) => el._id);
    const args = {
      payload: { ...formData, assignees, status: taskStatus, sprint: sprintId },
      handleClose,
    };
    dispatch(createTask(args));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

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
        <DialogTitle>Add Task</DialogTitle>
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
                  {option.firstName} {option?.firstName}
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
                onClick={handleAdd}
                sx={{
                  textTransform: "none",
                  height: "100%",
                  borderRadius: "7px",
                }}
                disabled={status === STATUS.LOADING}
                fullWidth
                variant="contained"
              >
                Add
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

// import * as React from 'react';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

// export default function CheckboxesTags() {
//   return (
//     <Autocomplete
//       multiple
//       id="checkboxes-tags-demo"
//       options={top100Films}
//       disableCloseOnSelect
//       getOptionLabel={(option) => option.title}
//       renderOption={(props, option, { selected }) => (
//         <li {...props}>
//           <Checkbox
//             icon={icon}
//             checkedIcon={checkedIcon}
//             style={{ marginRight: 8 }}
//             checked={selected}
//           />
//           {option.title}
//         </li>
//       )}
//       style={{ width: 500 }}
//       renderInput={(params) => (
//         <TextField {...params} label="Checkboxes" placeholder="Favorites" />
//       )}
//     />
//   );
// }

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
];
