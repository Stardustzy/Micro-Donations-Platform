import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CauseService from "../services/CauseService";

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
                setCategories([...new Set(data.map(cause => cause.category))]);
            } catch (err) {
                console.error("Error fetching causes", err);
            }
        };
        fetchCauses();
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
            {/* Header Section */}
            <header className="text-center my-4">
                <h2>Support a Cause, Make a Difference</h2>
                <p>Explore various causes and contribute to impactful initiatives in education, healthcare, and environmental sustainability.</p>
            </header>

            {/* Search and Filter */}
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

            {/* Causes List */}
            <section className="row">
                {filteredCauses.length > 0 ? (
                    filteredCauses.map(cause => (
                        <div key={cause.id} className="col-md-4 col-sm-6">
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
            </section>

            {/* CTA Section */}
            <section className="my-4">
                <div className="card text-center p-4 shadow-lg border-0">
                    <div className="card-body">
                        <h3 className="card-title">Your Contribution Matters</h3>
                        <p className="card-text">Browse through various causes and make a donation today! Even the smallest amounts drive change.</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="my-4">
                <h3>Frequently Asked Questions</h3>
                <div className="accordion" id="faqAccordion">
                    {[
                        { question: "How do I donate to a cause?", answer: "You can donate by clicking the 'Donate' button on any cause and following the instructions." },
                        { question: "Can I track my donation’s impact?", answer: "Yes! We provide updates on how your donations are being used." },
                        { question: "How do I submit a new cause?", answer: "You can submit a new cause by contacting us through the 'Contact' page." },
                        { question: "Are my donations secure?", answer: "Absolutely! We use secure payment gateways to ensure your transactions are safe." }
                    ].map((faq, index) => (
                        <div className="accordion-item" key={index}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}>
                                    {faq.question}
                                </button>
                            </h2>
                            <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">{faq.answer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Causes;
