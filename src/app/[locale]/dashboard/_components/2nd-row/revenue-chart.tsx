"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { DailyRevenue, MonthlyRevenue } from "@/lib/types/statistics";
import { cn } from "@/lib/utils";

// Chart color and label configuration
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#A6252A",
  },
} satisfies ChartConfig;

// Define allowed interval types
type IntervalType = "weekly" | "monthly";

export function RevenueChart({
  monthlyRevenue,
  dailyRevenue,
}: {
  monthlyRevenue: MonthlyRevenue[];
  dailyRevenue: DailyRevenue[];
}) {
  // Track selected interval (weekly or monthly)
  const [interval, setInterval] = useState<IntervalType>("weekly");

  // Handle interval switch (when user clicks the buttons)
  const handleChange = (value: IntervalType) => {
    setInterval(value);
  };

  // Prepare monthly chart data
  const chartData = monthlyRevenue.map((item) => {
    const monthName = new Date(item._id + "-01").toLocaleString("en-US", {
      month: "short",
    });

    return {
      month: monthName,
      revenue: item.revenue,
      count: item.count,
    };
  });

  // Prepare weekly chart data (grouped by week start date)
  const chartData2 = dailyRevenue.map((item: DailyRevenue) => {
    const date = new Date(item._id);

    // Calculate the start of the week (assuming Monday as the first day)
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust to get Monday
    const weekStart = new Date(date.setDate(diff));

    // Format week label as "DD Mon" (e.g., "05 Aug")
    const weekLabel = weekStart.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });

    return {
      w: weekLabel,
      revenue: item.revenue,
      count: item.count,
    };
  });

  // Translations hook for i18n
  const t = useTranslations();

  return (
    <Card className="shadow-none border-none h-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            {/* Chart title with localized label */}
            <span>{t("2nd-row.revenue")}</span>

            {/* Interval toggle buttons */}
            <CardDescription className="text-muted-foreground">
              <button
                onClick={() => handleChange("monthly")}
                className={cn(interval === "monthly" ? "text-maroon-600" : "")}
              >
                {t("2nd-row.months")}
              </button>
              <span> </span>
              <button
                onClick={() => handleChange("weekly")}
                className={cn(interval === "weekly" ? "text-maroon-600" : "")}
              >
                {t("last-2nd-row.week")}
              </button>
            </CardDescription>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Chart container with config */}
        <ChartContainer config={chartConfig}>
          {interval === "weekly" ? (
            // Render weekly chart
            <AreaChart
              accessibilityLayer
              data={chartData2}
              margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis dataKey="w" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis
                dataKey="revenue"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={["dataMax", "dataMax"]}
              />
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
              <Area
                dataKey="revenue"
                type="monotoneX"
                fill="url(#gradient-revenue)"
                stroke="#A6252A"
              />
            </AreaChart>
          ) : (
            // Render monthly chart
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              {/* Define gradient background for area */}
              <defs>
                <linearGradient id="gradient-revenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(166, 37, 42, 0.4)" />
                  <stop offset="95%" stopColor="rgba(166, 37, 42, 0)" />
                </linearGradient>
              </defs>

              <CartesianGrid horizontal={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)} // Shorten month names
              />
              <YAxis
                dataKey="revenue"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={["dataMax", "dataMax"]}
              />
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
              <Area
                dataKey="revenue"
                type="monotoneX"
                fill="url(#gradient-revenue)"
                stroke="#A6252A"
              />
            </AreaChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
