import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/feedback/send",
        formData,
        { withCredentials: true }
      );
      if (data.success) {
        setSubmitted(true);
        setError("");
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (err) {
      console.error("Feedback error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="contact-container">
      <h1>Get in Touch</h1>
      <p>
        We’d love to hear from you! Fill out the form below or reach us through
        our details.
      </p>

      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form">
          {submitted ? (
            <div className="success-message">
              <h3>✅ Thank you! Your message has been sent.</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              {error && <p className="error-message">❌ {error}</p>}
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h3>Our Contact Details</h3>
          <p>
            <FaMapMarkerAlt /> 123 Main Street, City, Country
          </p>
          <p>
            <FaPhone /> +1 (555) 123-4567
          </p>
          <p>
            <FaEnvelope /> contact@example.com
          </p>
          <h3>Follow Us</h3>
          <div className="social-icons justify-content-center">
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="map-container">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387144.00758380144!2d-74.25986545578787!3d40.69767006406756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c250b1b0892d65%3A0x8e4e3ccfce5b1b1e!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1645244544651!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
