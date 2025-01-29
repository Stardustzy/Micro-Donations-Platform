import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const initialValues = { email: "", password: "" };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Required"),
        password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
    });

    const handleSubmit = async (values) => {
        setError("");
        const response = await login(values);
        if (response.success) {
            navigate("/");
        } else {
            setError(response.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary">Login</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className="mx-auto w-50">
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
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </Form>
            </Formik>
            <p className="text-center mt-3">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
