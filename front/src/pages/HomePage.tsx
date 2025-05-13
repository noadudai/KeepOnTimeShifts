import {HomePageNavbar} from "../components/HomePageNavbar.tsx";
import VacationsPanel from "../components/VacationsPanel.tsx";
import {useState} from "react";
import AddNewVacationRequest from "../components/AddNewVacationRequest.tsx";


const HomePage = () => {

    const [isAddNewVacOpen, setIsAddNewVacOpen] = useState(false);

    return (
        <div className="relative">
            <HomePageNavbar />
            <div className="grid">
                <div className="m-20 p-6 border border-gray-200 rounded-lg bg-gray-100">
                    <VacationsPanel onAddNewVacOpenPopup={() => setIsAddNewVacOpen(true)} />
                </div>
            </div>
            {isAddNewVacOpen && (
                <AddNewVacationRequest onClose={() => {setIsAddNewVacOpen(false)}} />
            )}
        </div>
    );
}

export default HomePage;
