const defaultStyles = 'text-center px-5 py-2 rounded-md'

const styles = {
    primary: `${defaultStyles} border-2 border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700 text-white`,
    secondary: `${defaultStyles} border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold`,
    disabled: `${defaultStyles} border-2 border-gray-400 bg-gray-400 text-gray-600 cursor-not-allowed`
}

function Button({ type, style, onClick, disabled, children }) {
    let buttonStyle = style === 'secondary' ? styles.secondary : styles.primary;
    if (disabled) buttonStyle = styles.disabled;

    return (
        <button type={type} onClick={onClick}
                className={buttonStyle} disabled={disabled}>{children}</button>
    );
}

export default Button;