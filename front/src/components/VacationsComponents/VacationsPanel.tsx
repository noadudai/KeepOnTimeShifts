import ThisMonthVacations from "./ThisMonthVacations.tsx";
import {useState} from "react";

const VacationsPanel = ({onAddNewVacOpenPopup} : {onAddNewVacOpenPopup: () => void}) => {
    const [isShowVacations, setIsShowVacationsOpen] = useState<boolean>(false);
    const [isEditVacations, setIsEditVacations] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-4">
            {isShowVacations && <div className="order-1"> <ThisMonthVacations showVacations={isShowVacations}/> </div>}
            <div className="flex order-2 gap-4">
                <button
                    className="bg-green-950 text-white font-medium text-xl hover:bg-green-950/90 hover:text-white px-4 py-5 rounded-lg"
                    onClick={onAddNewVacOpenPopup}>
                    Add A New Vacation
                </button>
                <button
                    className=" bg-green-950/40 text-teal-950 font-medium text-xl hover:bg-green-950/50 px-4 py-5 rounded-lg"
                    onClick={() => !isShowVacations ? setIsShowVacationsOpen(true) : setIsEditVacations(true)}>
                    {!isShowVacations ? "My Vacations" : "Edit vacations"}
                </button>
            </div>
        </div>
    )
};

export default VacationsPanel;