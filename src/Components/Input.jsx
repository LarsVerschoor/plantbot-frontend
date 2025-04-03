function Input({ id, name, type, value, onChange }) {
    return (
        <input id={id} name={name} type={type} value={value} onChange={onChange}
               className="border-2 border-gray-400 outline-none focus:border-green-600 focus:ring-0 min-w-full rounded-md px-3 py-1.5"/>
    )
}

export default Input;