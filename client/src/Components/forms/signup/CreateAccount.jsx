import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "./CreateAccount.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const schema = yup.object().shape({
  user_firstName: yup.string().required("First name is required"),
  user_lastName: yup.string().required("Last name is required"),
  user_phone: yup.string().required("Phone number is required"),
  user_birthDate: yup.string().required("Birth date is required"),
  user_email: yup.string().email("Invalid email").required("Email is required"),
  user_password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("user_password"), null], "Passwords must match")
    .required("Confirm password is required"),
  shipment_address: yup.object().shape({
    street: yup.string().required("Street is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
    zipCode: yup.string().required("ZIP code is required"),
  }),
  terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

function CreateAccountPage() {
  const navigate = useNavigate();
  const { getAuth } = useContext(AuthContext);
  const [passwordStrength, setPasswordStrength] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        user_firstName: data.user_firstName,
        user_lastName: data.user_lastName,
        user_phone: data.user_phone,
        user_birthDate: data.user_birthDate,
        user_email: data.user_email,
        user_password: data.user_password,
        shipment_address: {
          country: data.shipment_address.country,
          city: data.shipment_address.city,
          street: data.shipment_address.street,
          zipCode: data.shipment_address.zipCode,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/register`,
        payload,
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("✅ Account created successfully!");
        await getAuth();
        navigate("/");
      }
    } catch (error) {
      alert(
        `❌ Error: ${error.response?.data?.message || "Something went wrong"}`
      );
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setValue("user_password", value);
    if (value.length < 6) {
      setPasswordStrength("Weak");
    } else if (value.match(/[0-9]/) && value.match(/[A-Z]/)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  };

  return (
    <form
      className="create-account-container"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-wrapper">
        <div className="left-column">
          <div className="section">
            <h3>User Details</h3>

            <div className="input-group">
              <span className="icon">👤</span>
              <input {...register("user_firstName")} placeholder="First Name" />
            </div>
            <p className="error-message">{errors.user_firstName?.message}</p>

            <div className="input-group">
              <span className="icon">👤</span>
              <input {...register("user_lastName")} placeholder="Last Name" />
            </div>
            <p className="error-message">{errors.user_lastName?.message}</p>

            <div className="input-group">
              <span className="icon">📱</span>
              <input {...register("user_phone")} placeholder="Phone Number" />
            </div>
            <p className="error-message">{errors.user_phone?.message}</p>

            <div className="input-group">
              <span className="icon">🎂</span>
              <input
                type="date"
                {...register("user_birthDate")}
                placeholder="Birth Date"
              />
            </div>
            <p className="error-message">{errors.user_birthDate?.message}</p>

            <div className="input-group">
              <span className="icon">📧</span>
              <input {...register("user_email")} placeholder="Email" />
            </div>
            <p className="error-message">{errors.user_email?.message}</p>

            <div className="input-group">
              <span className="icon">🔒</span>
              <input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </div>
            <p className="password-strength">{passwordStrength}</p>
            <p className="error-message">{errors.user_password?.message}</p>

            <div className="input-group">
              <span className="icon">✅</span>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
              />
            </div>
            <p className="error-message">{errors.confirmPassword?.message}</p>
          </div>
        </div>

        <div className="right-column">
          <div className="section">
            <h3>Shipping Address</h3>

            <div className="input-group">
              <span className="icon">🏠</span>
              <input
                {...register("shipment_address.street")}
                placeholder="Street"
              />
            </div>
            <p className="error-message">
              {errors.shipment_address?.street?.message}
            </p>

            <div className="input-group">
              <span className="icon">🏙️</span>
              <input
                {...register("shipment_address.city")}
                placeholder="City"
              />
            </div>
            <p className="error-message">
              {errors.shipment_address?.city?.message}
            </p>

            <div className="input-group">
              <span className="icon">🌍</span>
              <input
                {...register("shipment_address.country")}
                placeholder="Country"
              />
            </div>
            <p className="error-message">
              {errors.shipment_address?.country?.message}
            </p>

            <div className="input-group">
              <span className="icon">📮</span>
              <input
                {...register("shipment_address.zipCode")}
                placeholder="ZIP Code"
              />
            </div>
            <p className="error-message">
              {errors.shipment_address?.zipCode?.message}
            </p>
          </div>

          <div className="terms-container">
            <input type="checkbox" {...register("terms")} />
            <label>
              I agree to the{" "}
              <span className="terms-link">Terms and Conditions</span>
            </label>
            <p className="error-message">{errors.terms?.message}</p>
          </div>

          <div className="submit-btn-container">
            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateAccountPage;
