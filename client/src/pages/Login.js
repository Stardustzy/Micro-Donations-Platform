import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Lock, Mail, LogIn, Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import Blob from "../components/Blob";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Required"),
        password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
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
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 overflow-hidden">
            <Blob position="top-left" color="#bbf7d0" />
            <Blob position="bottom-right" color="#bbf7d0" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md z-10"
            >
                <div className="text-center mb-6">
                    <LogIn className="mx-auto text-green-500" size={40} />
                    <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 text-sm">Login to continue supporting causes.</p>
                </div>

                {error && <p className="text-red-500 text-center mb-3">{error}</p>}

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className="space-y-10">
                        {/* Email */}
                        <div className="relative">
                            <Field name="email" type="email" placeholder="Email address" className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" />
                            <Mail className="absolute top-2.5 left-3 text-gray-400" size={20} />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Field name="password" type={showPassword ? "text" : "password"} placeholder="Password" className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" />
                            <Lock className="absolute top-2.5 left-3 text-gray-400" size={20} />
                            <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400 cursor-pointer">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </div>
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium transition"
                        >
                            Login
                        </motion.button>
                    </Form>
                </Formik>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-green-500 hover:underline">Register here</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;


