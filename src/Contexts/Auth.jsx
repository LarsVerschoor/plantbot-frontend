import { createContext, useEffect, useState } from "react";
const URL = import.meta.env.VITE_BACKEND_URL
const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('jwt')));
    const [verificationEmail, setVerificationEmail] = useState(JSON.parse(localStorage.getItem('verificationEmail')));

    useEffect(() => {
        localStorage.setItem('jwt', JSON.stringify(token));
    }, [token]);

    useEffect(() => {
        localStorage.setItem('verificationEmail', JSON.stringify(verificationEmail));
    }, [verificationEmail]);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${URL}/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const responseData = await response.json();

            if (response.status !== 200) throw new Error(responseData?.error || 'Login failed');

            const token = responseData?.token;
            if (!token) throw new Error('Login failed');
            setToken(token);
            return { success: true }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const register = async (email, password) => {
        try {
            const response = await fetch(`${URL}/register`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const responseData = await response.json();

            if (response.status !== 201) throw new Error(responseData?.error || 'Registration failed');
            const registeredEmail = responseData?.email;
            if (!registeredEmail) throw new Error('Registration failed');
            setVerificationEmail(registeredEmail);
            return { success: true }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const verify = async (code, email) => {
        try {
            const response = await fetch(`${URL}/verify`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    code,
                    email
                })
            });

            const responseData = await response.json();

            if (response.status !== 200) throw new Error(responseData?.error || 'Verification failed');
            const token = responseData?.token;
            if (!token) throw new Error('Verification failed');
            setToken(token);
            setVerificationEmail(null)
            return { success: true }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const cancelVerification = () => {
        setVerificationEmail(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, register, verificationEmail, verify, cancelVerification }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
};