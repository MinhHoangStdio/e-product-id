import { Box, Paper, useTheme } from "@mui/material";
import Navbar from "../../components/layout/Navbar";
import SidebarCustom from "../../components/layout/Sidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect } from "react";
import { categoryActions } from "../../store/category/categorySlice";
import CreateCategoryModal from "../../components/modal/category/CreateAndEditCategoryModal";
import ConfirmModal from "../../components/modal/category/ConfirmDeleteCategoryModal";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
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
        <CreateCategoryModal />
        <ConfirmModal />
      </main>
    </>
  );
};
export default MainLayout;
