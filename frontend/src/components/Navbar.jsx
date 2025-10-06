import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const [expanded, setExpanded] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
    setExpanded(false);
  };

  const isActive = (path) =>
    location.pathname === path ? "active fw-bold" : "";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold fs-4 d-flex align-items-center"
          to="/"
          onClick={() => setExpanded(false)}
        >
          <i className="bi bi-shield-lock-fill me-2"></i>PassVault
        </Link>

        {/* Toggler for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarContent"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div
          className={`collapse navbar-collapse ${expanded ? "show" : ""}`}
          id="navbarContent"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/")}`}
                to="/"
                onClick={() => setExpanded(false)}
              >
                <i className="bi bi-house-door-fill me-1"></i> Home
              </Link>
            </li>

            {!token ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/login")}`}
                    to="/login"
                    onClick={() => setExpanded(false)}
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/register")}`}
                    to="/register"
                    onClick={() => setExpanded(false)}
                  >
                    <i className="bi bi-pencil-square me-1"></i> Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/dashboard")}`}
                    to="/dashboard"
                    onClick={() => setExpanded(false)}
                  >
                    <i className="bi bi-speedometer2 me-1"></i> Dashboard
                  </Link>
                </li>

                <li className="nav-item d-flex align-items-center text-white fw-semibold ms-2">
                  <i className="bi bi-person-circle me-1"></i>
                  <span className="text-capitalize">{name || "User"}</span>
                </li>

                <li className="nav-item ms-2">
                  <button
                    className="btn btn-sm btn-outline-light d-flex align-items-center gap-1"
                    onClick={logout}
                  >
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Hover effects */}
      <style>{`
        .navbar-nav .nav-link:hover {
          color: #ffc107 !important;
          transition: 0.3s;
        }
        .btn-outline-light:hover {
          background-color: #ffc107;
          border-color: #ffc107;
          color: #000;
          transition: 0.3s;
        }
      `}</style>
    </nav>
  );
}
