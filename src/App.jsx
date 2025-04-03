import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Pages/Home.jsx";
import AuthLayout from "./AuthLayout.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Verify from "./Pages/Verify.jsx";
import { AuthProvider } from "./Contexts/Auth.jsx";
import Plants from "./Pages/Plants.jsx";
import Plantbots from "./Pages/Plantbots.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/plants',
                element: <Plants/>
            },
            {
                path: '/plantbots',
                element: <Plantbots/>
            }
        ]
    },
    {
        element: <AuthLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/verify',
                element: <Verify/>
            }
        ]
    }
]);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    )
}

export default App
