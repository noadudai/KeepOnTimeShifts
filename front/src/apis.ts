import axios from "axios";
import {
    UserDateRangePreferenceRequestModel,
    UserScheduleRequestApi
} from "@noadudai/scheduler-backend-client/api.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useAuth0} from "@auth0/auth0-react";


const ax = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`,
});

const api = new UserScheduleRequestApi(undefined, undefined, ax);


export const useQueryCurrentUserFutureVacations = (dateRange: UserDateRangePreferenceRequestModel) => {
    const {getAccessTokenSilently} = useAuth0();

    return useQuery({
        queryKey: ["userFutureVacations", dateRange],
        queryFn: async () => {
            const token = await getAccessTokenSilently();

            const response = await api.userSchedulePreferencesRequestVacationsByDateRangePost(dateRange, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            return response.data;
        },
    });
}


export const useUserDateRangePreferenceRequest = ({onSuccessCallback}:
                                                  {onSuccessCallback: () => void}) => {
    const {getAccessTokenSilently} = useAuth0();
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: UserDateRangePreferenceRequestModel) => {
            const token = await getAccessTokenSilently();

            const response = await api.userSchedulePreferencesRequestDateRangePreferenceRequestPost(data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userFutureVacations'] });
            onSuccessCallback();
        }
    });
}

