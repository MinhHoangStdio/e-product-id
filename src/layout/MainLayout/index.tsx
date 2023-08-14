import { Box, Paper, useTheme } from "@mui/material";
import Navbar from "../../components/layout/Navbar";
import SidebarCustom from "../../components/layout/Sidebar";
import { useAppSelector } from "../../hooks/store";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isCollapseSidebar = useAppSelector(
    (state) => state.layout.isCollapseSidebar
  );
  const theme = useTheme();
  return (
    <>
      <SidebarCustom />
      <main
        className="content"
        style={
          !isCollapseSidebar
            ? { marginLeft: "250px", transition: "margin 0.3s ease" }
            : { marginLeft: "80px", transition: "margin 0.3s ease" }
        }
      >
        <Navbar />
        <Box sx={{ px: 4, bgcolor: theme.palette.background.default }}>
          <Paper sx={{ minHeight: "85vh" }}>{children}</Paper>
        </Box>
      </main>
    </>
  );
};
export default MainLayout;
