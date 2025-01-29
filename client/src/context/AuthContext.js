import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/user", {
                    withCredentials: true,
                });
                if (response.data.user) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.log("No active session");
            } finally {
                setLoading(false);
            }
        };

        checkUserSession();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/api/login", credentials, {
                withCredentials: true,
            });
            setUser(response.data.user);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    };

    const register = async (userData) => {
        try {
          await axios.post("http://127.0.0.1:5000/api/register", userData);
          return { success: true };
        } catch (error) {
          return { success: false, message: error.response?.data?.message || "Registration failed" };
        }
      };
    
      const logout = async () => {
        try {
          await axios.post("http://127.0.0.1:5000/api/logout", {}, { withCredentials: true });
          setUser(null);
        } catch (error) {
          console.log("Logout failed");
        }
      };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
