import React, {useEffect, useState} from 'react';
import {HiOutlinePencil} from "react-icons/hi";
import {IoTrashOutline} from "react-icons/io5";
import {UserScheduleRequestApi, UserVacationsResponse} from "@noadudai/scheduler-backend-client/api.ts";
import {useMutation} from "@tanstack/react-query";
import {GetUserFutureVacationsPaginationModel} from "@noadudai/scheduler-backend-client";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

const GetPagesUserVacations = ({pageNumber, itemsPerPage}: { pageNumber: number, itemsPerPage: number }) => {
    const {getAccessTokenSilently} = useAuth0();
    const [vacations, setVacations] = useState<UserVacationsResponse | null>(null);

    const ax = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`,
    });

    const userSchedulePreferenceRequestApi: UserScheduleRequestApi = new UserScheduleRequestApi(undefined, undefined, ax);

    useEffect(() => {
        const paginationInformation: GetUserFutureVacationsPaginationModel = {page_number: pageNumber, num_vacations_in_page: itemsPerPage}
        userSchedulePrefReqPostRequest.mutate(paginationInformation);

    }, [pageNumber])

    const userSchedulePrefReqPostRequest = useMutation({
        mutationFn: async (data : GetUserFutureVacationsPaginationModel) =>
        {
            const token = await getAccessTokenSilently();

            const response = await userSchedulePreferenceRequestApi.userSchedulePreferencesRequestGetFutureVacationsPost(data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
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


    return (
        <div className="flex flex-wrap justify-normal items-center gap-6 p-6">
            {vacations?.vacations?.map((range, index) => (
                <div
                    key={index}
                    className="flex justify-between bg-costume-soft-blue text-black p-2 gap-2 rounded-lg w-64 font-opensans"
                >
                    {range.startDate === range.endDate ? new Date(range.startDate).toLocaleDateString() : `${new Date(range.startDate).toLocaleDateString()} - ${new Date(range.endDate).toLocaleDateString()}`}
                    <div className="flex ">
                        <button className="relative -my-2 pl-2 border-l border-black hover:text-black/50">
                            <HiOutlinePencil size={20}/>
                        </button>
                        <button className="relative -my-2 ml-2 pl-2 border-l border-black hover:text-black/50">
                            <IoTrashOutline size={20}/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GetPagesUserVacations;