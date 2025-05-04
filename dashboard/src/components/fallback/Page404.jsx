import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Page404.css";

function Page404() {
  return (
    <section className="page404">
      <div className="page404__container">
        <h1 className="page404__title">404</h1>
        <h2 className="page404__subtitle">Oops! Page not found.</h2>
        <p className="page404__message">
          Sorry, we couldn't find the page you're looking for. It might have
          been removed or never existed.
        </p>
        <NavLink to="/dashboard" className="page404__button">
          ⬅ Back to Dashboard
        </NavLink>
      </div>
    </section>
  );
}

export default Page404;
