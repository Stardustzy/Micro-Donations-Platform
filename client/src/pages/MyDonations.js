import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";

const MyDonations = () => {
    const donations = [
        { id: 1, cause: "Tree Planting Drive", amount: "$50", date: "2025-04-01" },
        { id: 2, cause: "Medical Aid for Refugees", amount: "$100", date: "2025-03-15" },
    ];

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <HeartHandshake size={24} className="text-red-500" /> My Donations
            </h1>

            <div className="bg-white rounded-2xl shadow p-6">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-500 border-b">
                            <th className="py-2">Cause</th>
                            <th className="py-2">Amount</th>
                            <th className="py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation) => (
                            <tr key={donation.id} className="border-b hover:bg-gray-50 transition">
                                <td className="py-3">{donation.cause}</td>
                                <td className="py-3 text-green-600 font-medium">{donation.amount}</td>
                                <td className="py-3">{donation.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default MyDonations;
