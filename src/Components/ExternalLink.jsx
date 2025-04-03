function ExternalLink({ href, children }) {
    return (
        <a href={href} target="_blank"
           className="font-semibold text-green-600 underline hover:text-green-700">{children}</a>
    )
}

export default ExternalLink;