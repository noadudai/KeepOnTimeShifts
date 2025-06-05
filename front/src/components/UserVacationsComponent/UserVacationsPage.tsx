import {useState} from 'react';
import Pagination from "../Pagination.tsx";
import UserVacationsPane from "./UserVacationsPane.tsx";
import {useCurrentUserFutureVacationsCount} from "../../apis.ts";


const UserVacationsPage = () => {

    const [itemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    };

    const {data: numVacations} = useCurrentUserFutureVacationsCount(currentPage);

    return (
        <div>
            <div>
                <UserVacationsPane pageNumber={currentPage} itemsPerPage={itemsPerPage} />
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={numVacations || 1}
                    currentPage={currentPage}
                    onPageChange={changePage}/>
            </div>
        </div>
    )
};

export default UserVacationsPage;