import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from "./pages/HomePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import InfoPage from "./pages/InfoPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();
const auth0Domain = "dev-huo4anz1ojy6ggvy.us.auth0.com";
const auth0ClientId = "XcdHJiAoJoq9CHvgxGPtykyuywWhaa4Y";
const auth0Audience = "https://UsersShiftsApi/";
const infoPageUrl = "http://localhost:5173/info/";

const AppRouts = () =>{
    return (
        <Routes>
            <Route path="info" element={<InfoPage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>

    );
};

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Auth0Provider domain={auth0Domain} clientId={auth0ClientId} authorizationParams={{ redirect_uri: infoPageUrl,
         audience: auth0Audience,}}>
            <QueryClientProvider client={queryClient}>
                <AppRouts />
            </QueryClientProvider>
        </Auth0Provider>
    </BrowserRouter>

)

