import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { Box, Stack, Typography } from "@mui/material";
import MemberTable from "./memberTable";
import { organizationActions } from "../../store/organization/organizationSlice";
import { useEffect } from "react";
import CustomButton from "../../components/share/CustomButton";
import { layoutActions } from "../../store/layout/layoutSlice";

const OrganizationDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const organization = useAppSelector(
    (state) => state.organization.detailOrganization
  );

  useEffect(() => {
    dispatch(organizationActions.getDetailOrganization(id));
  }, [dispatch]);

  return organization ? (
    <Box p={4}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h2">Thông tin tổ chức</Typography>
        <CustomButton
          color="primary"
          label="Thêm thành viên"
          onClick={() => {
            dispatch(layoutActions.openModalAddMember());
          }}
        />
      </Stack>
      <Typography sx={{ fontSize: "16px", mt: 1 }}>
        <b>Tên:</b> {organization.name}
      </Typography>
      <Typography sx={{ fontSize: "16px", mt: 1 }}>
        <b>Danh sách thành viên:</b>
      </Typography>
      <MemberTable />
    </Box>
  ) : (
    <></>
  );
};

export default OrganizationDetail;
