import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { Box, Typography } from "@mui/material";
import MemberTable from "./memberTable";
import { organizationActions } from "../../store/organization/organizationSlice";
import { useEffect } from "react";

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
      <Typography variant="h2">Organization Detail</Typography>
      <Typography sx={{ fontSize: "16px", mt: 1 }}>
        <b>Name:</b> {organization.name}
      </Typography>
      <Typography sx={{ fontSize: "16px", mt: 1 }}>
        <b>List members:</b>
      </Typography>
      <MemberTable />
    </Box>
  ) : (
    <></>
  );
};

export default OrganizationDetail;
