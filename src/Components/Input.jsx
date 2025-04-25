function Input({ id, name, type, value, placeholder, onChange }) {
    return (
        <input id={id} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}
               className="border-2 border-gray-400 outline-none focus:border-green-600 focus:ring-0 rounded-md px-3 py-2 w-full"/>
    )
}

export default Input;