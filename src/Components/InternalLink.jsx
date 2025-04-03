import { Link } from "react-router";

function InternalLink({ to, children }) {
    return (
        <Link to={to}
                    className="font-semibold text-green-600 underline hover:text-green-700">{children}</Link>
    )
}

export default InternalLink;