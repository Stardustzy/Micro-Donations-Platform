import React from "react";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <div className="container">
                <div className="row">

                    {/* Quick Links */}
                    <div className="col-md-4 mb-3">
                        <h5 className="text-center">Quick Links</h5>
                        <div className="row">
                            {[
                                { name: "Home", link: "/" },
                                { name: "Create Cause", link: "/create-cause" },
                                { name: "Causes", link: "/causes" },
                                { name: "Register here!", link: "/register" }
                            ].map((item, index) => (
                                <div key={index} className="col-6 col-md-12 mb-2">
                                    <a href={item.link} className="text-decoration-none">
                                        <div className="card text-center shadow-sm bg-primary text-light">
                                            <div className="card-body py-2">
                                                <h6 className="mb-0">{item.name}</h6>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="col-md-4 mb-3">
                        <div className="card bg-secondary text-light">
                            <div className="card-body text-center">
                                <h5 className="card-title">Follow Us</h5>
                                <div className="d-flex justify-content-center flex-wrap">
                                    {[
                                        { icon: "facebook", link: "https://facebook.com/microdonationskenya" },
                                        { icon: "twitter", link: "https://twitter.com/microdonationskenya" },
                                        { icon: "linkedin", link: "https://linkedin.com/in/microdonationskenya" },
                                        { icon: "instagram", link: "https://instagram.com/microdonationskenya" },
                                        { icon: "tiktok", link: "https://tiktok.com/@microdonationskenya" },
                                        { icon: "youtube", link: "https://youtube.com/@microdonationskenya" }
                                    ].map((social, index) => (
                                        <a key={index} href={social.link} className="text-light mx-2" target="_blank" rel="noopener noreferrer">
                                            <i className={`fab fa-${social.icon} fa-2x`}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Newsletter Subscription */}
                    <div className="col-md-4 mb-3">
                        <div className="card bg-info text-light">
                            <div className="card-body">
                                <h5 className="card-title text-center">Subscribe to Our Newsletter</h5>
                                <form>
                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control" placeholder="Enter your email" required />
                                        <button className="btn btn-primary" type="submit">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

                <hr className="bg-light" />
                <p className="text-center mb-0">&copy; {new Date().getFullYear()} Micro-Donation Platform LLC. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
