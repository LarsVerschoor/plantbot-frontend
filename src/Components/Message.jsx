function Message({ from, children }) {
    return (
        <div className={`rounded-b-3xl shadow-md w-max px-5 py-3 max-w-full md:max-w-xl ${from === 'human' ? 'bg-green-600 rounded-tl-3xl text-white ml-auto' : 'bg-white rounded-tr-3xl mr-auto'}`}>{children}</div>
    );
}

export default Message;