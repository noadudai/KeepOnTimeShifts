import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from "./pages/HomePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ScheduleOptionsPage from "./pages/scheduleOptionsPage.tsx";
import {Auth0Provider} from "@auth0/auth0-react";
import secrets from "../my_secrets.json";

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
        <Auth0Provider domain={secrets.secrets["REACT_APP_AUTH0_DOMAIN"]} clientId={secrets.secrets["REACT_APP_AUTH0_CLIENT_ID"]} authorizationParams={{ redirect_uri: secrets.secrets["REACT_APP_URL"],
         audience: secrets.secrets["REACT_APP_AUTH0_AUDIENCE"],}}>
            <MyRouts />
        </Auth0Provider>
    </BrowserRouter>

)

