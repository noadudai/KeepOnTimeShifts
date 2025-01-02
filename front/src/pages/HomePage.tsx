import HomePageNavbar from "../components/HomePageNavbar.tsx";
import {useAuth0} from "@auth0/auth0-react";


const HomePage = () => {
    const { user } = useAuth0();

    return (
        <div>
            <HomePageNavbar />
            <div className="grid ">
                <p>Logged in as: {user?.name}</p>
            </div>
        </div>
    );
}

export default HomePage;
