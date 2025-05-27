import axios from "axios";
import {
    UserScheduleRequestApi,
    UserDateRangePreferenceRequestModel,
} from "@noadudai/scheduler-backend-client/api.ts";
import {useMutation} from "@tanstack/react-query";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import {OneVacationDateRangeModel, UserVacationsResponse} from "@noadudai/scheduler-backend-client";
import DatePicker from "react-calendar";

const VacationsByMonth = (isVacationAdded: boolean) => {
    const {getAccessTokenSilently} = useAuth0();

    const [vacations, setVacations] = useState<UserVacationsResponse | null>(null);

    const ax = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`,
    });

    const userSchedulePreferenceRequestApi: UserScheduleRequestApi = new UserScheduleRequestApi(undefined, undefined, ax);

    const userSchedulePrefReqPostRequest = useMutation({
        mutationFn: async () =>
        {
            const token = await getAccessTokenSilently();


            const response = await userSchedulePreferenceRequestApi.userSchedulePreferencesRequestVacationsByDateRangePost({
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

    const handleGetVacations = () => {
        userSchedulePrefReqPostRequest.mutate();
    }

    useEffect(() => {
        if (vacations === null) {
            handleGetVacations();
        }
    }, [isVacationAdded]);


    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {vacations ? (vacations?.vacations?.map((range, index) => (
                    <span
                        key={index}
                        className="bg-blue-950/10 text-blue-950 px-4 py-1 rounded-lg"
                    >
                  {range.startDate === range.endDate ? new Date(range.startDate).toLocaleDateString() : `${new Date(range.startDate).toLocaleDateString()} - ${new Date(range.endDate).toLocaleDateString()}`}
                </span>
                ))) : null}
            </div>
        </div>
    )
}

export default VacationsByMonth;