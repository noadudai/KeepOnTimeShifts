import AdminPanelNavbar from "../components/AdminPanelNavbar.tsx";
import AdminPageSideBar from "../components/AdminPageSideBar.tsx";
import {useParams} from "react-router-dom";
import Overview from "./AdminPages/Overview.tsx";
import Scheduling from "./AdminPages/Scheduling.tsx";
import Vacations from "./AdminPages/Vacations.tsx";
import Employees from "./AdminPages/Employees.tsx";


const AdminPage = () => {
    const {'*': key} = useParams();

    let innerComponent;

    switch (key) {
        case 'overview':
            innerComponent = <Overview />;
            break;
        case 'employees':
            innerComponent = <Employees />;
            break;
        case 'scheduling':
            innerComponent = <Scheduling />;
            break;
        case 'vacations':
            innerComponent = <Vacations />;
            break;
        default:
            innerComponent = <Overview />;
            break;
    }

    return (
        <div>
            <AdminPanelNavbar/>
            <div className="justify-items-center">
                <div className="w-2/3 m-20 min-h-64 rounded-xl bg-white grid grid-cols-5">
                    <div className="col-span-1">
                        <AdminPageSideBar/>
                    </div>
                    <div className="col-span-4 bg-custom-pastel-green/">
                        {innerComponent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;