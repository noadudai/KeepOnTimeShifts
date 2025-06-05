import axios from "axios";
import {
    UserDateRangePreferenceRequestModel,
    UserScheduleRequestApi,
    UserVacationsResponse
} from "@noadudai/scheduler-backend-client/api.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {GetUserFutureVacationsPaginationModel} from "@noadudai/scheduler-backend-client";
import {useAuth0} from "@auth0/auth0-react";


const ax = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`,
});

const api = new UserScheduleRequestApi(undefined, undefined, ax);


export const useQueryCurrentUserFutureVacations = (onSuccess: (data: UserVacationsResponse) => void,
                                                   onError?: (error) => void) => {
    const {getAccessTokenSilently} = useAuth0();


    return useMutation({
        mutationFn: async (data : GetUserFutureVacationsPaginationModel) =>
        {
            const token = await getAccessTokenSilently();

            const response = await api.userSchedulePreferencesRequestGetFutureVacationsPost(data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            return response.data;
        },
        onSuccess,
        onError,
    });
}


export const useUserDateRangePreferenceRequest = () => {
    const {getAccessTokenSilently} = useAuth0();

    return useMutation({
        mutationFn: async (data: UserDateRangePreferenceRequestModel) => {
            const token = await getAccessTokenSilently();

            const response = await api.userSchedulePreferencesRequestDateRangePreferenceRequestPost(data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response;
        }
    });
}



export const useCurrentUserFutureVacationsCount = (currentPage: number) => {
    const {getAccessTokenSilently} = useAuth0();

    return useQuery({
        queryKey: ["numFutureVacations", currentPage],
        queryFn: async () => {
            const token = await getAccessTokenSilently();

            const response = await api.userSchedulePreferencesRequestGetNumberOfFutureVacationsPost({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
    });
}

