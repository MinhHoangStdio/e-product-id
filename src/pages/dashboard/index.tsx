import { Box, Grid, Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks/store";
import ProductStatistic from "../../components/dashboard/ProductStatistic";
import { useEffect } from "react";
import { dashboardAction } from "../../store/dashboard/dashboardSlice";
import ConsignmentStatistic from "../../components/dashboard/ConsignmentStatistic";
import UserStatistic from "../../components/dashboard/UserStatistic";
import OrganizationStatistic from "../../components/dashboard/OrganizationStatistic";
import CategoryStatistic from "../../components/dashboard/CategoryStatistic";
import ProductStatisticsPieChart from "../../components/chart/ProductStatisticsPieChart";
const InfoPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dashboardAction.getStatistic());
  }, [dispatch]);

  return (
    <Grid sx={{ p: 1 }} container>
      <Grid item xs={12}></Grid>
      <Grid sx={{ p: 1, mb: 2 }} item xs={7} columnGap={4}>
        <Box p={4} border={"2px solid skyblue"} borderRadius={"5px"}>
          <Typography mb={5} variant="h3">
            Sản phẩm
          </Typography>
          <ProductStatisticsPieChart />
        </Box>
      </Grid>
      <Grid item xs={1}></Grid>

      <Grid sx={{ p: 1 }} item xs={4}>
        <ProductStatistic />
      </Grid>
      <Grid sx={{ p: 1 }} item xs={3}>
        <CategoryStatistic />
      </Grid>
      <Grid sx={{ p: 1 }} item xs={3}>
        <ConsignmentStatistic />
      </Grid>
      <Grid sx={{ p: 1 }} item xs={3}>
        <UserStatistic />
      </Grid>
      <Grid sx={{ p: 1 }} item xs={3}>
        <OrganizationStatistic />
      </Grid>
    </Grid>
  );
};

export default InfoPage;
