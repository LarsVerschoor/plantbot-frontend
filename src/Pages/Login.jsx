import AuthCard from "../Components/AuthCard.jsx";
import Button from "../Components/Button.jsx";
import Input from "../Components/Input.jsx";
import { useContext, useState } from "react";
import InternalLink from "../Components/InternalLink.jsx";
import { AuthContext } from "../Contexts/Auth.jsx";

function Login() {
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);

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
        const { email, password } = formData;
        const result = await login(email, password);
        if (!result.success) setError(result.message);
    }

    return (
        <AuthCard title="Log in to your account">
            <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="email">Email-address</label>
                    <Input id="email" name="email" type="text" value={formData.email} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Input id="password" name="password" type="password" value={formData.password}
                           onChange={handleInputChange}/>
                </div>
                {error &&
                    <p className="bg-red-200 border-2 border-red-900 text-red-900 rounded-md px-3 py-2 font-semibold">{error}</p>}
                <Button type="submit">Log in</Button>
                <div>Don't have an account? <InternalLink to="/register">Sign up</InternalLink></div>
            </form>
        </AuthCard>
    );
}

export default Login;