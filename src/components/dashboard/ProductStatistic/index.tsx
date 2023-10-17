import { Stack, Typography } from "@mui/material";
import StatisticsItemBase from "../StatisticsItemBase";
import { useAppSelector } from "../../../hooks/store";

export default function ProductStatistic() {
  const statisticProduct = useAppSelector(
    (state) => state.dashboard.statistic?.product_count
  );
  const body = (
    <Stack sx={{ mt: 1 }} spacing={1}>
      <Typography variant="h6">
        Tổng lượt xem sản phẩm: {statisticProduct?.total_view}
      </Typography>
    </Stack>
  );
  return (
    <StatisticsItemBase
      title="Tổng sản phẩm"
      quantity={statisticProduct?.total as number}
      BodyContent={body}
    />
  );
}
