import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const useAuth = () => {
    return useMemo(() => Cookies.get("accessToken") !== undefined, []);
};

const ProtectedRoute = ({ children, redirectTo = "/" }) => {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};

export default ProtectedRoute;
