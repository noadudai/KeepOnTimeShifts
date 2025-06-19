import {useState} from 'react';
import {useNavigate} from "react-router-dom"
import {adminPages} from "../pages/AdminPages/AdminPagesRecord.ts";

const AdminPageSideBar = () => {

    const [buttonClicked, setButtonClicked] = useState("overview");
    const navigate = useNavigate();

    const handleOnClick = (buttonName: string) => {
        setButtonClicked(buttonName.toLowerCase());
        const path = `/admin-panel/${buttonName.toLowerCase()}`;
        navigate(path);
    };

    const Page = (buttonName: string) =>
        <button
            className={`${buttonClicked === buttonName.toLowerCase() ? 'bg-custom-pastel-green/80' : 'bg-custom-pastel-green/50'} border border-custom-pastel-green p-2 text-center`}
            onClick={() => handleOnClick(buttonName)}
        >
            {buttonName}
        </button>;

    return (
        <div>
            <div className="flex flex-col">
                {Object.keys(adminPages).map((key: string) => Page(key))}
            </div>
        </div>
    );
};

export default AdminPageSideBar;