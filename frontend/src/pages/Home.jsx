import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div className="home-page">

      {/* Hero Section */}
      <section
        className="text-center text-white d-flex flex-column align-items-center justify-content-center"
        style={{
          height: "90vh",
          background: "linear-gradient(135deg, #007bff 0%, #6610f2 100%)",
          color: "white",
          position: "relative",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Manage Your Passwords Securely</h1>
          <p className="lead mb-4">
            Keep all your credentials safe and accessible, powered by modern encryption.
          </p>

          {/* Down Arrow Scroll */}
          <a
            href="#features"
            className="text-white"
            style={{
              fontSize: "3rem",
              display: "inline-block",
              marginTop: "2rem",
              animation: "bounce 2s infinite",
            }}
          >
            <i className="bi bi-chevron-down"></i>
          </a>
        </div>

        {/* Bounce Animation */}
        <style>
          {`
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-10px); }
              60% { transform: translateY(-5px); }
            }
          `}
        </style>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">Why Choose PassVault?</h2>
          <div className="row g-4">
            {[
              { icon: "bi-shield-lock", title: "Secure Encryption", text: "Passwords are encrypted with AES-256 before storage — only you can access them." },
              { icon: "bi-lightning-charge", title: "Fast & Easy", text: "Generate, store, and manage passwords instantly with a clean, intuitive interface." },
              { icon: "bi-cloud-arrow-down", title: "Accessible Anywhere", text: "Access your credentials securely from any device with cloud support." }
            ].map((feature, i) => (
              <div key={i} className="col-md-4">
                <div className="card h-100 shadow-sm border-0 hover-shadow">
                  <div className="card-body">
                    <i className={`bi ${feature.icon} fs-1 text-primary mb-3`}></i>
                    <h5 className="card-title">{feature.title}</h5>
                    <p className="card-text">{feature.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">How It Works</h2>
          <div className="row align-items-center g-4">
            <div className="col-md-6 text-md-start">
              {[
                { step: "1️⃣ Create an Account", desc: "Sign up quickly with email and a strong password." },
                { step: "2️⃣ Generate Passwords", desc: "Use the built-in generator to create strong, secure passwords." },
                { step: "3️⃣ Save & Manage", desc: "Store credentials with website, username, and password." },
                { step: "4️⃣ Access Anywhere", desc: "Manage, update, or delete passwords anytime from your dashboard." }
              ].map((item, idx) => (
                <div key={idx} className="mb-3">
                  <h4 className="fw-semibold mb-1">{item.step}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="col-md-6 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png"
                alt="Password Manager Illustration"
                className="img-fluid"
                style={{ maxWidth: "50%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">What Our Users Say</h2>
          <div className="row g-4">
            {[
              { quote: '"PassVault makes password management so easy and secure!"', name: "Alex R." },
              { quote: '"I never forget my passwords now. Highly recommended."', name: "Maria K." },
              { quote: '"The interface is clean and user-friendly. Love it!"', name: "James L." }
            ].map((user, idx) => (
              <div key={idx} className="col-md-4">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body">
                    <p className="mb-3">{user.quote}</p>
                    <h6 className="fw-bold mb-0">– {user.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="text-center text-white py-5"
        style={{ background: "#0d6efd" }}
      >
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to secure your digital life?</h2>
          <p className="mb-4">Join thousands who trust PassVault for managing passwords.</p>
          <a href="#features" className="btn btn-light btn-lg">Get Started</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">
          © {new Date().getFullYear()} PassVault. Built with ❤️ by Hariom Singh.
        </p>
      </footer>

      {/* Hover shadow effect */}
      <style>{`
        .hover-shadow:hover {
          transform: translateY(-5px);
          transition: 0.3s;
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
}
