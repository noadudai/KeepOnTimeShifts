import {LogoutOptions, useAuth0} from "@auth0/auth0-react";
import { FaRegUserCircle } from "react-icons/fa";
import HamburgerIcon from "./HamburgerIcon.tsx";

export const HomePageNavbar = () => {
    const { logout } = useAuth0();

    return (
        <div>
            <nav className="bg-custom-pastel-green rounded-sm shadow-sm ">
                <div className="grid grid-rows-1 grid-cols-3 justify-items-center p-1">
                <HamburgerIcon />
                <div className="flex items-center pl-8 p-2 shadow-sms">
                    <h1 className="text-4xl text-custom-cream font-opensans">Keep On Time Shifts</h1>
                </div>
                <button onClick={() => logout({returnTo: `${import.meta.env.VITE_INFOPAGEURL}`} as LogoutOptions)} className=" text-custom-cream font-medium  rounded-lg">
                    <FaRegUserCircle size={25}/>
                </button>
                </div>
            </nav>
        </div>
    );
}

