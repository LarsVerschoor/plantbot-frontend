import { Outlet, useNavigate } from 'react-router';
import { useContext, useEffect } from "react";
import { AuthContext } from "./Contexts/Auth.jsx";

function AuthLayout() {
    const navigate = useNavigate();
    const {verificationEmail, token} = useContext(AuthContext);

    useEffect(() => {
        (() => {
            if (verificationEmail !== null) return navigate('/verify');
            if (token !== null) return navigate('/');
        })();
    }, [verificationEmail, token, navigate]);

    return (
        <div className="bg-gray-100">
            <main className="min-h-svh flex justify-center items-center">
                <Outlet/>
            </main>
        </div>
    )
}

export default AuthLayout;