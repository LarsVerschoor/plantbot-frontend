const defaultStyles = 'text-center px-3 py-2 w-full rounded-md'

const styles = {
    primary: `${defaultStyles} bg-green-600 hover:bg-green-700 text-white`,
    secondary: `${defaultStyles} border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold`
}

function Button({ type, style, onClick, children }) {
    return (
        <button type={type} onClick={onClick}
                className={style === 'secondary' ? styles.secondary : styles.primary}>{children}</button>
    )
}

export default Button;