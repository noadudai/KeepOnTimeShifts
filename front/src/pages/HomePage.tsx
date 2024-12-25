import HomePageNavbar from "../components/HomePageNavbar.tsx";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import envs from '../../my_envs.json';

const HomePage = () => {
    const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    const getHttpReqFromProtectedApiEndPoint = async () => {
        try {
            const frontUrl = envs.envs["REACT_APP_MY_APP_SERVER_URL"];
            const token = await getAccessTokenSilently();
            const response = await axios.get(`${frontUrl}/data/hello`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <HomePageNavbar />
            {!isAuthenticated ? (
                <button onClick={ () => loginWithRedirect()}>Log In</button>
            ) : (
                <div className="grid ">
                    <button onClick={() => logout({ returnTo: envs.envs["REACT_APP_URL"] })}>Log Out</button>

                    <button onClick={getHttpReqFromProtectedApiEndPoint}>Fetch Protected Data</button>
                    <p>Logged in as: {user?.name}</p>
                </div>
            )}
        </div>
    );
}

export default HomePage;
