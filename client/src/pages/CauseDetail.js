import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { io } from "socket.io-client";
import CauseService from "../services/CauseService";
import DonationService from "../services/DonationService";

const socket = io("http://localhost:5000");

const CauseDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [cause, setCause] = useState(null);
    const [donationAmount, setDonationAmount] = useState("");
    const [message, setMessage] = useState("");
    const [totalDonations, setTotalDonations] = useState(0);
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        const fetchCause = async () => {
            try {
                const response = await CauseService.getCauseById(id);
                setCause(response.data);
            } catch (err) {
                console.error("Error fetching cause details", err);
            }
        };
        fetchCause();
    }, [id]);

    if (!cause) return <p className="text-center mt-5">Loading...</p>;

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await DonationService.getDonationsByCause(id);
                const total = response.data.reduce((sum, donation) => sum + donation.amount, 0);
                setTotalDonations(total);
            } catch (err) {
                console.error("Error fetching donations", err);
            }
        };
        fetchDonations();

        // Listen for new donations
        socket.on("new_donation", (donation) => {
            setDonors((prevDonors) => [...prevDonors, donation]);
        });

        return () => {
            socket.off("new_donation");
        };
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this cause?")) {
            try {
                await CauseService.deleteCause(id, user.token);
                navigate("/");
            } catch (err) {
                console.error("Error deleting cause", err);
            }
        }
    };

    const handleDonate = async () => {
        if (!user) {
            alert("You must be logged in to donate.");
            return;
        }

        if (donationAmount <= 0) {
            alert("Please enter a valid donation amount.");
            return;
        }

        try {
            await DonationService.makeDonation({ cause_id: id, amount: donationAmount, user_id: user.id });
            setMessage("Donation successful! Thank you for your support.");
            setDonationAmount("");
        } catch (err) {
            setMessage("Failed to process donation.");
            console.error("Error making donation", err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>{cause.title}</h2>
            <p>{cause.description}</p>
            <p><strong>Funding Goal:</strong> ${cause.funding_goal}</p>
            <p><strong>Total Raised:</strong> ${cause.amount_raised}</p>
            <p><strong>Total Donations:</strong> ${totalDonations}</p>

            <h4>Live Donations</h4>
            <ul>
                {donors.map((donor, index) => (
                    <li key={index}>
                        User {donor.user_id} donated ${donor.amount} - {donor.reward || "No reward"}
                    </li>
                ))}
            </ul>

            <h4>Donors & Rewards</h4>
            <ul>
                {donors.map((donor) => (
                    <li key={donor.id}>
                        User {donor.user_id} - ${donor.amount} - {donor.reward_tier || "No reward"}
                    </li>
                ))}
            </ul>

            {user && (
                <div>
                    <h4>Donate to this cause</h4>
                    <input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="form-control"
                        placeholder="Enter amount"
                    />
                    <button onClick={handleDonate} className="btn btn-primary mt-2">Donate</button>
                </div>
            )}

            {message && <p className="text-success">{message}</p>}

            {user && (user.id === cause.user_id || user.role === "admin") && (
                <>
                    <Link to={`/edit-cause/${id}`} className="btn btn-warning">Edit Cause</Link>
                    <button onClick={handleDelete} className="btn btn-danger ms-2">Delete</button>
                </>
            )}
        </div>
    );
};

export default CauseDetail;
