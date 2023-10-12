import StatisticsItemBase from "../StatisticsItemBase";
import { useAppSelector } from "../../../hooks/store";

export default function OrganizationStatistic() {
  const organizationStatistic = useAppSelector(
    (state) => state.dashboard.statistic?.organization_count
  );

  return (
    <StatisticsItemBase
      title="Tổng tổ chức"
      quantity={organizationStatistic as number}
    />
  );
}
