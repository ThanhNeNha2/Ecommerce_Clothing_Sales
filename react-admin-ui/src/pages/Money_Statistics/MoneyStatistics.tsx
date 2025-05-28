import DailyRevenue from "../../components/MoneyStatistics/DailyRevenue";
import MonthlyRevenue from "../../components/MoneyStatistics/MonthlyRevenue";

const MoneyStatistics = () => {
  return (
    <div>
      <MonthlyRevenue />
      <DailyRevenue />
    </div>
  );
};

export default MoneyStatistics;
