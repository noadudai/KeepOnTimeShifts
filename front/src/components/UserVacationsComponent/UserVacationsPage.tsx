import {useState} from 'react';
import Pagination from "../Pagination.tsx";
import UserVacationsPane from "./UserVacationsPane.tsx";
import {useQueryCurrentUserFutureVacations} from "../../apis.ts";
import {UserVacationModel} from "@noadudai/scheduler-backend-client/api.ts";


const UserVacationsPage = () => {

    const [itemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

    const vacations = useQueryCurrentUserFutureVacations();
    const indexVacationPage = (currentPage - 1) * itemsPerPage;

    const sortedVacations = vacations.data?.vacations?.sort((a, b) => {
        const dateA = new Date(a.startDate ?? 0).getTime();
        const dateB = new Date(b.startDate ?? 0).getTime();
        return dateA - dateB;
    })

    const paneVacations: UserVacationModel[] | undefined = sortedVacations?.slice(indexVacationPage, indexVacationPage + itemsPerPage);

    return (
        <div>
            <div>
                <UserVacationsPane paneVacations={paneVacations} />
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={vacations?.data?.vacations?.length || 0}
                    currentPage={currentPage}
                    onPageChange={(pageNumber: number) => setCurrentPage(pageNumber)}/>
            </div>
        </div>
    )
};

export default UserVacationsPage;