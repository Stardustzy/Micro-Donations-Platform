import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Causes from "./pages/Causes";
import CreateCause from "./pages/CreateCause";
import EditCause from "./pages/EditCause";
import CauseDetail from "./pages/CauseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import MyCauses from "./pages/MyCauses";
import MyDonations from "./pages/MyDonations";
import Profile from "./pages/Profile";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./components/UserLayout";

function App() {
  const location = useLocation();

  const userLayoutPaths = [
    "/dashboard",
    "/create-cause",
    "/edit-cause",
    "/my-causes",
    "/my-donations",
    "/profile",
  ];

  const isUserLayoutRoute = userLayoutPaths.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <AuthProvider>
      {!isUserLayoutRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/causes" element={<Causes />} />
        <Route path="/cause-details/:id" element={<CauseDetail />} />
        <Route path="/causes/:id" element={<Causes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes with Layout */}
        <Route element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-cause" element={<CreateCause />} />
          <Route path="/edit-cause/:id" element={<EditCause />} />
          <Route path="/my-causes" element={<MyCauses />} />
          <Route path="/my-donations" element={<MyDonations />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isUserLayoutRoute && <Footer />}
    </AuthProvider>
  );
};

export default App;

