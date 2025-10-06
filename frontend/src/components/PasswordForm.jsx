import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function PasswordForm({ onSaved, editing }) {
  const [form, setForm] = useState({ title: "", url: "", username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing && editing.id) {
        await API.put(`/passwords/${editing.id}`, form);
      } else {
        await API.post("/passwords", form);
      }
      setForm({ title: "", url: "", username: "", password: "" });
      onSaved();
    } catch (err) {
      alert(err.response?.data?.msg || "Error saving password");
    } finally {
      setSaving(false);
    }
  };

  const copyPassword = () => {
    if (!form.password) return;
    navigator.clipboard.writeText(form.password);
    alert("Password copied!");
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h5 className="fw-bold mb-3">{editing ? "Edit Password" : "Add New Password"}</h5>

      <form onSubmit={submit}>
        {/* Title */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={form.title}
            required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Website URL */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Website URL"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>

        {/* Username */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="mb-3 input-group">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            value={form.password}
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={copyPassword}
          >
            <i className="bi bi-clipboard"></i>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn ${editing ? "btn-warning" : "btn-success"} w-100`}
          disabled={saving}
        >
          {saving ? "Saving..." : editing ? "Update Password" : "Save Password"}
        </button>
      </form>
    </div>
  );
}
