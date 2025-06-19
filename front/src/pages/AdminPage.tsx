import AdminPanelNavbar from "../components/AdminPanelNavbar.tsx";
import AdminPageSideBar from "../components/AdminPageSideBar.tsx";
import {useParams} from "react-router-dom";
import {adminPages} from "./AdminPages/AdminPagesRecord.ts";


const AdminPage = () => {
    const {'*': key} = useParams();

    const validKey = key && key in adminPages ? key : 'overview';

    const InnerComponent = adminPages[validKey];

    return (
        <div>
            <AdminPanelNavbar/>
            <div className="justify-items-center">
                <div className="w-2/3 m-20 min-h-64 rounded-xl bg-white grid grid-cols-5">
                    <div className="col-span-1">
                        <AdminPageSideBar/>
                    </div>
                    <div className="col-span-4 bg-custom-pastel-green/">
                        <InnerComponent/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;