import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from "./pages/HomePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import InfoPage from "./pages/InfoPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

const MyRouts = () =>{
    return (
        <Routes>
            <Route path="info" element={<InfoPage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>

    );
};

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Auth0Provider domain={"dev-huo4anz1ojy6ggvy.us.auth0.com"} clientId={"XcdHJiAoJoq9CHvgxGPtykyuywWhaa4Y"} authorizationParams={{ redirect_uri: "http://localhost:5173/info/",
         audience: "https://UsersShiftsApi/",}}>
            <QueryClientProvider client={queryClient}>
                <MyRouts />
            </QueryClientProvider>
        </Auth0Provider>
    </BrowserRouter>

)

