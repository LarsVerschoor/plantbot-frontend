import { Link, useLocation } from "react-router";
import logo from "../assets/logo_plantbot_text.svg";
import NavigationLink from "../Components/NavigationLink.jsx"

function Navigation() {
    const location = useLocation();

    const isCurrent = (path) => location.pathname === path;

    return (
        <nav className="bg-white rounded-b-md shadow-md px-4 py-3 w-full">
            <div className="max-w-page flex justify-between mx-auto">
                <Link to="/" className="flex items-center"><img src={logo} alt="PlantBot logo" width="180"
                                                                className="p-4"/></Link>
                <div className="flex gap-2 items-center">
                    <NavigationLink to="/" isCurrent={isCurrent('/')}>Dashboard</NavigationLink>
                    <NavigationLink to="/plants" isCurrent={isCurrent('/plants')}>Manage plants</NavigationLink>
                    <NavigationLink to="/plantbots" isCurrent={isCurrent('/plantbots')}>Manage
                        PlantBots</NavigationLink>
                </div>
                <div className="flex items-center">
                    <div className="p-4">settings dropdown</div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;