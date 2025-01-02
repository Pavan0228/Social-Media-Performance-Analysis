import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create the Auth Context
const AuthContext = createContext();

// AuthProvider Component
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication on initial load
    useEffect(() => {
        const token = Cookies.get("accessToken"); // Replace 'accessToken' with your cookie's key
        setIsAuthenticated(!!token); // If the token exists, the user is authenticated
    }, []);

    // Function to handle logout
    const logout = () => {
        Cookies.remove("accessToken"); // Replace with your cookie's key
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
