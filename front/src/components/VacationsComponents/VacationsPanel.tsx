import VacationsByMonth from "./VacationsByMonth.tsx";
import {useState} from "react";

const VacationsPanel = ({onAddNewVacationOpenPopup} : {onAddNewVacationOpenPopup: () => void}) => {
    const [isShowVacations, setIsShowVacationsOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-4">
            {isShowVacations && <VacationsByMonth />}
            <div className="flex order-2 gap-4">
                <button
                    className="bg-green-950 text-white font-medium text-xl hover:bg-green-950/90 hover:text-white px-4 py-5 rounded-lg"
                    onClick={onAddNewVacationOpenPopup}>
                    Add A New Vacation
                </button>
                <button
                    className=" bg-green-950/40 text-teal-950 font-medium text-xl hover:bg-green-950/50 px-4 py-5 rounded-lg"
                    onClick={() => setIsShowVacationsOpen(!isShowVacations)}>
                    {!isShowVacations ? "My Vacations" : "Hide Vacations"}
                </button>
            </div>
        </div>
    )
};

export default VacationsPanel;