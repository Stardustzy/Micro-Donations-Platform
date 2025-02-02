import React, { useState, useEffect } from "react";
import CauseService from "../services/CauseService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [causes, setCauses] = useState([]);

  useEffect(() => {
    CauseService.getFeaturedCauses()
      .then((data) => setCauses(data))
      .catch((error) => console.error("Error fetching featured causes:", error));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        className="hero text-center text-white py-5"
        style={{ background: "#007bff", color: "white" }}
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }} 
      >
        <div className="container">
          <h1 className="display-4">Empower Change with Micro-Donations</h1>
          <p className="lead">
            Small contributions can make a huge impact on education, healthcare, and the environment.
          </p>
          <Link to="/donate" className="btn btn-light btn-lg">
            Start Donating
          </Link>
        </div>
      </motion.section>

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
            <motion.div
              key={cause.id}
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }} 
              viewport={{ once: true }} 
            >
              <div className="card mb-4 shadow-sm">
                {cause.image_url && (
                  <img src={cause.image_url} className="card-img-top" alt={cause.title} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{cause.title}</h5>
                  <p className="card-text">{cause.description}</p>
                  <p><strong>Goal:</strong> ${cause.funding_goal}</p>
                  <p><strong>Raised:</strong> ${cause.amount_raised}</p>
                  <div className="progress mb-3">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(cause.amount_raised / cause.funding_goal) * 100}%`,
                      }}
                      aria-valuenow={(cause.amount_raised / cause.funding_goal) * 100}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <Link to={`/causes/${cause.id}`} className="btn btn-primary">View Cause</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <motion.section
        className="text-center py-5"
        style={{ background: "#f8f9fa" }}
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.4 }} 
        viewport={{ once: true }} 
      >
        <div className="container">
          <h2 className="mb-4">Our Impact</h2>
          <div className="row">
            <div className="col-md-4">
              <h3>$1M+</h3>
              <p>Total Donations</p>
            </div>
            <div className="col-md-4">
              <h3>10,000+</h3>
              <p>Donors</p>
            </div>
            <div className="col-md-4">
              <h3>500+</h3>
              <p>Causes Funded</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">What People Are Saying</h2>
        <div className="row">
          {[
            {
              text: "This platform has made it so easy to support causes I care about. Highly recommend!",
              author: "Jane Doe, Donor",
            },
            {
              text: "Thanks to the generous donors, we were able to fund our education initiative.",
              author: "John Smith, Recipient",
            },
            {
              text: "A transparent and impactful way to make a difference in the world.",
              author: "Sarah Lee, Partner",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 * index }} 
              viewport={{ once: true }} 
            >
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <p className="card-text">{testimonial.text}</p>
                  <p className="text-muted">- {testimonial.author}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blog/News Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Latest News</h2>
        <div className="row">
          {[
            {
              image: "https://via.placeholder.com/300",
              title: "New Education Initiative Launched",
              text: "Learn how our latest project is helping underprivileged children access quality education.",
            },
            {
              image: "https://via.placeholder.com/300",
              title: "Donor Spotlight: Jane Doe",
              text: "Meet Jane, one of our top donors, and learn why she supports our platform.",
            },
            {
              image: "https://via.placeholder.com/300",
              title: "Environmental Cause Success",
              text: "See how donations helped plant 10,000 trees in deforested areas.",
            },
          ].map((news, index) => (
            <motion.div
              key={index}
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }} 
              viewport={{ once: true }} 
            >
              <div className="card mb-4 shadow-sm">
                <img src={news.image} className="card-img-top" alt={news.title} />
                <div className="card-body">
                  <h5 className="card-title">{news.title}</h5>
                  <p className="card-text">{news.text}</p>
                  <a href="#" className="btn btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </motion.div>
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

