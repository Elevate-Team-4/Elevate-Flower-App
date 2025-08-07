export interface OrderStatus {
  statistics: Statistics;
}

export interface Statistics {
  ordersByStatus: OrdersByStatu[];
  dailyRevenue: DailyRevenue[];
  monthlyRevenue: MonthlyRevenue[];
}

export interface OrdersByStatus {
  _id?: string;
  count: number;
}

export interface DailyRevenue {
  _id: string;
  revenue: number;
  count: number;
}

export interface MonthlyRevenue {
  _id: string;
  revenue: number;
  count: number;
}
