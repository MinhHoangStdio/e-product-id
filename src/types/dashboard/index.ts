export interface ProductStatistic {
  total: number;
  approved: number;
  rejected: number;
  banned: number;
  requesting: number;
  pending: number;
  total_view: number;
}

export interface ConsignmentStatistic {
  total: number;
  qr_release: number;
}

export interface AdminStatistics {
  product_count: ProductStatistic;
  consignment_count: ConsignmentStatistic;
  user_count: number;
  organization_count: number;
  category_count: number;
}
