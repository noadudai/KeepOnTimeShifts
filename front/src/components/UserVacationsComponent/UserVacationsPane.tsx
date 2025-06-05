import React, {useEffect, useState} from 'react';
import {HiOutlinePencil} from "react-icons/hi";
import {IoTrashOutline} from "react-icons/io5";
import {UserVacationsResponse} from "@noadudai/scheduler-backend-client/api.ts";
import {GetUserFutureVacationsPaginationModel} from "@noadudai/scheduler-backend-client";;
import {useQueryCurrentUserFutureVacations} from "../../apis.ts";

const UserVacationsPane = ({pageNumber, itemsPerPage}: { pageNumber: number, itemsPerPage: number }) => {
    const [vacations, setVacations] = useState<UserVacationsResponse | null>(null);

    const mutation = useQueryCurrentUserFutureVacations(
        (data) => setVacations(data),
        (error) => console.error("Error Fetching Dates:", error)
    );

    useEffect(() => {
        const paginationInformation: GetUserFutureVacationsPaginationModel = {page_number: pageNumber, num_vacations_in_page: itemsPerPage}
        mutation.mutate(paginationInformation);

    }, [pageNumber])


    return (
        <div className="flex flex-wrap justify-normal items-center gap-6 p-6">
            {vacations?.vacations?.map((range, index) => (
                <div
                    key={index}
                    className="flex justify-between bg-custom-soft-blue text-black p-2 gap-2 rounded-lg w-64 font-opensans"
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

export default UserVacationsPane;