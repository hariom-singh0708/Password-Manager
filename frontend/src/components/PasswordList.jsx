import React, { useState } from "react";

export default function PasswordList({ list, onEdit, onDelete }) {
  const [filter, setFilter] = useState("");

  const copyPassword = (password) => {
    navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  // Simple password strength function
  const getPasswordStrength = (password) => {
    if (!password) return "Unknown";
    if (password.length >= 12) return "Strong";
    if (password.length >= 8) return "Medium";
    return "Weak";
  };

  const strengthColor = (strength) => {
    switch (strength) {
      case "Strong":
        return "bg-success";
      case "Medium":
        return "bg-warning text-dark";
      case "Weak":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  // Filtered list
  const filteredList = list.filter(
    (item) =>
      item.title.toLowerCase().includes(filter.toLowerCase()) ||
      item.username.toLowerCase().includes(filter.toLowerCase()) ||
      item.url.toLowerCase().includes(filter.toLowerCase())
  );

  // Metrics
  const total = list.length;
  const strongCount = list.filter((p) => getPasswordStrength(p.password) === "Strong").length;
  const weakCount = list.filter((p) => getPasswordStrength(p.password) === "Weak").length;
  const mediumCount = list.filter((p) => getPasswordStrength(p.password) === "Medium").length;

  return (
    <div>
      <h5 className="fw-bold mb-3">Saved Passwords</h5>

      {/* Top Row: Filter + Metrics */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <input
          type="text"
          className="form-control w-auto flex-grow-1"
          placeholder="Filter by title, username, or URL..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="d-flex gap-2 flex-wrap">
          <span className="badge bg-primary">Total: {total}</span>
          <span className="badge bg-success">Strong: {strongCount}</span>
          <span className="badge bg-warning text-dark">Medium: {mediumCount}</span>
          <span className="badge bg-danger">Weak: {weakCount}</span>
        </div>
      </div>

      {/* Password Cards */}
      {filteredList.length === 0 ? (
        <div className="text-center text-muted py-4">
          <i className="bi bi-inbox fs-1 mb-2"></i>
          <p>No passwords found.</p>
        </div>
      ) : (
        <div className="row g-3">
          {filteredList.map((item) => {
            const strength = getPasswordStrength(item.password);
            return (
              <div key={item.id} className="col-12 col-md-6">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="card-title fw-bold mb-1">{item.title}</h6>
                    <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
                      {item.url}
                    </p>
                    <p className="mb-1" style={{ fontSize: "0.85rem" }}>
                      <strong>User:</strong> {item.username}
                    </p>
                    <p className="mb-2" style={{ fontSize: "0.85rem" }}>
                      <strong>Password:</strong> <code>{item.password}</code>
                    </p>

                    {/* Per-Password Strength Badge */}
                    <div className="mb-3">
                      <span className={`badge ${strengthColor(strength)}`}>
                        {strength} Password
                      </span>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary flex-grow-1"
                        onClick={() => onEdit(item)}
                      >
                        <i className="bi bi-pencil-fill me-1"></i>Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger flex-grow-1"
                        onClick={() => onDelete(item)}
                      >
                        <i className="bi bi-trash-fill me-1"></i>Delete
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary flex-grow-1"
                        onClick={() => copyPassword(item.password)}
                      >
                        <i className="bi bi-clipboard-fill me-1"></i>Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
