import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from "./pages/HomePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import InfoPage from "./pages/InfoPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

const AppRoutes = () =>{
    return (
        <Routes>
            <Route path="info" element={<InfoPage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>

    );
};

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>

    <BrowserRouter>
        <Auth0Provider domain={`${import.meta.env.VITE_AUTH0DOMAIN}`} clientId={`${import.meta.env.VITE_AUTH0CLIENTID}`} authorizationParams={{ redirect_uri: `${import.meta.env.VITE_HOMEPAGEURL}`,
         audience: `${import.meta.env.VITE_AUTH0AUDIENCE}`,}}>
                <div className="min-h-screen bg-custom-cream">
                    <AppRoutes/>
                </div>
        </Auth0Provider>
    </BrowserRouter>
    </QueryClientProvider>


)

