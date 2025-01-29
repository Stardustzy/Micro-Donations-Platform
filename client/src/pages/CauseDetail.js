import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CauseService from "../services/CauseService";

const CauseDetail = () => {
  const { id } = useParams();
  const [cause, setCause] = useState(null);

  useEffect(() => {
    CauseService.getCauseById(id)
      .then((data) => setCause(data))
      .catch((error) => console.error("Error fetching cause details:", error));
  }, [id]);

  if (!cause) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>{cause.title}</h2>
      <p>{cause.description}</p>
      <p><strong>Goal:</strong> ${cause.funding_goal}</p>
      <p><strong>Raised:</strong> ${cause.amount_raised}</p>
    </div>
  );
};

export default CauseDetail;
