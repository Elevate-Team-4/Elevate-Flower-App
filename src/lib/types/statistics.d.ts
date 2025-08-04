// Overall statistics
export type Overall = {
  statistics: {
    totalProducts: number;
    totalOrders: number;
    totalCategories: number;
    totalRevenue: number;
  };
};

// Category statistics
export type CategoryStatistics = {
  statistics: {
    _id: string;
    name: string;
    totalProducts: number;
    totalRevenue: number;
  }[];
};
