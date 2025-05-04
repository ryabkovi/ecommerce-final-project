import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AuthContext } from "../../contexts/AuthContext";

function OrdersSummaryChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loading: authLoading, isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (authLoading || !isAuth) return;

    const fetchSummary = async () => {
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
          setData(json.data);
        } else {
          throw new Error(json.message);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch summary");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [authLoading, isAuth]);

  if (loading) return <div className="card">Loading chart...</div>;
  if (error) return <div className="card">Error: {error}</div>;

  return (
    <div className="card">
      <h3>📦 Monthly Orders & Income</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orderCount" fill="#10b981" name="Orders" />
          <Bar dataKey="totalIncome" fill="#2563eb" name="Income ($)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrdersSummaryChart;
