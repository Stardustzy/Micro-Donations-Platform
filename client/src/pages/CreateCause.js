import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CauseService from "../services/CauseService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateCause = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  //if (!user || (user.role !== "recipient" && user.role !== "admin")) {
    //return <p className="text-center mt-5">You are not authorized to create a cause.</p>;
  //}

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    funding_goal: Yup.number().min(1, "Goal must be at least $1").required("Funding goal is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await CauseService.createCause(values, token);
      navigate("/");
    } catch (err) {
      setError("Failed to create cause. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Cause</h2>
      {error && <p className="text-danger">{error}</p>}
      <Formik
        initialValues={{ title: "", description: "", funding_goal: "" }}
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

            <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Cause"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCause;
