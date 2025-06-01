import {useAuth0} from "@auth0/auth0-react";
import { FaRegUserCircle } from "react-icons/fa";

export const HomePageNavbar = () => {
    const { logout } = useAuth0();

    return (
        <div>
            <nav className="bg-costume-pastel-green rounded-sm shadow-sm ">
                <div className="">
                    <div className="grid grid-rows-1 grid-cols-3 justify-items-center p-1">
                    <button>
                        <div className="grid justify-items-center gap-1">
                            <div className="bg-costume-cream  h-1 w-6 rounded-full"></div>
                            <div className="bg-costume-cream  h-1 w-6 rounded-full"></div>
                            <div className="bg-costume-cream h-1 w-6 rounded-full"></div>
                        </div>
                    </button>
                    <div className="flex items-center pl-8 p-2 shadow-sms">
                        <h1 className="text-4xl text-costume-cream font-opensans">Keep On Time Shifts</h1>
                    </div>
                    <button onClick={() => logout({returnTo: "http://localhost:5173/info/"})} className=" text-costume-cream font-medium  rounded-lg"><FaRegUserCircle size={25}/></button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

