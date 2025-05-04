import React, { useContext, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { AuthContext } from "../../contexts/AuthContext";

function BarChartComponent() {
  const [data, setData] = useState([]);
  const [loadingChart, setLoadingChart] = useState(true);
  const [error, setError] = useState(null);
  const { loading, isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (loading || !isAuth) return;

    const fetchIncomeData = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/orders/analytics/orders-summary",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const json = await res.json();
        if (json.success) {
          const formatted = json.data.map((item) => ({
            name: item.month,
            income: item.totalIncome,
          }));
          setData(formatted);
        } else {
          throw new Error(json.message);
        }
      } catch (err) {
        setError(err.message || "Failed to load chart");
      } finally {
        setLoadingChart(false);
      }
    };

    fetchIncomeData();
  }, [loading, isAuth]);

  if (loadingChart) return <div className="card">Loading chart...</div>;
  if (error) return <div className="card">Error: {error}</div>;

  return (
    <div className="card">
      <h3>📊 Monthly Income</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponent;
