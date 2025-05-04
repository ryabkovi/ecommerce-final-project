import React, { useContext, useEffect, useState } from "react";
import "../../../styles/AdminStyles.css";
import Sidebar from "../../section/navigation/Sidebar";
import { FaBars } from "react-icons/fa";
import DropdownButton from "../../../lib/DropdownButton";
import { AuthContext } from "../../../contexts/AuthContext";
import useUserState from "../../hooks/useUserState";
import useSalesState from "../../hooks/useSalesState";
import axios from "axios";

// Import charts
import BarChartComponent from "../../charts/BarChartComponent";
import DoughnutChartComponent from "../../charts/DoughnutChart";
import LineChartComponent from "../../charts/LineChart";
import AreaChartComponent from "../../charts/AreaChart";

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, loading, isAuth } = useContext(AuthContext);
  const newUsers = useUserState();
  const totalSales = useSalesState();
  const [feedbackCount, setFeedbackCount] = useState(0);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const fetchFeedbackCount = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/feedback/count`,
          {
            withCredentials: true,
          }
        );
        setFeedbackCount(data.count || 0);
      } catch (error) {
        console.error("Error fetching feedback count:", error);
      }
    };
    if (!loading && isAuth) fetchFeedbackCount();
  }, [loading, isAuth]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".dropdown-toggle")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  if (loading || !isAuth)
    return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <header className="topbar">
          <h1>Dashboard</h1>
          <div className="user-info">
            <span>👤 {user?.manager_name || "Manager"}</span>
          </div>
          <div className="dropdown-toggle">
            <button className="hamburger" onClick={toggleDropdown}>
              <FaBars />
            </button>
            {dropdownOpen && <DropdownButton />}
          </div>
        </header>

        <section className="content">
          <div className="card">
            <h3>📈 Total Sales</h3>
            <p>${totalSales}</p>
          </div>
          <div className="card">
            <h3>👥 New Users</h3>
            <p>{newUsers}</p>
          </div>
          <div className="card">
            <h3>💬 Feedback</h3>
            <p>{feedbackCount} messages</p>
          </div>
        </section>

        <section className="charts-grid">
          <div className="chart-box">
            <BarChartComponent />
          </div>
          <div className="chart-box">
            <DoughnutChartComponent />
          </div>
          <div className="chart-box">
            <LineChartComponent />
          </div>
          <div className="chart-box">
            <AreaChartComponent />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
