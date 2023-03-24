import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FlexBox } from "./FlexBox";
import { shades } from "../theme";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { green } from "@mui/material/colors";
import { logOut } from "../state/userSlice";
import { useContext, useState } from "react";
import { STATUS } from "../utils/enums";
import { loadingContext } from "../context/LoadingContext";

const UserAvatar = ({ user, setEmailVerificationAlert }) => {
  return (
    <>
      {user?.verified ? (
        <Avatar src={user?.avatar} />
      ) : (
        <Chip
          sx={{ cursor: "pointer" }}
          avatar={<Avatar src={user?.avatar} />}
          label={
            <Badge
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setEmailVerificationAlert(true);
              }}
              badgeContent="Verify"
              sx={{
                "& .MuiBadge-badge": {
                  color: "#ef7b1b",
                  fontSize: "11px",
                },
                mt: "-1px",
                ml: "16px",
                mr: "10px",
              }}
            />
          }
          variant="outlined"
        />
      )}
    </>
  );
};

const UserAlphaticAvatar = ({ user, setEmailVerificationAlert }) => {
  return (
    <>
      {user?.verified ? (
        <Avatar
          sx={{
            bgcolor: green[500],
            color: "#fff !important",
          }}
        >
          {user.firstName[0].toUpperCase()}
        </Avatar>
      ) : (
        <Chip
          sx={{ cursor: "pointer" }}
          avatar={
            <Avatar
              sx={{
                bgcolor: green[500],
                color: "#fff !important",
              }}
            >
              {user.firstName[0].toUpperCase()}
            </Avatar>
          }
          label={
            <Badge
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setEmailVerificationAlert(true);
              }}
              badgeContent="Verify"
              sx={{
                "& .MuiBadge-badge": {
                  color: "#ef7b1b",
                  fontSize: "11px",
                },
                mt: "-1px",
                ml: "16px",
                mr: "10px",
              }}
            />
          }
          variant="outlined"
        />
      )}
    </>
  );
};

function Navbar({ setEmailVerificationAlert }) {
  const { user, status } = useSelector((state) => state.user, shallowEqual);

  const { toggleLoading } = useContext(loadingContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { pathname } = useLocation();
  if (
    [
      "/signin",
      "/signup",
      "/new-password",
      "/reset-password/instructions",
      "/reset-password",
      "/expired",
    ].includes(pathname)
  )
    return null;

  return (
    <FlexBox
      sx={{ borderBottom: `1px solid ${shades.primary[100]}` }}
      p="10px 20px"
      position="sticky"
      top={0}
      zIndex={200}
      backgroundColor="#fafafc"
      justifyContent="space-between"
    >
      {/* Logo */}
      <Box>
        <Link to="/">
          <img width="30px" src={logo} alt="" />
        </Link>
      </Box>

      {/* user settings */}
      <Box>
        {user ? (
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user?.avatar ? (
                <UserAvatar {...{ user, setEmailVerificationAlert }} />
              ) : (
                <UserAlphaticAvatar {...{ user, setEmailVerificationAlert }} />
              )}
            </IconButton>
          </Tooltip>
        ) : (
          <FlexBox
            sx={{
              columnGap: "10px",
              fontWeight: "bold",
            }}
          >
            <Link to="/signin">
              <Box cursor="pointer" fontSize="12px" padding="5px 10px">
                SIGN IN
              </Box>
            </Link>
            <Link to="/signup">
              <Box
                fontSize="12px"
                padding="5px 10px"
                borderRadius="25px"
                color="#fff"
                backgroundColor={shades.secondary[900]}
              >
                SIGN UP
              </Box>
            </Link>
          </FlexBox>
        )}
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
          {/* Email menu item */}
          <MenuItem
            sx={{
              borderBottom: `1px solid ${shades.secondary[300]}`,
              minWidth: "210px",
              padding: "8px 10px",
            }}
            onClick={handleCloseUserMenu}
          >
            <FlexBox justifyContent="space-between" gap="35px">
              <Box>
                <Typography fontWeight="bold" fontSize="13px">
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography color={shades.primary[300]} variant="small">
                  {user?.email}
                </Typography>
              </Box>
              <Box>
                <Button
                  sx={{
                    fontSize: "10px",
                    padding: 0,
                    color: "#fff",
                    borderRadius: "50px",
                    pt: "1px",
                    bgcolor: user?.verified ? "#40a0ed" : "#ff7300",
                    ":hover": {
                      bgcolor: user?.verified ? "#008cff" : "#ff5e00",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (!user?.verified) setEmailVerificationAlert(true);
                  }}
                >
                  {user?.verified ? "Verified" : "Verify"}
                </Button>
              </Box>
            </FlexBox>
          </MenuItem>

          {/* links */}
          <Box sx={{ borderBottom: `1px solid ${shades.secondary[300]}` }}>
            {status === STATUS.LOADING ? (
              <MenuItem
                sx={{
                  p: "8px 10px",
                }}
              >
                <CircularProgress size="15px" />
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  dispatch(
                    logOut({ toggleLoading, navigate, handleCloseUserMenu })
                  );
                }}
                sx={{
                  p: "8px 10px",
                  fontSize: "13px",
                }}
              >
                Sign out
              </MenuItem>
            )}
          </Box>
        </Menu>
      </Box>
    </FlexBox>
  );
}
export default Navbar;
