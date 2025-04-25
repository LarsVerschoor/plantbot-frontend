import { Outlet } from 'react-router';
import Navigation from "./Components/Navigation.jsx";
import Footer from "./Components/Footer.jsx";

function Layout() {
    return (
        <div className="bg-gray-100 min-h-svh flex flex-col items-center">
            <Navigation/>
            <main className="flex-1 max-w-page px-4 w-full my-10 flex flex-col">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default Layout;