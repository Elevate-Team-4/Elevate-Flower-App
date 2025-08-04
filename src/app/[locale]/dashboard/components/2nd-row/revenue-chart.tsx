"use client";

import { useTranslations } from "next-intl";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MonthlyRevenue } from "@/lib/types/statistics";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#A6252A",
  },
} satisfies ChartConfig;

export function RevenueChart({ monthlyRevenue }: { monthlyRevenue: MonthlyRevenue[] }) {
  const chartData = monthlyRevenue.map((item) => {
    const monthName = new Date(item._id + "-01").toLocaleString("en-US", {
      month: "short",
    });

    return {
      month: monthName,
      revenue: item.revenue, // ✅ Convert to millions
      count: item.count,
    };
  });

  // Translations
  const t = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>{t("2nd-row.revenue")}</span>
            <CardDescription className="text-muted-foreground">
              <span className="text-maroon-600">{t("2nd-row.months")}</span>{" "}
              {t("last-2nd-row.week")}
            </CardDescription>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
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
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              dataKey="revenue"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, "auto"]}
            />

            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Area dataKey="revenue" type="natural" fill="url(#gradient-revenue)" stroke="#A6252A" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
