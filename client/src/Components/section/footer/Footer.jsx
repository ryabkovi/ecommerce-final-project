import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTelegram, FaTiktok } from "react-icons/fa";
import appStore from "../../../assets/app-store.png";
import googlePlay from "../../../assets/google-play.png";
import qrCode from "../../../assets/qr-code.png";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="newsletter">
        <h2>Stay Connected with Us</h2>
        <p>Subscribe for exclusive deals, discounts, and the latest updates!</p>
        <div className="newsletter-input">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="footer-content">
        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FaTiktok />
            <FaInstagram />
            <FaFacebookF />
            <FaTelegram />
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <NavLink to="/about" className="footer-link">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="footer-link">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacy-policy" className="footer-link">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms" className="footer-link">
                Terms & Conditions
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Help & Support */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>
              <NavLink to="/faqs" className="footer-link">
                FAQs
              </NavLink>
            </li>
            <li>
              <NavLink to="/order-tracking" className="footer-link">
                Order Tracking
              </NavLink>
            </li>
            <li>
              <NavLink to="/return-policy" className="footer-link">
                Return Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/customer-support" className="footer-link">
                Customer Support
              </NavLink>
            </li>
          </ul>
        </div>

        {/* App Download */}
        <div className="footer-section">
          <h3>Download Our App</h3>
          <div className="app-download">
            <img src={appStore} alt="App Store" />
            <img src={googlePlay} alt="Google Play" />
            <img src={qrCode} alt="QR Code" className="qr-code" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;
