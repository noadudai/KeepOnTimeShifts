import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {InfoPageNavBar} from "../components/InfoPageNavBar.tsx";
import {Link} from "react-router-dom";

const InfoPage = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();


    return (
        <div>
            <InfoPageNavBar isAuthenticated={isAuthenticated} loginWithRedirect={loginWithRedirect} />
            {!isAuthenticated && (
                <div className="justify-items-center">
                    <p className="text-center p-20 text-7xl">Hello!</p>
                </div>
            )}
        </div>
    )
};

export default InfoPage;