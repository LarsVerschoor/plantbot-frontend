function Button({ type, onClick, children }) {
    return (
        <button type={type} onClick={onClick}
                className="bg-green-600 hover:bg-green-700 text-white text-center px-3 py-2 w-full rounded-md">{children}</button>
    )
}

export default Button;