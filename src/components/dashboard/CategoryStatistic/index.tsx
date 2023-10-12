import StatisticsItemBase from "../StatisticsItemBase";
import { useAppSelector } from "../../../hooks/store";

export default function CategoryStatistic() {
  const categoryStatistic = useAppSelector(
    (state) => state.dashboard.statistic?.category_count
  );

  return (
    <StatisticsItemBase
      title="Tổng danh mục"
      quantity={categoryStatistic as number}
    />
  );
}
