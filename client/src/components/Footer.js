import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <div className="row">
          {/* Quick Links */}
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/create-cause" className="text-light">Create Cause</a></li>
              <li><a href="/causes" className="text-light">Causes</a></li>
              <li><a href="/register" className="text-light">Register here!</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center">
              <a href="https://facebook.com/microdonationskenya" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://twitter.com/microdonationskenya" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="https://linkedin.com/in/microdonationskenya" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
              <a href="https://instagram.com/microdonationskenya" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a href="https://tiktok.com/@microdonationskenya" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-tiktok fa-2x"></i>
              </a>
              <a href="https://youtube.com/@microdonationskenya" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="col-md-4">
            <h5>Subscribe to Our Newsletter</h5>
            <form>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Enter your email" required />
                <button className="btn btn-primary" type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        <hr className="bg-light" />
        <p className="mb-0">&copy; {new Date().getFullYear()} Micro-Donation Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
