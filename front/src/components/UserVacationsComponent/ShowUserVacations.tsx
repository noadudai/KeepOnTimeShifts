import React, {useEffect, useState} from 'react';
import {UserVacationsResponse, UserScheduleRequestApi} from "@noadudai/scheduler-backend-client/api";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {useMutation} from "@tanstack/react-query";
import { IoTrashOutline } from "react-icons/io5";
import { HiOutlinePencil } from "react-icons/hi";
import Pagination from "../Pagination.tsx";
import {GetUserFutureVacationsPaginationModel} from "@noadudai/scheduler-backend-client";
import GetPagesUserVacations from "./GetPagesUserVacations.tsx";


const ShowUserVacations = () => {
    const {getAccessTokenSilently} = useAuth0();

    const [itemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumberOfVacations, setTotalNumberOfVacations] = useState(1);

    const ax = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`,
    });

    const userSchedulePreferenceRequestApi: UserScheduleRequestApi = new UserScheduleRequestApi(undefined, undefined, ax);

    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    };

    const userSchedulePrefReqPostRequestNumberVacations = useMutation({
        mutationFn: async () =>
        {
            const token = await getAccessTokenSilently();

            const response = await userSchedulePreferenceRequestApi.userSchedulePreferencesRequestGetNumberOfFutureVacationsPost({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        },
        onSuccess: (numVacations) => {
            setTotalNumberOfVacations(numVacations);
        },
        onError: (error) => {
            console.error('Error fetching number of vacations:', error);
        },
    });

    const handleGetVacations = () => {
        userSchedulePrefReqPostRequestNumberVacations.mutate();
    }

    useEffect(() => {
            handleGetVacations();
    }, [currentPage]);


    return (
        <div>
            <div>
                <GetPagesUserVacations pageNumber={currentPage} itemsPerPage={itemsPerPage} />
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={totalNumberOfVacations}
                    currentPage={currentPage}
                    onPageChange={changePage}/>
            </div>
        </div>
    )
};

export default ShowUserVacations;