import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { layoutActions } from "../../store/layout/layoutSlice";
import { authActions } from "../../store/auth/authSlice";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import LogoutIcon from "@mui/icons-material/Logout";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import { colorToken } from "../../theme/colorToken";
import userDefaultImg from "../../assets/user/user.png";
import PeopleIcon from '@mui/icons-material/People';

const Item = ({ title, to, icon, selected, setSelected, navigate }: any) => {
  return (
    <MenuItem
      active={selected.toLowerCase() === title.toLowerCase()}
      onClick={() => {
        setSelected(title);
        navigate(to);
      }}
      icon={icon}
    >
      <Typography fontWeight="500">{title}</Typography>
    </MenuItem>
  );
};

const SidebarCustom = () => {
  const theme = useTheme();

  //test theme
  const mode = useAppSelector((state) => state.layout.theme);
  const colors = colorToken(mode);

  const userInfo = useAppSelector((state) => state.auth.dataUser);
  const location = useLocation();
  const path = location.pathname.replace("/", "");
  const isCollapseSidebar = useAppSelector(
    (state) => state.layout.isCollapseSidebar
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(path);
  }, []);

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
        bgcolor: `${colors.sidebar.background}`,
        "& .ps-sidebar-root": {
          height: "100%",
          px: 1,
          borderRight: `1px solid ${colors.sidebar.border} !important`,
        },
        "& .ps-sidebar-container": {
          bgcolor: `${colors.sidebar.background} !important`,
        },
        "& .ps-active": {
          bgcolor: `${colors.sidebar.bgselect}`,
          borderRadius: 2,
        },
        "& .ps-menuitem-root.ps-active > .ps-menu-button:hover": {
          bgcolor: `${colors.sidebar.bgselect}`,
          borderRadius: 2,
        },
        "& .ps-menuitem-root > .ps-menu-button:hover": {
          bgcolor: `${colors.sidebar.bghover}`,
          borderRadius: 2,
        },
        "& .ps-menu-button": {
          borderRadius: 2,
          paddingLeft: "15px !important",
        },
        "& .ps-submenu-content": {
          padding: "4px",
          background: `${theme.palette.background.default} !important`,
        },
        "& .ps-submenu-content .ps-menuitem-root": {
          border: "1px solid #ccc",
        },
        "& .ps-menuitem-root": {
          marginBottom: "4px",
          borderRadius: 2,
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
                <Avatar
                  sx={{ width: 80, height: 80 }}
                  src={userDefaultImg}
                  alt={userInfo?.name}
                />
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
              navigate={navigate}
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              navigate={navigate}
              title="Categories"
              to="/categories"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              navigate={navigate}
              title="Products"
              to="/products"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              navigate={navigate}
              title="Users"
              to="/users"
              icon={<PeopleIcon />}
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
