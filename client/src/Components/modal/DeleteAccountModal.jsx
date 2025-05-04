import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toastSuccess, toastError } from "../../lib/Toast";
import { useNavigate } from "react-router-dom";

function DeleteAccountModal() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/users/delete`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toastSuccess("החשבון שלך נמחק בהצלחה");
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      toastError(
        error?.response?.data?.message || "❌ לא ניתן היה למחוק את החשבון"
      );
    }
  };

  return (
    <>
      <button className="sidebar-item delete" onClick={() => setShow(true)}>
        <i className="fas fa-trash-alt"></i> Delete Account
      </button>

      {show && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-box">
              <h3>מחיקת חשבון</h3>
              <p>האם אתה בטוח? פעולה זו אינה הפיכה.</p>
              <div className="modal-buttons">
                <button className="cancel-btn" onClick={() => setShow(false)}>
                  ביטול
                </button>
                <button className="confirm-btn" onClick={handleDelete}>
                  מחק
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteAccountModal;
