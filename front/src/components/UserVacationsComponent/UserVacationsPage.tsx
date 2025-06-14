import {useState} from 'react';
import PageNavigator from "../PageNavigator.tsx";
import UserVacationsPane from "./UserVacationsPane.tsx";
import {useQueryCurrentUserFutureVacations} from "../../apis.ts";
import {UserVacationModel} from "@noadudai/scheduler-backend-client/api.ts";


const UserVacationsPage = () => {

    const [itemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

    const {isLoading, data} = useQueryCurrentUserFutureVacations();
    const indexVacationPage = (currentPage - 1) * itemsPerPage;

    const innerComponent = (innerText: string) => <div className="p-6">{innerText}</div>;

    if (isLoading) {
        return innerComponent("Loading Vacations...");
    } else {
        if (data && data.vacations && data.vacations.length !== 0) {
            const sortedVacations = data.vacations.sort((a, b) => {
                const dateA = new Date(a.startDate ?? 0).getTime();
                const dateB = new Date(b.startDate ?? 0).getTime();
                return dateA - dateB;
            });

            const paneVacations: UserVacationModel[] | undefined = sortedVacations?.slice(indexVacationPage, indexVacationPage + itemsPerPage);

            return (
                <div>
                    <UserVacationsPane paneVacations={paneVacations} />
                    <PageNavigator
                        itemsPerPage={itemsPerPage}
                        totalItems={data.vacations.length}
                        currentPage={currentPage}
                        onPageChange={(pageNumber: number) => setCurrentPage(pageNumber)}/>
                </div>
            );
        } else {
            return innerComponent("No Future Vacations");
        }
    }
};

export default UserVacationsPage;