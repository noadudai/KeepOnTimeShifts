import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from "./pages/HomePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ScheduleOptionsPage from "./pages/scheduleOptionsPage.tsx";
import {Auth0Provider} from "@auth0/auth0-react";
import envs from "../my_envs.json";

const MyRouts = () =>{
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="schedule-options" element={<ScheduleOptionsPage />} />
        </Routes>

    );
};

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Auth0Provider domain={envs.envs["REACT_APP_AUTH0_DOMAIN"]} clientId={envs.envs["REACT_APP_AUTH0_CLIENT_ID"]} authorizationParams={{ redirect_uri: envs.envs["REACT_APP_URL"],
         audience: envs.envs["REACT_APP_AUTH0_AUDIENCE"],}}>
            <MyRouts />
        </Auth0Provider>
    </BrowserRouter>

)

