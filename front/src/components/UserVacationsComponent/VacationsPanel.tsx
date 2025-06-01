import {useState} from "react";
import AddNewVacationRequest from "./AddNewVacationRequest.tsx";
import { IoIosAdd, IoMdTime } from "react-icons/io";
import { IoBan } from "react-icons/io5";
import { BiCheckCircle } from "react-icons/bi";
import ShowUserVacations from "./ShowUserVacations.tsx";


const VacationsPanel = () => {

    const [isAddNewVacOpen, setIsAddNewVacOpen] = useState(false);

    return (
        <div className="">
            <h1 className="flex justify-center text-2xl font-opensans">My Vacations</h1>
            <ShowUserVacations />
            <div className="flex justify-between ">
                <div className="place-self-start flex gap-1 p-2">
                    <div className="flex items-center bg-costume-pastel-green text-xs text-black gap-2 rounded-xl p-2">
                        <BiCheckCircle size={20}/>
                        <h1 className="font-opensans">Approved</h1>
                    </div>
                    <div className="flex items-center bg-costume-soft-blue text-xs text-black gap-2 rounded-xl p-2">
                        <IoMdTime size={20}/>
                        <h1 className="font-opensans">Pending</h1>
                    </div>
                    <div
                        className="flex items-center bg-costume-warm-coral-pink text-xs text-black gap-2 rounded-xl p-2">
                        <IoBan size={18}/>
                        <h1 className="font-opensans">Denied</h1>
                    </div>
                </div>
                <button
                    className="bg-costume-soft-blue text-custom-cream rounded-full mb-2 mr-2"
                    onClick={() => setIsAddNewVacOpen(true)}>
                    <IoIosAdd size={45}/>
                </button>
            </div>
            {isAddNewVacOpen && (
                <AddNewVacationRequest onClose={() => {
                    setIsAddNewVacOpen(false)
                }}/>
            )}
        </div>
    )
};

export default VacationsPanel;