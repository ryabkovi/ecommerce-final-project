import React, { useEffect, useState } from "react";
import Sidebar from "../../section/navigation/Sidebar";
import { FaBars } from "react-icons/fa";
import DropdownButton from "../../../lib/DropdownButton";
import FeedbackTable from "../../table/feedback/FeedbackTable";
import FeedbackModal from "../../modal/feedback/FeedbackModal";
import axios from "axios";
import "../../../styles/AdminStyles.css";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const fetchFeedback = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/feedback/all`,
        {
          withCredentials: true,
        }
      );
      setFeedbacks(data.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentFeedbacks = sortedFeedbacks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleRespond = (feedback) => {
    setSelectedFeedback(feedback);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".dropdown-toggle")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const handleDeleteFeedback = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/feedback/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      setFeedbacks(feedbacks.filter((fb) => fb._id !== id));
    } catch (err) {
      console.error("Failed to delete feedback:", err);
    }
  };

  return (
    <div className="feedback">
      <Sidebar />
      <div className="main">
        <header className="topbar">
          <h1>Feedback</h1>
          <div className="dropdown-toggle">
            <button className="hamburger" onClick={toggleDropdown}>
              <FaBars />
            </button>
            {dropdownOpen && <DropdownButton />}
          </div>
        </header>

        <h3 className="user-feedback">📬 User Feedback</h3>
        <FeedbackTable
          feedbacks={currentFeedbacks}
          onSort={onSort}
          sortConfig={sortConfig}
          onRespond={handleRespond}
          onDelete={handleDeleteFeedback}
        />
        <div className="pagination-buttons">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`btn-filter ${currentPage === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {selectedFeedback && (
          <FeedbackModal
            feedback={selectedFeedback}
            onClose={() => setSelectedFeedback(null)}
            onResponseSent={() => {
              setSelectedFeedback(null);
              fetchFeedback();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Feedback;
