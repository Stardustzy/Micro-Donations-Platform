import { motion } from "framer-motion";
import { UserCircle2, LogOut } from "lucide-react";

const Profile = () => {
    const user = {
        name: "Benjamin Mweri",
        email: "benjamin@example.com",
        joined: "January 2025",
    };

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex items-center gap-4">
                <UserCircle2 size={60} className="text-blue-600" />
                <div>
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-400">Joined: {user.joined}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4">Account Settings</h3>
                <form className="space-y-4">
                    <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full border p-3 rounded-xl focus:outline-blue-400"
                    />
                    <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full border p-3 rounded-xl focus:outline-blue-400"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                    >
                        Update Profile
                    </button>
                </form>
            </div>

            <div className="flex justify-end">
                <button className="flex items-center gap-2 text-red-600 hover:text-red-800">
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </motion.div>
    );
};

export default Profile;
