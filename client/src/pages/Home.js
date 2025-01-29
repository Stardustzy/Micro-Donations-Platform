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
    <div className="text-center mt-5">
      <h1 className="text-primary">Welcome to the Micro-Donation Platform</h1>
      <p className="lead">
        Make small, impactful donations to support causes like education, healthcare, and environmental initiatives.
      </p>
      <div className="row">
        {causes.map((cause) => (
          <div key={cause.id} className="col-md-4">
            <div className="card mb-4">
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
    </div>
  );
}

export default Home;

