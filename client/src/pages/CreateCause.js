import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Plus, Image as ImageIcon } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCause = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://micro-donation-platform.onrender.com/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.image_url) {
        setImageUrl(data.image_url);
      } else {
        setError(data.error || "Image upload failed");
      }
    } catch (err) {
      setError("Failed to upload image. Try again.");
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    funding_goal: Yup.number().min(1, "Goal must be at least $1").required("Funding goal is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.string(),
    deadline: Yup.date().required("Deadline is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    const causeData = {
      title: values.title,
      description: values.description,
      funding_goal: values.funding_goal,
      image_url: imageUrl,
      category: values.category,
      tags: values.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      deadline: values.deadline,
    };

    try {
      const response = await fetch("https://micro-donation-platform.onrender.com/api/causes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(causeData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("🎉 Cause created successfully!");
        navigate("/causes");
      } else {
        setError(data.error || "Failed to create cause");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 py-10"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create a New Cause</h2>

      {!user && (
        <motion.div
          className="bg-yellow-50 border-l-4 border-yellow-400 p-5 mb-6 rounded shadow"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h5 className="text-lg font-semibold text-yellow-700 flex items-center">
            ⚠ Attention!
          </h5>
          <p className="text-sm text-yellow-600 mt-2">
            Creating an account allows you to track your causes and earn rewards as a donor.
          </p>
          <div className="mt-4 flex gap-4">
            <a href="/register" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Register
            </a>
            <a href="/login" className="border border-yellow-500 text-yellow-600 px-4 py-2 rounded hover:bg-yellow-100">
              Login
            </a>
          </div>
        </motion.div>
      )}

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <Formik
        initialValues={{ title: "", description: "", funding_goal: "", category: "", tags: "", deadline: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <Field name="title" type="text" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <Field as="textarea" name="description" rows="4" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Funding Goal ($)</label>
              <Field name="funding_goal" type="number" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <ErrorMessage name="funding_goal" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Category</label>
              <Field name="category" type="text" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Tags (comma-separated)</label>
              <Field name="tags" type="text" placeholder="e.g., health, education, environment" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <ErrorMessage name="tags" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Deadline</label>
              <Field name="deadline" type="date" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <ErrorMessage name="deadline" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Upload Image</label>
              <div className="flex items-center gap-3">
                <ImageIcon className="text-gray-500" />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm" />
              </div>
              {imageUrl && (
                <motion.img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-auto mt-3 rounded shadow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {isSubmitting ? "Creating..." : "Create Cause"}
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default CreateCause;

