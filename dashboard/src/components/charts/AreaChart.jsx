import React, { useEffect, useState, useContext } from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../contexts/AuthContext";

function AreaChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loading: authLoading, isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (authLoading || !isAuth) return;

    const fetchWeeklyOrders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/orders/analytics/weekly-orders`,
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
        setError(err.message || "Failed to fetch weekly orders");
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyOrders();
  }, [authLoading, isAuth]);

  if (loading) return <div className="card">Loading chart...</div>;
  if (error) return <div className="card">Error: {error}</div>;

  return (
    <div className="card">
      <h3>🛒 Weekly Orders</h3>
      <ResponsiveContainer width="100%" height={250}>
        <RechartsAreaChart data={data}>
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#f59e0b"
            fillOpacity={1}
            fill="url(#colorOrders)"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChart;
