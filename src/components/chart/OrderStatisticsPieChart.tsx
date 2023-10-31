import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../hooks/store";
import { OrderStatistic } from "../../types/dashboard";

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

function handleChartData(orderStatistics: OrderStatistic | undefined) {
  if (!orderStatistics) return [];

  return [
    {
      value: orderStatistics.pending,
      label: `Chưa xử lý: ${orderStatistics.pending}`,
      color: "#33CCFF",
    },
    {
      value: orderStatistics.completed,
      label: `Đã hoàn thành: ${orderStatistics.completed}`,
      color: "#339966",
    },
  ];
}

export default function PieChartWithCenterLabel() {
  const orderStatistics = useAppSelector(
    (state) => state.dashboard.statistic?.order_count
  );
  const data = handleChartData(orderStatistics);

  return (
    (orderStatistics && (
      <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
        <PieCenterLabel>{orderStatistics?.total} Đơn hàng</PieCenterLabel>
      </PieChart>
    )) || <></>
  );
}
