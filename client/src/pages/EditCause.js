import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CauseService from "../services/CauseService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditCause = () => {
    const { id } = useParams();
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cause, setCause] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCause = async () => {
            try {
                const response = await CauseService.getCauseById(id);
                setCause(response.data);
            } catch (err) {
                setError("Failed to fetch cause details.");
            }
        };
        fetchCause();
    }, [id]);

    if (!user || (cause && cause.user_id !== user.id && user.role !== "admin")) {
        return <p className="text-center mt-5">You are not authorized to edit this cause.</p>;
    }

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        funding_goal: Yup.number().min(1, "Goal must be at least $1").required("Funding goal is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await CauseService.updateCause(id, values, token);
            navigate(`/causes/${id}`);
        } catch (err) {
            setError("Failed to update cause.");
        }
        setSubmitting(false);
    };

    if (!cause) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <h2>Edit Cause</h2>
            {error && <p className="text-danger">{error}</p>}
            <Formik
                initialValues={{ title: cause.title, description: cause.description, funding_goal: cause.funding_goal }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="form-group">
                        <label>Title</label>
                        <Field type="text" name="title" className="form-control" />
                        <ErrorMessage name="title" component="div" className="text-danger" />

                        <label>Description</label>
                        <Field as="textarea" name="description" className="form-control" />
                        <ErrorMessage name="description" component="div" className="text-danger" />

                        <label>Funding Goal ($)</label>
                        <Field type="number" name="funding_goal" className="form-control" />
                        <ErrorMessage name="funding_goal" component="div" className="text-danger" />

                        <button type="submit" className="btn btn-success mt-3" disabled={isSubmitting}>
                            {isSubmitting ? "Updating..." : "Update Cause"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditCause;
