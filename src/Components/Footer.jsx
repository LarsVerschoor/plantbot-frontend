import ExternalLink from "./ExternalLink.jsx";

function Footer() {
    return (
        <footer className="bg-white w-full flex justify-center p-5 shadow-md rounded-t-md">
            <ExternalLink href="https://github.com/LarsVerschoor/plantbot-frontend">Github repository of this
                website</ExternalLink>
        </footer>
    )
}

export default Footer;