import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./MoneyStatistics.scss"; // Reusing the same SCSS for consistent styling

const DailyRevenue = () => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDailyRevenue = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/api/day-revenue?year=${year}&month=${month}`
        );
        // Transform API data to match chart format
        const formattedData = res.data.map((item: any) => ({
          date: item.date.split("-")[2], // Extract day from date (e.g., "01" from "2025-01-01")
          revenue: item.totalRevenue,
          orderCount: item.orderCount,
        }));
        setData(formattedData);
      } catch (error: any) {
        console.error(
          "Lỗi khi tải dữ liệu doanh thu theo ngày:",
          error.message
        );
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyRevenue();
  }, [year, month]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(e.target.value));
  };

  // Generate month options (1 to 12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="money-statistics-container">
      <div className="header-section">
        <h2 className="chart-title">
          Biểu đồ doanh thu theo ngày trong tháng {month}/{year}
        </h2>

        <div className="selector-group">
          <div className="year-selector">
            <label htmlFor="year-input" className="year-label">
              Chọn năm:
            </label>
            <select
              id="year-input"
              value={year}
              onChange={handleYearChange}
              className="year-input"
            >
              {Array.from({ length: 10 }, (_, i) => 2020 + i).map(
                (yearOption) => (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="month-selector">
            <label htmlFor="month-input" className="month-label">
              Chọn tháng:
            </label>
            <select
              id="month-input"
              value={month}
              onChange={handleMonthChange}
              className="month-input"
            >
              {months.map((monthOption) => (
                <option key={monthOption} value={monthOption}>
                  Tháng {monthOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading && <div className="loading">Đang tải dữ liệu...</div>}

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              label={{ value: "", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              label={{
                value: "Doanh thu (VND)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              formatter={(value: any, name) => [
                name === "revenue"
                  ? new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(value)
                  : value,
                name === "revenue" ? "Doanh thu" : "Số đơn hàng",
              ]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              strokeWidth={2}
              className="hihi"
              activeDot={{ r: 6 }}
              name="Doanh thu"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyRevenue;
