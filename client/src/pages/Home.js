import React, { useState, useEffect } from "react";
import CauseService from "../services/CauseService";
import { Link } from "react-router-dom";

const Home = () => {
  const [causes, setCauses] = useState([]);

  useEffect(() => {
    CauseService.getAllCauses()
      .then((data) => setCauses(data))
      .catch((error) => console.error("Error fetching causes:", error));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero text-center text-white py-5" style={{ background: "#007bff", color: "white" }}>
        <div className="container">
          <h1 className="display-4">Empower Change with Micro-Donations</h1>
          <p className="lead">Small contributions can make a huge impact on education, healthcare, and the environment.</p>
          <Link to="/donate" className="btn btn-light btn-lg">Start Donating</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container my-5">
        <div className="row text-center">
          <div className="col-md-4">
            <i className="bi bi-heart display-4 text-primary"></i>
            <h3 className="mt-3">Secure Donations</h3>
            <p>Our platform ensures safe and transparent transactions for all contributions.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-people display-4 text-primary"></i>
            <h3 className="mt-3">Community Impact</h3>
            <p>Support meaningful causes and help communities grow with small donations.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-globe display-4 text-primary"></i>
            <h3 className="mt-3">Global Reach</h3>
            <p>Donate from anywhere in the world and support causes globally.</p>
          </div>
        </div>
      </section>

      {/* Causes Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Explore Causes</h2>
        <div className="row">
          {causes.map((cause) => (
            <div key={cause.id} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                {cause.image_url && <img src={cause.image_url} className="card-img-top" alt={cause.title} />}
                <div className="card-body">
                  <h5 className="card-title">{cause.title}</h5>
                  <p className="card-text">{cause.description}</p>
                  <p><strong>Goal:</strong> ${cause.funding_goal}</p>
                  <p><strong>Raised:</strong> ${cause.amount_raised}</p>
                  <Link to={`/causes/${cause.id}`} className="btn btn-primary">View Cause</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center bg-light py-5">
        <div className="container">
          <h2>Join Us in Making a Difference</h2>
          <p>Your small contributions can change lives. Start donating or create a cause today.</p>
          <Link to="/donate" className="btn btn-success btn-lg mx-2">Donate Now</Link>
          <Link to="/create-cause" className="btn btn-warning btn-lg mx-2">Start a Cause</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

