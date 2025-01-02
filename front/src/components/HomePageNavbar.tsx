import envs from "../../my_envs.json";
import {useAuth0} from "@auth0/auth0-react";

const HomePageNavbar = () => {
    const { logout } = useAuth0();

    return (
        <div>
            <nav className="bg-green-400 rounded-sm shadow-sm">
                <div className="flex items-center justify-between p-1">
                    <button className="group h-10 w-10 rounded-md border border-lime-950 hover:bg-green-300">
                        <div className="grid justify-items-center gap-1.5">
                            <div className="bg-lime-950 hover:bg-green-900 h-1 w-8 rounded-full"></div>
                            <div className="bg-lime-950 hover:bg-green-900 h-1 w-8 rounded-full"></div>
                            <div className="bg-lime-950 hover:bg-green-900 h-1 w-8 rounded-full"></div>
                        </div>
                    </button>
                    <div className="flex items-center pl-8 p-2 shadow-sms">
                        <h1 className="text-4xl text-green-950">Keep On Time Shifts</h1>
                    </div>
                    <button onClick={() => logout({returnTo: envs.envs["REACT_APP_URL"]})} className="bg-green-300 text-green-950 font-medium border border-green-950 hover:bg-green-200 hover:text-green-900 px-3 py-2 mx-0.5 rounded-lg">Log Out</button>
                </div>
            </nav>
        </div>
    );
}

export default HomePageNavbar;