import AdminPanelNavbar from "../components/AdminPanelNavbar.tsx";
import EmployeePendingRequests from "../components/EmployeePendingRequests.tsx";

const AdminPage = () => {
    return (
        <div>
            <AdminPanelNavbar/>
            <div className="grid justify-items-center">
                <div className="w-2/3 m-20 rounded-xl bg-white">
                    <EmployeePendingRequests/>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;