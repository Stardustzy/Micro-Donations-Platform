import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import Sidebar from "../components/Sidebar";

const CauseDetail = () => {
    const { id } = useParams();
    const [cause, setCause] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock fetch
    useEffect(() => {
        setTimeout(() => {
            setCause({
                id,
                title: "Feed the Children in Turkana",
                description: "We're on a mission to fight hunger in Turkana by providing daily meals to over 500 children.",
                imageUrl: "https://source.unsplash.com/800x400/?children,africa",
                amountRaised: 45000,
                goalAmount: 100000,
                recentDonors: [
                    { name: "Jane Doe", amount: 500 },
                    { name: "John Smith", amount: 1000 },
                ],
            });
            setLoading(false);
        }, 1000);
    }, [id]);

    const handleDonate = (e) => {
        e.preventDefault();
        alert("Donation submitted! (Integrate this with backend later)");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader className="animate-spin text-gray-600" size={32} />
            </div>
        );
    }

    const progress = Math.min((cause.amountRaised / cause.goalAmount) * 100, 100).toFixed(1);

    return (
        <div className="flex">
            <Sidebar />
            <main className="ml-64 p-6 w-full bg-gray-50 min-h-screen">
                {/* Title */}
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">{cause.title}</h1>
                    <p className="text-gray-600 mt-1">Cause ID: {cause.id}</p>
                </div>

                {/* Image */}
                <div className="mb-6">
                    <img src={cause.imageUrl} alt={cause.title} className="rounded-xl shadow-lg w-full max-h-[400px] object-cover" />
                </div>

                {/* Description & Donation */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Panel */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">About the Cause</h2>
                        <p className="text-gray-700 leading-relaxed">{cause.description}</p>

                        {/* Progress Bar */}
                        <div className="mt-6">
                            <p className="text-sm text-gray-500 mb-1">Progress: {progress}%</p>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-green-500 h-4 rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                                Raised <strong>KSh {cause.amountRaised.toLocaleString()}</strong> of KSh {cause.goalAmount.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Right Panel - Donation Form */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Make a Donation</h3>
                        <form onSubmit={handleDonate} className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                className="border rounded px-4 py-2"
                            />
                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount (KSh)"
                                required
                                min="1"
                                className="border rounded px-4 py-2"
                            />
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded"
                            >
                                Donate Now
                            </button>
                        </form>
                    </div>
                </div>

                {/* Donors List */}
                <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Recent Donors</h4>
                    <ul className="divide-y">
                        {cause.recentDonors.map((donor, index) => (
                            <li key={index} className="py-3 flex justify-between text-gray-700">
                                <span>{donor.name}</span>
                                <span className="text-green-600 font-medium">KSh {donor.amount}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default CauseDetail;
