import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const { register } = useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().min(2, "Too short!").required("Required"),
        email: Yup.string().email("Invalid email format").required("Required"),
        password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Required"),
    });

    const handleSubmit = async (values) => {
        setError("");
        const { confirmPassword, ...userData } = values;
        const response = await register(userData);
        if (response.success) {
            navigate("/login");
        } else {
            setError(response.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary">Register</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className="mx-auto w-50">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <Field type="text" name="name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <Field type="email" name="email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <Field type="password" name="password" className="form-control" />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <Field type="password" name="confirmPassword" className="form-control" />
                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </Form>
            </Formik>
            <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
