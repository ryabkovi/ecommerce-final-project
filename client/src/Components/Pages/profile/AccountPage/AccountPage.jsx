import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import { formatDate } from "../../../../lib/Date";
import { NavLink } from "react-router-dom";
import "../../../../styles/UserDashboard.css";
import { toastSuccess, toastError } from "../../../../lib/Toast";
import DeleteAccountModal from "../../../modal/DeleteAccountModal";

function AccountPage() {
  const { user, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    user_firstName: "",
    user_lastName: "",
    user_phone: "",
    user_email: "",
    user_birthDate: "",
    gender: "Other",
    user_password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        user_firstName: user.user_firstName || "",
        user_lastName: user.user_lastName || "",
        user_phone: user.user_phone || "",
        user_email: user.user_email || "",
        user_birthDate: user.user_birthDate
          ? formatDate(user.user_birthDate, "yyyy-MM-dd")
          : "",
        gender: user.gender || "Other",
        user_password: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPageLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user_password, newPassword, confirmPassword, ...rest } = formData;
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/update-profile/${user._id}`,
        rest,
        { withCredentials: true }
      );
      if (response.data.success) {
        toastSuccess("Profile updated successfully!");
        setUser(response.data.user);
      }
    } catch (error) {
      toastError(`Failed to update profile: ${error.response?.data?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    console.log("Password formData:", {
      user_password: formData.user_password,
      new_password: formData.newPassword,
      confirm_password: formData.confirmPassword,
    });

    if (
      !formData.user_password ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toastError("All password fields are required.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toastError("Passwords do not match.");
      return;
    }

    if (formData.newPassword.length < 8) {
      toastError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/change-password/${
          user._id
        }`,
        {
          user_password: formData.user_password,
          new_password: formData.newPassword,
          confirm_password: formData.confirmPassword,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toastSuccess("Password updated successfully!");
        setFormData((prev) => ({
          ...prev,
          user_password: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }
    } catch (error) {
      console.error("Password update error:", error.response?.data);
      toastError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to update password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="content">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div className="account-page">
      {/* Sidebar */}
      <div className="sidebar">
        <NavLink to="/account" className="sidebar-item active">
          <i className="fas fa-user"></i> Personal Info
        </NavLink>
        <NavLink to="/payment-method" className="sidebar-item">
          <i className="fas fa-credit-card"></i> Payment Methods
        </NavLink>
        <NavLink to="/my-order" className="sidebar-item">
          <i className="fas fa-box"></i> My Orders
        </NavLink>
        <NavLink to="/shipping-info" className="sidebar-item">
          <i className="fas fa-truck"></i> Shipping Info
        </NavLink>
        <NavLink to="/my-favorite" className="sidebar-item">
          <i className="fas fa-star"></i> Favorites
        </NavLink>
        <DeleteAccountModal />
      </div>

      {/* Content */}
      <div className="content">
        <h2>Personal Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="user_firstName"
              value={formData.user_firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="user_lastName"
              value={formData.user_lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="tel"
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="date"
              name="user_birthDate"
              value={formData.user_birthDate}
              onChange={handleChange}
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" className="save-btn blue" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* Change Password Section */}
        {user?.SignUpProvider !== "Google" && (
          <>
            <h2>Change Password</h2>
            <div className="password-container">
              <div className="password-inputs">
                <input
                  type="password"
                  name="user_password"
                  placeholder="Current Password"
                  value={formData.user_password}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="password-instructions">
                <h4>Password Instructions:</h4>
                <ul>
                  <li>At least 8 characters</li>
                  <li>Includes a number and special character</li>
                  <li>Not same as previous password</li>
                </ul>
              </div>
            </div>

            <button
              onClick={handlePasswordChange}
              className="save-btn yellow"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </>
        )}

        {/* Google SignUp Message */}
        {user?.SignUpProvider === "Google" && (
          <div className="no-password-card">
            <h3>Create Your Password</h3>
            <p>
              It looks like you signed up with Google. To set a password, please
              log out and use the <strong>"Forgot Password"</strong> option on
              the login page.
            </p>
            <p>This will allow you to login without Google in the future.</p>
            <NavLink to="/reset-password" style={{ textDecoration: "none" }}>
              <button className="save-btn yellow" style={{ margin: "auto" }}>
                Reset Password
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountPage;
