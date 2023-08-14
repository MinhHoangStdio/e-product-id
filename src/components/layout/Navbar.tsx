import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { layoutActions } from "../../store/layout/layoutSlice";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const theme = useAppSelector((state) => state.layout.theme);
  const dispatch = useAppDispatch();
  const toggleTheme = () => {
    if (theme == "dark") {
      dispatch(layoutActions.changeTheme("light"));
    } else {
      dispatch(layoutActions.changeTheme("dark"));
    }
  };
  return (
    <Box display="flex" justifyContent="space-between" sx={{ px: 4, py: 2 }}>
      {/* SEARCH BAR */}
      <Box display="flex">
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: "300px" }}
          placeholder="Search"
        />
      </Box>

      {/* ICONS */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          sx={{
            width: "40px",
            height: "40px",
          }}
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton sx={{ width: "40px", height: "40px" }}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ width: "40px", height: "40px" }}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ width: "40px", height: "40px" }}>
          <PersonOutlinedIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Navbar;
