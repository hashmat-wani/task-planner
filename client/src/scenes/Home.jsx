import { useContext, useEffect, useState } from "react";
import { Box, Fab, IconButton, Menu, MenuItem, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Sprint from "../components/Sprint";
import AddIcon from "@mui/icons-material/Add";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchUserSprints } from "../state/sprintsSlice";
import { loadingContext } from "../context/LoadingContext";
import CreateSprint from "../components/CreateSprint";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { shades } from "../theme";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { FlexBox } from "../components/FlexBox";
import EditSprint from "../components/EditSprint";
import DeleteSprint from "../components/DeleteSprint";

const Modify = ({ sprintId, sprintName, setValue }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { sprints } = useSelector((state) => state.sprints, shallowEqual);
  const [open, setOpen] = useState(false);
  const [openDlt, setOpenDlt] = useState(false);

  const handleOpenUserMenu = (event) => {
    event.stopPropagation();
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    event.stopPropagation();
    setAnchorElUser(null);
  };

  const handleDlt = (e) => {
    e.stopPropagation();
    handleCloseUserMenu(e);
    setOpenDlt(true);
  };
  const handleEdit = (e) => {
    e.stopPropagation();
    handleCloseUserMenu(e);
    setOpen(true);
  };
  return (
    <Box ml="15px">
      <EditSprint {...{ open, setOpen, sprintName, id: sprintId }} />
      <DeleteSprint
        {...{ open: openDlt, setOpen: setOpenDlt, id: sprintId, setValue }}
      />
      <IconButton onClick={handleOpenUserMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        sx={{
          "& ul": {
            padding: 0,
          },
          "> div": {
            borderRadius: "10px",
          },
        }}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          sx={{
            borderBottom: `1px solid ${shades.secondary[300]}`,
          }}
          onClick={handleEdit}
        >
          <FlexBox gap="5px">
            <ModeEditIcon />
            Edit
          </FlexBox>
        </MenuItem>

        {sprints.length > 1 && (
          <MenuItem onClick={handleDlt}>
            <FlexBox gap="5px" color="#d32f2f">
              <DeleteOutlineIcon />
              Delete
            </FlexBox>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default function Home() {
  const [value, setValue] = useState(null);

  const [openCreateSprint, setOpenCreateSprint] = useState(false);

  const dispatch = useDispatch();
  const { toggleLoading } = useContext(loadingContext);

  const { sprints } = useSelector((state) => state.sprints, shallowEqual);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchUserSprints({ toggleLoading, setValue }));
  }, []);

  return (
    <Box
      sx={{
        height: "calc(100vh - 120px)",
        m: "10px auto",
        maxWidth: "1300px",
      }}
    >
      <CreateSprint open={openCreateSprint} setOpen={setOpenCreateSprint} />
      {value && (
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {sprints.map((el, idx) => (
                <Tab
                  sx={{
                    minHeight: 0,
                    lineHeight: 1,
                    p: "5px 15px",
                    textTransform: "none",
                  }}
                  icon={
                    <Modify
                      sprintId={el._id}
                      sprintName={el?.name}
                      setValue={setValue}
                    />
                  }
                  iconPosition="end"
                  key={idx}
                  label={el.name}
                  value={el._id}
                />
              ))}
            </TabList>
          </Box>
          <TabPanel
            sx={{
              height: "100%",
              borderTop: 1,
              borderColor: "divider",
              padding: "10px",
            }}
            value={value}
          >
            <Sprint sprintId={value} />
          </TabPanel>
        </TabContext>
      )}
      <Fab
        sx={{ position: "absolute", bottom: 35, right: 35 }}
        color="primary"
        aria-label="add"
        onClick={() => setOpenCreateSprint(true)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
