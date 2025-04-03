import AuthCard from "../Components/AuthCard.jsx";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/Auth.jsx";
import Button from "../Components/Button.jsx";
import InternalLink from "../Components/InternalLink.jsx";

function Verify() {
    const navigate = useNavigate();
    const { verify, token, verificationEmail } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: ''
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        if (token !== null) {
            navigate('/');
            return;
        }

        if (verificationEmail === null) {
            navigate('/register');
        }
    }, []);

    useEffect(() => {
        if (token !== null) {
            navigate('/');
        }
    }, [token]);

    const handleInputChange = (event) => {
        setError(null);
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        if (Object.values(formData).every((value) => (value !== ''))) {
            document.querySelector('[type=submit]').focus();
        }

        for (const key in formData) {
            if (formData[key] === '') {
                document.getElementsByName(key)[0].focus();
                break;
            }
        }
    }, [formData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const code = Object.values(formData).join('');
        const result = await verify(code, verificationEmail);
        if (!result.success) setError(result.message);
    }

    return (
        <AuthCard title="Verify your e-mail address">
            <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="text-center">We have sent an e-mail with your verification code to <span
                    className="font-semibold">{verificationEmail}</span></div>
                <div className="flex gap-2 justify-center">
                    {
                        Object.keys(formData).map((key) => (
                            <input type="text" maxLength="1" id={key} key={key} name={key} value={formData[key]}
                                   onChange={handleInputChange}
                                   className="box-content w-ch-1 px-3 py-2 border-2 border-gray-300 outline-none rounded-md focus:border-green-600 focus:ring-0 text-center"/>
                        ))
                    }
                </div>
                {error && <p className="bg-red-200 border-2 border-red-900 text-red-900 rounded-md px-3 py-2 font-semibold">{error}</p>}
                <Button type="submit" id="submit">Verify</Button>
                <div>Already verified? <InternalLink to="/login">Log in</InternalLink> instead</div>
            </form>
        </AuthCard>
    );
}

export default Verify;