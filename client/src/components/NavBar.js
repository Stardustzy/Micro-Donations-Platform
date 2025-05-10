import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut, Plus, Home, User, ClipboardList } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleDrawer = () => setMenuOpen(!menuOpen);
    const closeDrawer = () => setMenuOpen(false);

    return (
        <>
            <nav className="bg-white shadow-md fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-green-600">MicroDonate</Link>

                    <div className="hidden md:flex items-center gap-6">
                        {user ? (
                            <>
                                <NavLink icon={<ClipboardList size={18} />} to="/dashboard" text="Dashboard" />
                                <NavLink icon={<Plus size={18} />} to="/create-cause" text="Create" />
                                <button onClick={logout} className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium">
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink icon={<Home size={18} />} to="/" text="Home" />
                                <NavLink icon={<Plus size={18} />} to="/create-cause" text="Create" />
                                <NavLink icon={<ClipboardList size={18} />} to="/causes" text="Causes" />
                                <NavLink icon={<User size={18} />} to="/register" text="Register" />
                            </>
                        )}
                    </div>

                    {/* Mobile menu toggle */}
                    <button onClick={toggleDrawer} className="md:hidden text-green-600">
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile drawer */}
                {menuOpen && (
                    <div className="md:hidden bg-white px-4 py-4 shadow-lg">
                        <ul className="space-y-4">
                            {user ? (
                                <>
                                    <MobileLink to="/dashboard" icon={<ClipboardList size={18} />} text="Dashboard" close={closeDrawer} />
                                    <MobileLink to="/create-cause" icon={<Plus size={18} />} text="Create" close={closeDrawer} />
                                    <li>
                                        <button onClick={() => { logout(); closeDrawer(); }} className="flex items-center gap-2 text-red-500">
                                            <LogOut size={18} /> Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <MobileLink to="/" icon={<Home size={18} />} text="Home" close={closeDrawer} />
                                    <MobileLink to="/create-cause" icon={<Plus size={18} />} text="Create" close={closeDrawer} />
                                    <MobileLink to="/causes" icon={<ClipboardList size={18} />} text="Causes" close={closeDrawer} />
                                    <MobileLink to="/register" icon={<User size={18} />} text="Register" close={closeDrawer} />
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </nav>

            {/* Spacer */}
            <div className="h-[72px] md:h-[80px]" />
        </>
    );
};

const NavLink = ({ to, icon, text }) => (
    <Link
        to={to}
        className="flex items-center gap-1 text-gray-700 hover:text-green-600 font-medium"
    >
        {icon} {text}
    </Link>
);

const MobileLink = ({ to, icon, text, close }) => (
    <li>
        <Link
            to={to}
            onClick={close}
            className="flex items-center gap-2 text-gray-800 hover:text-green-600"
        >
            {icon} {text}
        </Link>
    </li>
);

export default NavBar;

