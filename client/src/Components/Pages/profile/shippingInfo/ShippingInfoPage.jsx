import React, { useState, useEffect, useContext } from "react";
import "./ShippingInfoPage.css";
import { AuthContext } from "../../../../context/AuthContext";
import { NavLink } from "react-router-dom";
import axios from "axios";
import DeleteAccountModal from "../../../modal/DeleteAccountModal";

function ShippingInfoPage() {
  const { user, setUser, getAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    floor: "",
    zipCode: "",
    apartment: "",
  });

  const [searchCountry, setSearchCountry] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.shipment_address) {
      setFormData({
        country: user.shipment_address.country || "",
        city: user.shipment_address.city || "",
        street: user.shipment_address.street || "",
        building: user.shipment_address.building || "",
        floor: user.shipment_address.floor || "",
        zipCode: user.shipment_address.zipCode || "",
        apartment: user.shipment_address.apartment || "",
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        shipment_address: formData,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/update-profile/${user._id}`,
        payload,
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("✅ Shipping info updated successfully!");
        setUser(response.data.user);
        await getAuth();
      }
    } catch (error) {
      console.error("❌ Failed to update shipping info:", error);
      alert("❌ Failed to update shipping info");
    }
  };

  const searchCountryInput = (e) => {
    const value = e.target.value;
    setSearchCountry(value);
    setFormData((prev) => ({ ...prev, country: value }));
  };

  const { country, city, street, building, floor, apartment, zipCode } =
    formData;

  if (loading) {
    return (
      <div className="content">
        <h2>Loading shipping info...</h2>
      </div>
    );
  }

  return (
    <div className="shipping-info-page">
      {/* Sidebar */}
      <div className="sidebar">
        <NavLink to="/account" className="sidebar-item">
          <i className="fas fa-user"></i> Personal Info
        </NavLink>
        <NavLink to="/payment-method" className="sidebar-item">
          <i className="fas fa-credit-card"></i> Payment Methods
        </NavLink>
        <NavLink to="/my-order" className="sidebar-item">
          <i className="fas fa-box"></i> My Orders
        </NavLink>
        <NavLink to="/shipping-info" className="sidebar-item active">
          <i className="fas fa-truck"></i> Shipping Info
        </NavLink>
        <NavLink to="/my-favorite" className="sidebar-item">
          <i className="fas fa-star"></i> Favorites
        </NavLink>
        <DeleteAccountModal />
      </div>

      {/* Content */}
      <div className="content">
        <h2>Shipping Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="country"
              value={country}
              onChange={searchCountryInput}
              placeholder="Country"
              required
            />
            <input
              type="text"
              name="city"
              value={city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="street"
              value={street}
              onChange={handleChange}
              placeholder="Street"
              required
            />
            <input
              type="text"
              name="building"
              value={building}
              onChange={handleChange}
              placeholder="Building Number"
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="floor"
              value={floor}
              onChange={handleChange}
              placeholder="Floor"
              required
            />
            <input
              type="text"
              name="apartment"
              value={apartment}
              onChange={handleChange}
              placeholder="Apartment"
            />
            <input
              type="text"
              name="zipCode"
              value={zipCode}
              onChange={handleChange}
              placeholder="ZIP Code"
            />
          </div>
          <button type="submit" className="save-btn blue">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default ShippingInfoPage;
