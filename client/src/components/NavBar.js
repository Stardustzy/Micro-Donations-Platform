import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Home, User, ClipboardList } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/micro-logo.jpg";

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const toggleDrawer = () => setMenuOpen(!menuOpen);
    const closeDrawer = () => setMenuOpen(false);

    return (
        <>
            <nav className="bg-gray-900 shadow-md h-[80px] md:h-[96px] w-full z-50">
                <div className="max-w-7xl mx-auto px-8 h-[80px] md:h-[96px] flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-full transition-transform duration-300 hover:scale-105"
                        />
                        <span className="text-lg sm:text-xl font-bold text-green-500 hover:text-green-400 transition">
                            Micro-Donations Platform
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        {user ? (
                            <>
                                <NavLink to="/dashboard" icon={<User size={18} />} text="Dashboard" currentPath={location.pathname} />
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-1 text-red-400 hover:text-red-500 font-medium transition"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/" icon={<Home size={18} />} text="Home" currentPath={location.pathname} />
                                <NavLink to="/causes" icon={<ClipboardList size={18} />} text="Causes" currentPath={location.pathname} />
                                <NavLink to="/register" icon={<User size={18} />} text="Register" currentPath={location.pathname} />
                            </>
                        )}
                    </div>

                    <button onClick={toggleDrawer} className="md:hidden text-green-500">
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="md:hidden bg-white px-4 py-4 shadow-lg">
                        <ul className="space-y-4">
                            {user ? (
                                <>
                                    <MobileLink to="/dashboard" icon={<User size={18} />} text="Dashboard" close={closeDrawer} currentPath={location.pathname} />
                                    <li>
                                        <button
                                            onClick={() => {
                                                logout();
                                                closeDrawer();
                                            }}
                                            className="flex items-center gap-2 text-red-500"
                                        >
                                            <LogOut size={18} /> Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <MobileLink to="/" icon={<Home size={18} />} text="Home" close={closeDrawer} currentPath={location.pathname} />
                                    <MobileLink to="/causes" icon={<ClipboardList size={18} />} text="Causes" close={closeDrawer} currentPath={location.pathname} />
                                    <MobileLink to="/register" icon={<User size={18} />} text="Register" close={closeDrawer} currentPath={location.pathname} />
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </nav>

            <div className="h-[72px] md:h-[80px]" />
        </>
    );
};

const NavLink = ({ to, icon, text, currentPath }) => {
    const isActive = currentPath === to;
    return (
        <Link
            to={to}
            className={`flex items-center gap-1 font-medium transition ${isActive ? "text-green-400" : "text-gray-300 hover:text-green-500"
                }`}
        >
            {icon} {text}
        </Link>
    );
};

const MobileLink = ({ to, icon, text, close, currentPath }) => {
    const isActive = currentPath === to;
    return (
        <li>
            <Link
                to={to}
                onClick={close}
                className={`flex items-center gap-2 ${isActive ? "text-green-600 font-semibold" : "text-gray-800 hover:text-green-600"
                    }`}
            >
                {icon} {text}
            </Link>
        </li>
    );
};

export default NavBar;


