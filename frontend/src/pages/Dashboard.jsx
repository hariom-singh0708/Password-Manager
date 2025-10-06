import React, { useEffect, useState } from "react";
import API from "../services/api";
import PasswordGenerator from "../components/PasswordGenerator";
import PasswordForm from "../components/PasswordForm";
import PasswordList from "../components/PasswordList";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ show: false, msg: "" });

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await API.get("/passwords");
      setList(res.data.map((i) => ({ ...i, id: i._id || i.id })));
    } catch (err) {
      console.error("Error fetching passwords:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const onGenerated = (pwd) => {
    setEditing({ title: "", url: "", username: "", password: pwd });
  };

  const onSaved = () => {
    setEditing(null);
    fetchList();
    showToast("Password saved successfully!");
  };

  const onEdit = (item) => setEditing(item);

  const onDelete = async (item) => {
    if (!confirm("Delete this entry?")) return;
    try {
      await API.delete(`/passwords/${item.id}`);
      fetchList();
      showToast("Password deleted!");
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2000);
  };

  const filteredList = list.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase()) ||
      item.url.toLowerCase().includes(search.toLowerCase())
  );

  // Metrics for password strength
  const total = list.length;
  const strongPasswords = list.filter((p) => p.password.length >= 12).length;
  const weakPasswords = total - strongPasswords;

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary mb-2">
          <i className="bi bi-lock-fill me-2"></i>Your Secure Vault
        </h1>
        <p className="text-muted mb-3">
          Generate, save, and manage your passwords securely.
        </p>
      </div>

      {/* Generator + Form Row */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-primary text-white fw-semibold">
              <i className="bi bi-magic me-2"></i>Password Generator
            </div>
            <div className="card-body">
              <PasswordGenerator onGenerated={onGenerated} />
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-primary text-white fw-semibold">
              <i className="bi bi-plus-circle me-2"></i>
              {editing ? "Edit Password" : "Add New Password"}
            </div>
            <div className="card-body">
              <PasswordForm editing={editing} onSaved={onSaved} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Password List */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white fw-semibold d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-list-ul me-2"></i>Saved Passwords
          </span>
          <button
            className="btn btn-sm btn-light d-flex align-items-center gap-1"
            onClick={fetchList}
            disabled={loading}
          >
            <i className="bi bi-arrow-clockwise"></i> Refresh
          </button>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="text-center text-muted py-5">
              <i className="bi bi-inbox fs-1 mb-2"></i>
              <p>No passwords found.</p>
            </div>
          ) : (
            <PasswordList
              list={filteredList}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className="toast show position-fixed bottom-0 end-0 m-3"
          style={{ zIndex: 9999 }}
        >
          <div className="toast-body bg-dark text-white">{toast.msg}</div>
        </div>
      )}
    </div>
  );
}
