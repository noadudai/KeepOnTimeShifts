import AdminPanelNavbar from "../components/AdminPanelNavbar.tsx";
import AdminPageSideBar from "../components/AdminPageSideBar.tsx";
import {useParams} from "react-router-dom";
import {adminPages, isValidPage} from "./AdminPages/AdminPagesRecord.ts";


const AdminPage = () => {
    const {'*': pageName} = useParams();

    const validPageName = pageName ?? 'Overview';

    const InnerPageComponent = isValidPage(validPageName) ?
        adminPages[validPageName] : () => <p>Page Not Found</p>;

    return (
        <div>
            <AdminPanelNavbar/>
            <div className="justify-items-center">
                <div className="w-2/3 m-20 min-h-64 rounded-xl bg-white grid grid-cols-5">
                    <div className="col-span-1">
                        <AdminPageSideBar currentPage={validPageName}/>
                    </div>
                    <div className="col-span-4 bg-custom-pastel-green/">
                        <InnerPageComponent/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;