import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import CauseService from "../services/CauseService";

const socket = io("https://micro-donation-platform.onrender.com", { transports: ["websocket"] });

const Causes = () => {
    const [causes, setCauses] = useState(null);
    const [filteredCauses, setFilteredCauses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("category");
    const [donations, setDonations] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCauses = async () => {
            try {
                const data = await CauseService.getAllCauses();
                setCauses(data);
                setFilteredCauses(data);
                const uniqueCategories = [...new Set(data.map(cause => cause.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                console.error("Error fetching causes", err);
            }
        };
        fetchCauses();
    }, []);

    useEffect(() => {
        socket.on("new_donation", (donation) => {
            setDonations((prevDonations) => ({
                ...prevDonations,
                [donation.cause_id]: (prevDonations[donation.cause_id] || 0) + donation.amount,
            }));
        });
        return () => {
            socket.off("new_donation");
        };
    }, []);

    const handleSearch = () => {
        if (!searchTerm) {
            setFilteredCauses(causes);
            return;
        }
        if (searchBy === "category") {
            setFilteredCauses(causes.filter(cause => cause.category.toLowerCase().includes(searchTerm.toLowerCase())));
        } else {
            setFilteredCauses(causes.filter(cause => cause.id.toString() === searchTerm));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this cause?")) {
            try {
                await CauseService.deleteCause(id);
                setCauses(causes.filter(cause => cause.id !== id));
                setFilteredCauses(filteredCauses.filter(cause => cause.id !== id));
                navigate("/");
            } catch (err) {
                console.error("Error deleting cause", err);
            }
        }
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">All Causes</h2>
            <div className="mb-3">
                <label>Search</label>
                <select className="form-select" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                    <option value="category">Category</option>
                    <option value="id">ID</option>
                </select>
                <input
                    type="text"
                    className="form-control mt-2"
                    placeholder={`Search by ${searchBy}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
            </div>
            <div className="row">
                {filteredCauses.length > 0 ? (
                    filteredCauses.map(cause => (
                        <div key={cause.id} className="col-md-4">
                            <div className="card mb-4">
                                <img src={cause.image_url} className="card-img-top" alt={cause.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{cause.title}</h5>
                                    <p className="card-text">{cause.description}</p>
                                    <p><strong>Funding Goal:</strong> ${cause.funding_goal}</p>
                                    <p><strong>Amount Raised:</strong> ${cause.amount_raised + (donations[cause.id] || 0)}</p>
                                    <Link to={`/donate/${cause.id}`} className="btn btn-success ms-2">Donate</Link>
                                    <Link to={`/edit/${cause.id}`} className="btn btn-primary ms-2">Edit</Link>
                                    <button onClick={() => handleDelete(cause.id)} className="btn btn-danger ms-2">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No causes available.</p>
                )}
            </div>
        </div>
    );
};

export default Causes;
