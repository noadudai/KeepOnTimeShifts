import React, {useState} from "react";
import {CreateShiftsNavbar} from "../components/CreateShiftsNavbar.tsx";
import { IoMdTime } from "react-icons/io";
import CreateShiftsPanel from "../components/CreateShiftsPanel.tsx";

const AdminPage = () => {
    const [isCreateNewShiftsModalOpen, setIsCreateNewShiftsModalOpen] = useState(false);

    return (
        <div>
            <CreateShiftsNavbar/>
            <div className="grid justify-items-center p-4">
                <h1 className="text-black text-4xl">Hello Manager</h1>
                <div className="w-2/3 m-20 rounded-xl bg-white">
                    <button
                        className="border-4 border-yellow-200 rounded-xl p-6 gap-4 flex flex-col items-center justify-center"
                        onClick={() => setIsCreateNewShiftsModalOpen(true)}
                    >
                        <p className="text-black font-semibold">Next Week's Shifts</p>
                        <IoMdTime size={50}/>
                    </button>
                </div>
            </div>
            {isCreateNewShiftsModalOpen && (
                <CreateShiftsPanel onClose={() => {setIsCreateNewShiftsModalOpen(false)}}/>
            )}

        </div>
    );
}

export default AdminPage;
