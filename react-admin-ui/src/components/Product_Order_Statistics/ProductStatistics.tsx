import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Product_Order_Statistics.scss";
ChartJS.register(ArcElement, Tooltip, Legend);

const ProductStatistics = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("2025"); // Default year
  const [numYears, setNumYears] = useState("1"); // Default number of years

  useEffect(() => {
    const fetchGenderSales = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/gender_percentage?period=${period}`
        );
        console.log("API Response:", response.data);

        const data = response.data;

        // Validate data
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Dữ liệu từ API không hợp lệ hoặc rỗng");
        }

        const labels = data.map((item) => item.gender);
        const values = data.map((item) => item.percentage);
        const backgroundColors = [
          "#FF6384", // Men
          "#36A2EB", // Women
          "#FFCE56", // Unisex
          "#8BC34A", // Kids
        ];

        setChartData({
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: backgroundColors,
              borderWidth: 1,
              hoverOffset: 10, // Slight hover effect for better UX
            },
          ],
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giới tính:", error.message);
        setError("Không thể tải dữ liệu thống kê. Vui lòng thử lại sau.");
        setChartData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGenderSales();
  }, [period, numYears]); // Re-fetch when period or numYears changes

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handleNumYearsChange = (e) => {
    setNumYears(e.target.value);
  };

  // Generate year options (e.g., 2020 to 2025)
  const yearOptions = Array.from({ length: 6 }, (_, i) => 2025 - i);

  // Generate number of years options (e.g., 1 to 5)
  const numYearsOptions = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="product">
      <div className="product-statistics-container">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Thống kê tỉ lệ doanh thu của sản phẩm
        </h2>
        <div className="selector-group">
          <div className="period-selector">
            <label htmlFor="period-input" className="period-label">
              Chọn năm bắt đầu:
            </label>
            <select
              id="period-input"
              value={period}
              onChange={handlePeriodChange}
              className="period-input"
            >
              <option value="all">Tất cả</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading && (
          <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {chartData && !loading && !error && (
          <div
            className="chart-container"
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            <Pie
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      font: { size: 14 },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const label = context.label || "";
                        const value = context.raw || 0;
                        return `${label}: ${value}%`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductStatistics;
