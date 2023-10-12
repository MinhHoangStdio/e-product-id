import { Stack, Typography } from "@mui/material";
import React from "react";
import StatisticsItemBase from "../StatisticsItemBase";
import { useAppSelector } from "../../../hooks/store";
import ProductStatus from "../../chip/ProductStatus";
import { EApprovalStatus } from "../../../types/enums/product";

export default function ProductStatistic() {
  const statisticProduct = useAppSelector(
    (state) => state.dashboard.statistic?.product_count
  );
  const body = (
    <Stack sx={{ mt: 1 }} spacing={1}>
      <Typography variant="h6">
        Tổng số lượt xem sản phẩm: {statisticProduct?.total_view}
      </Typography>
      <Stack direction="row" spacing={1}>
        <ProductStatus status={EApprovalStatus.Approve} />
        <Typography>: {statisticProduct?.approved}</Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <ProductStatus status={EApprovalStatus.Requesting} />
        <Typography>: {statisticProduct?.requesting}</Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <ProductStatus status={EApprovalStatus.Pending} />
        <Typography>: {statisticProduct?.pending}</Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <ProductStatus status={EApprovalStatus.Reject} />
        <Typography>: {statisticProduct?.rejected}</Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <ProductStatus status={EApprovalStatus.Ban} />
        <Typography>: {statisticProduct?.banned}</Typography>
      </Stack>
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
