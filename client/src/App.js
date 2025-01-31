import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Causes from "./pages/Causes";
import CreateCause from "./pages/CreateCause";
import EditCause from "./pages/EditCause";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard"; // Private page
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/causes" element={<Causes />} />
          <Route path="/create-cause" element={<CreateCause />} />
          <Route path="/edit-cause/:id" element={<EditCause />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
        <Footer />
    </AuthProvider>
  );
};

export default App;

