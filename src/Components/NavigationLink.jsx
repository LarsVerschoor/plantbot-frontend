import { Link, useLocation } from "react-router";

function NavigationLink({to, children}) {
    const location = useLocation();
    return (
        <Link to={to} className={`px-5 py-3 rounded-md hover:bg-gray-200 text-center ${location.pathname === to && 'font-semibold'}`}>{children}</Link>
    )
}

export default NavigationLink;