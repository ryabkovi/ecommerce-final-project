import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Page404.css";

function UnderConstruction() {
  return (
    <section className="page404">
      <div className="page404__container">
        <h1 className="page404__title">🚧</h1>
        <h2 className="page404__subtitle">Page Under Construction</h2>
        <p className="page404__message">
          We're working hard to bring this page to life. Please check back
          later!
        </p>
        <NavLink to="/dashboard" className="page404__button">
          ⬅ Back to Dashboard
        </NavLink>
      </div>
    </section>
  );
}

export default UnderConstruction;
