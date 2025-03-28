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
                    <div className="text-4xl pb-2"> Vacations </div>
                    <div className="rounded-lg p-6 bg-emerald-100/30">
                        {/*{isAddNewVacOpen && <ThisMonthVacations showVacations={isShowVacationsOpen}/>}*/}
                        <VacationsPanel
                            onAddNewVacOpenPopup={() => setIsAddNewVacOpen(true)}
                            onShowVacations={() => setIsShowVacationsOpen(true)}/>
                    </div>
                </div>
            </div>
            {isAddNewVacOpen && (
                <AddNewVacationRequest onClose={() => {setIsAddNewVacOpen(false)}} />
            )}
        </div>
    );
}

export default HomePage;
