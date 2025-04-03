import { Outlet, useNavigate } from 'react-router';
import Navigation from "./Components/Navigation.jsx";
import Footer from "./Components/Footer.jsx";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Contexts/Auth.jsx";

function Layout() {
    const navigate = useNavigate();
    const {verificationEmail} = useContext(AuthContext);

    useEffect(() => {
        (() => {
            if (verificationEmail !== null) return navigate('/verify');
        })()
    }, [verificationEmail, navigate]);

    return (
        <div className="bg-gray-100 min-h-svh flex flex-col items-center">
            <Navigation/>
            <main className="flex-1 max-w-page px-4 w-full mt-10">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default Layout;