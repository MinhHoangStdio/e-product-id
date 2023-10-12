import { Grid } from "@mui/material";
import { useAppDispatch } from "../../hooks/store";
import ProductStatistic from "../../components/dashboard/ProductStatistic";
import { useEffect } from "react";
import { dashboardAction } from "../../store/dashboard/dashboardSlice";
import ConsignmentStatistic from "../../components/dashboard/ConsignmentStatistic";
import UserStatistic from "../../components/dashboard/UserStatistic";
import OrganizationStatistic from "../../components/dashboard/OrganizationStatistic";
import CategoryStatistic from "../../components/dashboard/CategoryStatistic";
const InfoPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dashboardAction.getStatistic());
  }, [dispatch]);

  return (
    <Grid sx={{ p: 1 }} container>
      <Grid item xs={12}></Grid>
      <Grid sx={{ p: 1 }} item xs={4}>
        <ProductStatistic />
      </Grid>
      <Grid sx={{ p: 1 }} item xs={4}>
        <CategoryStatistic />
      </Grid>
      <Grid sx={{ p: 1 }} item xs={4}>
        <ConsignmentStatistic />
      </Grid>
      <Grid sx={{ p: 1 }} item xs={4}>
        <UserStatistic />
      </Grid>
      <Grid sx={{ p: 1 }} item xs={4}>
        <OrganizationStatistic />
      </Grid>
    </Grid>
  );
};

export default InfoPage;
