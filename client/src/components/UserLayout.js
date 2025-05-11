import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function UserLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="ml-64 w-full p-6">
                <Outlet />
            </main>
        </div>
    );
}

export default UserLayout;
