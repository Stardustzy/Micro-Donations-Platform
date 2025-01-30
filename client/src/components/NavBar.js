import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">Micro-Donation Platform</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav d-flex align-items-center gap-2">
                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link card-link" to="/dashboard">
                                            <div className="nav-card">Dashboard</div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link card-link" to="/create-cause">
                                            <div className="nav-card">Create Cause</div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-danger ms-2 px-3" onClick={logout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link card-link" to="/">
                                            <div className="nav-card">Home</div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link card-link" to="/create-cause">
                                            <div className="nav-card">Create Cause</div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link card-link" to="/causes">
                                            <div className="nav-card">Causes</div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link card-link" to="/register">
                                            <div className="nav-card">Register</div>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Spacer for section separation */}
            <div className="spacer"></div>

            {/* Styles */}
            <style>
                {`
                .spacer {
                    margin-top: 20px; /* Adds space between navbar and sections below */
                }
                .nav-card {
                    background: white;
                    padding: 8px 15px;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease-in-out;
                    font-weight: bold;
                    text-align: center;
                }
                .nav-card:hover {
                    background: green;
                    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
                }
                .card-link {
                    text-decoration: none;
                    color: black;
                }
                .card-link:hover {
                    text-decoration: none;
                }
            `}
            </style>
        </>
    );
}

export default Navbar;
