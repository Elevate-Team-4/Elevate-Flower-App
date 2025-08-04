"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { OrdersByStatu } from "@/lib/types/statistics";

/**
 * OrdersStatusChart Component
 *
 * This component displays a pie chart that visualizes the distribution of order statuses
 * (e.g., completed, inProgress, canceled). It:
 *
 * - Receives `ordersByStatus` as a prop (an array of order status objects).
 * - Filters out invalid or unwanted statuses (null and "pending").
 * - Calculates the total count and the percentage for each valid status.
 * - Adds a color to each status for visual distinction.
 * - Renders a styled pie chart with a custom label and a legend.
 *
 * Used for analytics dashboards or admin panels to provide insight into order statuses.
 */

// statusColors
const statusColors: Record<string, string> = {
  completed: "#00BC7D",
  inProgress: "#2B7FFF",
  canceled: "#DC2626",
};
export function OrdersStatusChart({ ordersByStatus }: { ordersByStatus: OrdersByStatu[] }) {
  // Hook
  // chartData this is new ordersByStatus
  const [chartData, setChartData] = useState<
    (OrdersByStatu & { fill: string; percentage: number })[]
  >([]);

  // Prepare chart data:
  // 1. Calculate the total number of orders.
  // 2. Filter out unwanted statuses (null and "pending").
  // 3. Calculate the percentage for each status.
  // 4. Add a corresponding color and percentage to each item.
  useEffect(() => {
    const total = ordersByStatus.reduce((acc, item) => acc + item.count, 0);

    const prepared = ordersByStatus
      .filter((item) => item._id !== null && item._id !== "pending")
      .map((item) => {
        const percentage = Math.round((item.count / total) * 100);
        return {
          ...item,
          fill: statusColors[item._id!] || "#9CA3AF",
          percentage: percentage,
        };
      });

    setChartData(prepared);
  }, [ordersByStatus]);

  // Translations
  const t = useTranslations();

  return (
    <Card>
      {/* Header of the card */}
      <CardHeader className="items-center pb-0">
        <CardTitle>{t("2nd-row.orders-status")}</CardTitle>
      </CardHeader>

      {/* Main content of the card (Chart) */}
      <CardContent>
        <ChartContainer config={{}} className="mx-auto aspect-square max-h-[250px]">
          {/* Pie Chart to visualize order status distribution */}
          <PieChart>
            {/* Tooltip displayed when hovering over a slice */}
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />

            <Pie
              data={chartData} // Data source
              dataKey="count" // Value used for pie size
              nameKey="_id" // Label for each slice
              innerRadius={40}
              outerRadius={80}
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, payload }) => {
                const RADIAN = Math.PI / 180;

                // Calculate the position for the label
                const radius = innerRadius + (outerRadius - innerRadius + 30) / 2;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                const circleRadius = 16;

                return (
                  <g>
                    {/* White background circle for better readability */}
                    <circle cx={x} cy={y} r={circleRadius} fill="#FAFAFA" />
                    <text
                      x={x}
                      y={y}
                      fill="black"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={10}
                      fontWeight="bold"
                    >
                      {`${payload.percentage} %`}
                    </text>
                  </g>
                );
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      {/* Footer: Displaying a legend showing label, color, and count */}
      <CardFooter className="flex-col gap-2 text-sm">
        {chartData.map((item: OrdersByStatu & { fill: string; percentage: number }) => {
          return (
            <>
              {item._id !== null && (
                <div className="flex justify-between w-full">
                  {/* Label with dot color */}
                  <p className="flex items-center gap-1 text-xs font-semibold">
                    <span
                      style={{ backgroundColor: item.fill }}
                      className="inline-block w-2 h-2 rounded-full"
                    ></span>
                    {item._id}
                  </p>

                  {/* Count and percentage */}
                  <p className="flex items-center gap-1 text-xs font-bold">
                    {item.count} <span>({item.percentage}%)</span>
                  </p>
                </div>
              )}
            </>
          );
        })}
      </CardFooter>
    </Card>
  );
}
