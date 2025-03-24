import HomePageNavbar from "../components/HomePageNavbar.tsx";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {UserApi} from "@noadudai/scheduler-backend-test/api.ts"
import {useEffect, useState} from "react";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';



export const TestOpenApiSchemaPackage = () => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <CallingTestOpenApiSchemaPackage />
        </QueryClientProvider>
    )
}
export const CallingTestOpenApiSchemaPackage = () => {

    const { user, getAccessTokenSilently } = useAuth0();

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const accessToken = await getAccessTokenSilently();
            setToken(accessToken);
        };

        fetchToken();
    }, [getAccessTokenSilently]);

    const ax = axios.create({
        baseURL: 'http://localhost:5029',
    });

    const userApi: UserApi = new UserApi(undefined, undefined, ax);

    const { isPending, data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const token = await getAccessTokenSilently();
            console.log("Awaiting:");
            const response = await userApi.usersGetUserGet({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Done Awaiting:");
            console.log("API Response:", response.data);
            return response.data;
        },

    });

    console.log(isPending);
    console.log(data);

    return (
        <div>
            <h1 className='text-xl text-black'>hello world</h1>
            <h1 className='text-xl text-black'>getting data: {isPending ? "retrieving" : "data ready"}</h1>
            <h1>User Id</h1>
            {isPending ? <p>Loading...</p> : <p>User ID: {data}</p>}
        </div>
    )
}

export default TestOpenApiSchemaPackage;
