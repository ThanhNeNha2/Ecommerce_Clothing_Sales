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
import "./MoneyStatistics.scss";

const MoneyStatistics = () => {
  const [year, setYear] = useState(2025);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRevenue = async () => {
      setLoading(true);
      try {
        const months = Array.from({ length: 12 }, (_, i) => i + 1);
        const revenueData = await Promise.all(
          months.map(async (month) => {
            try {
              const res = await axios.get(
                `http://localhost:8080/api/monthly-revenue?year=${year}&month=${month}`
              );
              return {
                month: `Th ${month}`,
                revenue: res.data.totalRevenue,
              };
            } catch (error) {
              console.error(`Lỗi lấy doanh thu tháng ${month}:`, error.message);
              return { month: `Th ${month}`, revenue: 0 };
            }
          })
        );
        setData(revenueData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, [year]);

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  return (
    <div className="money-statistics-container">
      <div className="header-section">
        <h2 className="chart-title">
          Biểu đồ doanh thu theo từng tháng trong năm {year}
        </h2>

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
      </div>

      {loading && <div className="loading">Đang tải dữ liệu...</div>}

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => [
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(value),
                "Doanh thu",
              ]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 6 }}
              name="Doanh thu"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoneyStatistics;
