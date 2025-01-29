import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CauseService from "../services/CauseService";

const CauseDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [cause, setCause] = useState(null);

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

    return (
        <div className="container mt-5">
            <h2>{cause.title}</h2>
            <p>{cause.description}</p>
            <p><strong>Funding Goal:</strong> ${cause.funding_goal}</p>
            <p><strong>Raised:</strong> ${cause.amount_raised}</p>

            {user && (user.id === cause.user_id || user.role === "admin") && (
                <Link to={`/edit-cause/${id}`} className="btn btn-warning">Edit Cause</Link>
            )}
        </div>
    );
};

export default CauseDetail;
