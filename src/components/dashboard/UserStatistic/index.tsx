import StatisticsItemBase from "../StatisticsItemBase";
import { useAppSelector } from "../../../hooks/store";

export default function UserStatistic() {
  const userStatistic = useAppSelector(
    (state) => state.dashboard.statistic?.user_count
  );

  return (
    <StatisticsItemBase
      title="Tổng người dùng"
      quantity={userStatistic as number}
    />
  );
}
