import {Link} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import { FaRegUserCircle } from "react-icons/fa";

export const AdminsPanelNavbar = () => {
    const { logout } = useAuth0();

    return (
        <div>
            <nav className="bg-green-400 rounded-sm shadow-sm">
                <div className="flex items-center justify-between p-1">
                    <button className="group h-10 w-10 rounded-md  hover:bg-green-500">
                        <div className="grid justify-items-center gap-1.5">
                            <div className="bg-lime-950 hover:bg-green-900 h-1 w-8 rounded-full"></div>
                            <div className="bg-lime-950 hover:bg-green-900 h-1 w-8 rounded-full"></div>
                            <div className="bg-lime-950 hover:bg-green-900 h-1 w-8 rounded-full"></div>
                        </div>
                    </button>
                    <div className="flex items-center pl-8 p-2 shadow-sms">
                        <Link to="/" className="text-4xl text-green-950">Keep On Time Shifts</Link>
                    </div>
                    <div className="flex items-center gap-2 p-2 justify-between">
                        <h1>Name</h1>
                        <button onClick={() => logout({returnTo: "http://localhost:5173/info/"})}
                                className="text-custom-cream2 rounded-lg">
                            <FaRegUserCircle size={25}/>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

