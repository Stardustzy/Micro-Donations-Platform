import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Plus, List, DollarSign, User, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
    const { logout } = useContext(AuthContext);
    const location = useLocation();

    const navLinks = [
        { path: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
        { path: "/dashboard/my-causes", icon: <List size={20} />, label: "My Causes" },
        { path: "/create-cause", icon: <Plus size={20} />, label: "Create Cause" },
        { path: "/my-donations", icon: <DollarSign size={20} />, label: "My Donations" },
        { path: "/profile", icon: <User size={20} />, label: "Profile" },
    ];

    return (
        <aside className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 pt-20 px-4 z-40">
            <nav className="flex flex-col gap-6">
                {navLinks.map(link => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${location.pathname === link.path ? "bg-green-600" : "hover:bg-gray-700"
                            }`}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-red-400 hover:bg-gray-700 transition-colors"
                >
                    <LogOut size={20} /> Logout
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
