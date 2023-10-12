import { Stack, Typography } from "@mui/material";
import StatisticsItemBase from "../StatisticsItemBase";
import { useAppSelector } from "../../../hooks/store";

export default function ConsignmentStatistic() {
  const statisticConsignment = useAppSelector(
    (state) => state.dashboard.statistic?.consignment_count
  );
  const body = (
    <Stack sx={{ mt: 1 }} spacing={1}>
      <Stack direction="row" spacing={1}>
        <Typography variant="h6">
          Lô hàng đã cấp mã QR: {statisticConsignment?.qr_release}
        </Typography>
      </Stack>
    </Stack>
  );
  return (
    <StatisticsItemBase
      title="Tổng lô hàng"
      quantity={statisticConsignment?.total as number}
      BodyContent={body}
    />
  );
}
