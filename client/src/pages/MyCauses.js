import { motion } from "framer-motion";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

const MyCauses = () => {
    const causes = [
        { id: 1, title: "Clean Water for All", goal: "$5,000", raised: "$3,200" },
        { id: 2, title: "Education Support Fund", goal: "$10,000", raised: "$8,100" },
    ];

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Causes</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <PlusCircle size={20} /> Add New Cause
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {causes.map((cause) => (
                    <motion.div
                        key={cause.id}
                        className="bg-white p-5 shadow-md rounded-2xl border border-gray-200"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h2 className="text-xl font-semibold mb-2">{cause.title}</h2>
                        <p className="text-sm text-gray-600 mb-2">Goal: {cause.goal}</p>
                        <p className="text-sm text-gray-600">Raised: {cause.raised}</p>
                        <div className="flex justify-end gap-3 mt-4">
                            <button className="text-blue-600 hover:text-blue-800">
                                <Edit size={20} />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default MyCauses;
