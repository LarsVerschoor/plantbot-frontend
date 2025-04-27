import Input from "../Components/Input.jsx";
import Button from "../Components/Button.jsx";
import Message from "../Components/Message.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/Auth.jsx";

const URL = import.meta.env.VITE_BACKEND_URL

function Chat() {
    const { token } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        question: ''
    });

    const [chatHistory, setChatHistory] = useState([]);
    const [streaming, setStreaming] = useState(null);

    const [error, setError] = useState(null);

    useEffect(() => {
        if (streaming === null) return;
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
        console.log('scroll')
    }, [streaming]);

    const handleInputChange = (event) => {
        setError(null);
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { question } = formData;
            const updatedHistory = [
                ...chatHistory,
                ['human', question]
            ]
            setChatHistory(updatedHistory);
            setFormData({ question: '' });
            setStreaming('');
            const response = await fetch(`${URL}/chat`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    chatHistory: updatedHistory
                })
            });
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let endResult = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                endResult += chunk;
                setStreaming(endResult);
                console.log(chunk);
            }
            setChatHistory((prevState) => ([
                ...prevState,
                ['assistant', endResult ?? 'Failed to generate a response']
            ]));
            setStreaming(null);
        } catch (error) {
            setChatHistory((prevState) => ([
                ...prevState,
                ['assistant', 'Failed to generate a response']
            ]));
            setStreaming(null);
        }
    }

    return (
        <div className="flex flex-col gap-5 flex-1 max-w-2xl mx-auto w-full">
            {/* Messages */}
            <div className="flex flex-col gap-5 flex-1">
                {
                    chatHistory.map((chat, index) => (
                        <Message from={chat[0]} key={index}>{chat[1]}</Message>
                    ))
                }
                {
                    typeof streaming === 'string' && <Message from="assistant">{streaming || 'Loading...'}</Message>
                }
            </div>

            {/* Question form */}
            <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <Input id="question" name="question" type="text" value={formData.question} placeholder="Ask AI about your plants!" onChange={handleInputChange}/>
                <Button type="submit" disabled={streaming || formData.question === ''}>Ask</Button>
            </form>
        </div>
    );
}

export default Chat;