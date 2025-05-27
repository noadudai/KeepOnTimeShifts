import VacationsByMonth from "./VacationsByMonth.tsx";
import {useState} from "react";

const VacationsPanel = ({onAddNewVacationOpenPopup, isVacationAdded} : {onAddNewVacationOpenPopup: () => void; isVacationAdded: boolean}) => {

    return (
        <div className="flex flex-col gap-4">
            <VacationsByMonth isVacationAdded={isVacationAdded}/>
            <div className="flex order-2 gap-4">
                <button
                    className="bg-green-950 text-white font-medium text-xl hover:bg-green-950/90 hover:text-white px-4 py-5 rounded-lg"
                    onClick={onAddNewVacationOpenPopup}>
                    Add A New Vacation
                </button>
            </div>
        </div>
    )
};

export default VacationsPanel;