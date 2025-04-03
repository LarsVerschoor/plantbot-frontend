import logo from "../assets/logo_plantbot_text.svg";

function AuthCard({ title, children }) {
    return (
        <div className="bg-white p-5 shadow-lg flex flex-col gap-5 rounded-md max-w-96">
            <div className="flex flex-col gap-1 items-center">
                <img src={logo} alt="PlantBot logo" className="max-w-full w-44"/>
                <div className="font-semibold text-center">{title}</div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

export default AuthCard;