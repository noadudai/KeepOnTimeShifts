import {HomePageNavbar} from "../components/HomePageNavbar.tsx";
import VacationsPanel from "../components/VacationsComponents/VacationsPanel.tsx";
import {useState} from "react";
import AddNewVacationRequest from "../components/VacationsComponents/AddNewVacationRequest.tsx";
import ThisMonthVacations from "../components/VacationsComponents/ThisMonthVacations.tsx";


const HomePage = () => {

    const [isAddNewVacOpen, setIsAddNewVacOpen] = useState(false);
    const [isShowVacationsOpen, setIsShowVacationsOpen] = useState(false);

    return (
        <div>
            <HomePageNavbar />
            <div className="grid ">

                <div className="m-20 p-6 border border-gray-200 rounded-lg">
                    <h1> Vacations </h1>
                    <div className="rounded-lg p-6 bg-green-200">
                        <>
                            <ThisMonthVacations/>
                        </>
                        <VacationsPanel onAddNewVacOpenPopup={() => setIsAddNewVacOpen(true)}/>
                    </div>
                </div>
            </div>
            {isAddNewVacOpen && (
                <AddNewVacationRequest onClose={() => {setIsAddNewVacOpen(false)}} />
            )}
            {isShowVacationsOpen && (
                <ThisMonthVacations/>
            )}
        </div>
    );
}

export default HomePage;
