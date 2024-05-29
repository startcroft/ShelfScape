import { Outlet, Navigate } from "react-router-dom";
// import { useState } from "react";
import { useAuth } from "./AuthProvider";

export default function ProtectedRouter(){
    const auth = useAuth();

    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/"/>
}