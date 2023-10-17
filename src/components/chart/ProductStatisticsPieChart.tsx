import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../hooks/store";
import { ProductStatistic } from "../../types/dashboard";

const size = {
  width: 500,
  height: 230,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

function handleChartData(productStatistics: ProductStatistic | undefined) {
  if (!productStatistics) return [];

  return [
    {
      value: productStatistics.approved,
      label: `Đã xác nhận: ${productStatistics.approved}`,
      color: "green",
    },
    {
      value: productStatistics.pending,
      label: `Chưa yêu cầu: ${productStatistics.pending}`,
      color: "blue",
    },
    {
      value: productStatistics.requesting,
      label: `Chờ xác nhận: ${productStatistics.requesting}`,
      color: "orange",
    },
    {
      value: productStatistics.banned,
      label: `Đã bị chặn: ${productStatistics.banned}`,
      color: "gray",
    },
    {
      value: productStatistics.rejected,
      label: `Đã từ chối: ${productStatistics.rejected}`,
      color: "red",
    },
  ];
}

export default function PieChartWithCenterLabel() {
  const productStatistics = useAppSelector(
    (state) => state.dashboard.statistic?.product_count
  );
  const data = handleChartData(productStatistics);

  return (
    (productStatistics && (
      <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
        <PieCenterLabel>{productStatistics?.total} Sản phẩm</PieCenterLabel>
      </PieChart>
    )) || <></>
  );
}
