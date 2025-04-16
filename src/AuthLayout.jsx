import { Outlet } from 'react-router';

function AuthLayout() {
    return (
        <div className="bg-gray-100">
            <main className="min-h-svh flex justify-center items-center">
                <Outlet/>
            </main>
        </div>
    )
}

export default AuthLayout;