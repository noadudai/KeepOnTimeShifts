import axios from "axios";
import {
    AddNewUserScheduleRequestApi,
    UserDateRangePreferenceRequestModel,
} from "@noadudai/scheduler-backend-client/api.ts";
import {useMutation} from "@tanstack/react-query";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import {OneVacationDateRangeModel, UserVacationsResponse} from "@noadudai/scheduler-backend-client";

const ThisMonthVacations = () => {
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

    useEffect(() => {
        handleGetVacationsByDateRange();
    });

    const handleGetVacationsByDateRange = () => {

        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const dateRangeModel: UserDateRangePreferenceRequestModel = {start_date: firstDay, end_date: lastDay};

        userSchedulePrefReqPostRequest.mutate(dateRangeModel);
    }

    return (
        <div className="flex flex-wrap gap-2">
            {/* Map through the vacation date ranges and render each */}
            {vacations?.vacations?.map((range, index) => (
                <span
                    key={index}
                    className="bg-yellow-300 text-gray-700 px-4 py-1 rounded-lg"
                >
              {`${range.startDate} - ${range.endDate}`}
            </span>
            ))}
        </div>
    )
}

export default ThisMonthVacations;