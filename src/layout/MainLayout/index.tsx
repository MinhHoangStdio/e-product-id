import { Box, Paper } from "@mui/material";
import Navbar from "../../components/layout/Navbar";
import SidebarCustom from "../../components/layout/Sidebar";
import { useAppSelector } from "../../hooks/store";
import CreateAndEditCategoryModal from "../../components/modal/category/CreateAndEditCategoryModal";
import ConfirmModal from "../../components/modal/ConfirmModal";
import { colorToken } from "../../theme/colorToken";
import CreateUserModal from "../../components/modal/user/createUser";
import CreateOrganizationModal from "../../components/modal/organization/createOrganization";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isCollapseSidebar = useAppSelector(
    (state) => state.layout.isCollapseSidebar
  );

  //test theme
  const mode = useAppSelector((state) => state.layout.theme);
  const colors = colorToken(mode);

  return (
    <>
      <SidebarCustom />
      <main
        className="content"
        style={
          !isCollapseSidebar
            ? { paddingLeft: "250px", transition: "padding 0.3s ease" }
            : { paddingLeft: "80px", transition: "padding 0.3s ease" }
        }
      >
        <Navbar />
        <Box sx={{ px: 4, pb: 4, bgcolor: colors.background.main }}>
          <Paper sx={{ minHeight: "85vh" }}>{children}</Paper>
        </Box>
        <CreateAndEditCategoryModal />
        <ConfirmModal />
        <CreateUserModal />
        <CreateOrganizationModal />
      </main>
    </>
  );
};
export default MainLayout;
