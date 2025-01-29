import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CauseDetail from "./pages/CauseDetail";
import CreateCause from "./pages/CreateCause";
import EditCause from "./pages/EditCause";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard"; // Private page
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/causes/:causeId" element={<CauseDetail />} />
          <Route path="/create-cause" element={<ProtectedRoute><CreateCause /></ProtectedRoute>} />
          <Route path="/edit-cause/:id" element={<ProtectedRoute><EditCause /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          {/* More routes will be added here later */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

