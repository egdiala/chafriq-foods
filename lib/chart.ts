import { format, getYear } from "date-fns";

export const buildChartData = (orderTrend: ReportsStatisticsResponse['order_trend']) => {
  // Map API data for quick lookup
  const map = new Map(
    orderTrend.map((item) => [item.month, item.total_count])
  );

  const year = (orderTrend[0]?.month as unknown as string)?.split("-")[0] ?? new Date().getFullYear();

  return Array.from({ length: 12 }, (_, i) => {
    const monthIndex = i + 1;

    const key = `${year}-${String(monthIndex).padStart(2, "0")}`;

    return {
      month: format(new Date(Number(year), i), "MMMM"),
      total_count: map.get(key) ?? 0,
    };
  });
};

export const buildEarningsData = (orderTrend: ReportsStatisticsResponse['earnings_trend']) => {
  // Map API data for quick lookup
  const map = new Map(
    orderTrend.map((item) => [item.month, item.total_earnings])
  );

  const year = (orderTrend[0]?.month as unknown as string)?.split("-")[0] ?? new Date().getFullYear();

  return Array.from({ length: 12 }, (_, i) => {
    const monthIndex = i + 1;

    const key = `${year}-${String(monthIndex).padStart(2, "0")}`;

    return {
      month: format(new Date(Number(year), i), "MMMM"),
      total_count: map.get(key) ?? 0,
    };
  });
};

export const buildRatingsData = (orderTrend: ReportsStatisticsResponse['rating_trend']) => {
  // Map API data for quick lookup
  const map = new Map(
    orderTrend.map((item) => [item.month, item.avg_rating])
  );

  const year = (orderTrend[0]?.month as unknown as string)?.split("-")[0] ?? new Date().getFullYear();

  return Array.from({ length: 12 }, (_, i) => {
    const monthIndex = i + 1;

    const key = `${year}-${String(monthIndex).padStart(2, "0")}`;

    return {
      month: format(new Date(Number(year), i), "MMMM"),
      total_count: map.get(key) ?? 0,
    };
  });
};

export const generateYears = (startYear = 2020) => {
  const currentYear = getYear(new Date());

  return Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i
  );
};