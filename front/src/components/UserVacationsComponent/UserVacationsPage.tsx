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

    const paneVacations: UserVacationModel[] = vacations.data?.vacations?.slice(indexVacationPage, indexVacationPage + itemsPerPage) || [];

    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    };

    return (
        <div>
            <div>
                <UserVacationsPane paneVacations={paneVacations} />
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={vacations?.data?.vacations?.length || 1}
                    currentPage={currentPage}
                    onPageChange={changePage}/>
            </div>
        </div>
    )
};

export default UserVacationsPage;