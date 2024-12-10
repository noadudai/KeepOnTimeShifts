import './App.css'
import {DefaultApi} from "@noadudai/noaservicescheduling/api";
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';


const ax = axios.create({
    baseURL: `http://localhost:8000/`
});


const api: DefaultApi = new DefaultApi(undefined, undefined, ax);
const queryClient = new QueryClient()

export const TestingOpenAPITypes = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CallApiWithAxiosAndUseQuery />
        </QueryClientProvider>
    )
}


export const CallApiWithAxiosAndUseQuery = () => {
    const { isPending, data } = useQuery({
        queryKey: ['schedules'],
        queryFn: () =>
            api.createAndGetScheduleOptionsCreateAndGetScheduleOptionsGet(),
    })

    console.log(isPending)

    const schedules = data &&
        data.data.schedules.map((scheduleData) => {return <div>
            {Object.entries(scheduleData.schedule).map(([shift, employee]) => (
                <p className="text-black">
                    {shift}: {employee}
                </p>))
            } </div>}
        );

    return (
        <div>
            <h1 className='text-xl text-black'>hello world</h1>
            <h1 className='text-xl text-black'>getting data: {isPending ? "retrieving" : "data ready"}</h1>
            {schedules && schedules[0]}
        </div>

    )
}





