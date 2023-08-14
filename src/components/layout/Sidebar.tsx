import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { layoutActions } from "../../store/layout/layoutSlice";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { authActions } from "../../store/auth/authSlice";

const Item = ({ title, to, icon, selected, setSelected }: any) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link to={to}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

const SidebarCustom = () => {
  const theme = useTheme();
  const userInfo = useAppSelector((state) => state.auth.dataUser);
  const isCollapseSidebar = useAppSelector(
    (state) => state.layout.isCollapseSidebar
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Dashboard");

  const handleLogout = async () => {
    dispatch(
      authActions.logout({
        onNavigate: () => navigate("/login"),
      })
    );
  };

  return (
    <Box
      sx={{
        "& .ps-sidebar-root": {
          height: "100%",
          px: 1,
        },
        "& .ps-sidebar-container": {
          bgcolor: `${theme.palette.background.default} !important`,
        },
        "& .ps-active": {
          bgcolor: "#CCC",
          borderRadius: 2,
        },
        "& .ps-active > .ps-menu-button:hover": {
          bgcolor: "#CCC",
          borderRadius: 2,
        },
        "& .ps-menu-button:hover": {
          bgcolor: "#CCC",
          borderRadius: 2,
        },
        "& .ps-menu-button": {
          borderRadius: 2,
          paddingLeft: "15px !important",
        },
        position: "fixed",
        top: 0,
        bottom: 0,
        overflow: "auto",
      }}
    >
      <Sidebar collapsed={isCollapseSidebar}>
        <Menu>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => dispatch(layoutActions.toggleCollapseSidebar())}
            icon={isCollapseSidebar ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "0 0 20px 0",
              //   color: colors.grey[100],
            }}
          >
            {!isCollapseSidebar && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                sx={{ py: "15px" }}
              >
                <Typography variant="h3">E-Product ID</Typography>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(layoutActions.toggleCollapseSidebar());
                  }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapseSidebar && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar sx={{ width: 80, height: 80 }} alt={userInfo?.name} />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userInfo?.name}
                </Typography>
                <Typography variant="h5">{userInfo?.email}</Typography>
              </Box>
            </Box>
          )}

          <Box>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapseSidebar && (
              <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
                Settings
              </Typography>
            )}
            <MenuItem
              style={{ marginTop: "8px" }}
              onClick={handleLogout}
              icon={<LogoutIcon />}
            >
              <Typography>Logout</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarCustom;
