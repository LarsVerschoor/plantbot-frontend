import { useContext } from "react";
import { AuthContext } from "./Contexts/Auth.jsx";
import { Navigate, Outlet } from "react-router";

function GuestRoute() {
    const { token, verificationEmail } = useContext(AuthContext);

    if (verificationEmail) return <Navigate to="/verify" replace/>
    if (token) return <Navigate to="/" replace/>;

    return <Outlet/>;
}

export default GuestRoute;