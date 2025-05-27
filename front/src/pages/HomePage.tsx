import {HomePageNavbar} from "../components/HomePageNavbar.tsx";
import VacationsPanel from "../components/VacationsComponents/VacationsPanel.tsx";
import {useState} from "react";
import AddNewVacationRequest from "../components/VacationsComponents/AddNewVacationRequest.tsx";


const HomePage = () => {

    const [isAddNewVacationOpen, setIsAddNewVacationOpen] = useState(false);

    return (
        <div>
            <HomePageNavbar />
            <div className="grid ">

                <div className="m-20 p-6 border border-gray-200 rounded-lg">
                    <div className="text-4xl pb-2"> Vacations </div>
                    <div className="rounded-lg p-6 bg-emerald-100/30">
                        <VacationsPanel
                            onAddNewVacationOpenPopup= {() => setIsAddNewVacationOpen(true)}
                            isVacationAdded={isAddNewVacationOpen}
                        />
                    </div>
                </div>
            </div>
            {isAddNewVacationOpen && (
                <AddNewVacationRequest onClose={() => {setIsAddNewVacationOpen(false)}} />
            )}
        </div>
    );
}

export default HomePage;
