import axios from "axios";
import {
    AddNewUserScheduleRequestApi,
    UserDateRangePreferenceRequestModel,
} from "@noadudai/scheduler-backend-client/api.ts";
import {useMutation} from "@tanstack/react-query";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import {OneVacationDateRangeModel, UserVacationsResponse} from "@noadudai/scheduler-backend-client";

const ThisMonthVacations = ({showVacations}: {showVacations: boolean }) => {
    const {getAccessTokenSilently} = useAuth0();

    const [vacations, setVacations] = useState<UserVacationsResponse | null>(null);

    const ax = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`,
    });

    const userSchedulePreferenceRequestApi: AddNewUserScheduleRequestApi = new AddNewUserScheduleRequestApi(undefined, undefined, ax);

    const userSchedulePrefReqPostRequest = useMutation({
        mutationFn: async (data: UserDateRangePreferenceRequestModel) =>
        {
            const token = await getAccessTokenSilently();


            const response = await userSchedulePreferenceRequestApi.userSchedulePreferencesRequestVacationsByDateRangePost(data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        },
        onSuccess: (vacations) => {
            setVacations(vacations);
        },
        onError: (error) => {
            console.error('Error fetching dates:', error);
        },
    });

    const handleGetVacationsByDateRange = () => {

        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const dateRangeModel: UserDateRangePreferenceRequestModel = {start_date: firstDay, end_date: lastDay};

        userSchedulePrefReqPostRequest.mutate(dateRangeModel);
    }

    useEffect(() => {
        if(showVacations) {
            handleGetVacationsByDateRange();
        }
    }, [showVacations]);


    return (
        <div className="flex flex-wrap gap-2">
            {vacations?.vacations?.map((range, index) => (
                <span
                    key={index}
                    className="bg-blue-950/10 text-blue-950 px-4 py-1 rounded-lg"
                >
              {range.startDate === range.endDate ? new Date(range.startDate).toLocaleDateString() : `${new Date(range.startDate).toLocaleDateString()} - ${new Date(range.endDate).toLocaleDateString()}`}
            </span>
            ))}
        </div>
    )
}

export default ThisMonthVacations;