import ThisMonthVacations from "./ThisMonthVacations.tsx";

const VacationsPanel = ({onAddNewVacOpenPopup} : {onAddNewVacOpenPopup: () => void}) => {
    return (
        <div className="flex justify-between">
            <button
                className="bg-green-300 text-green-950 font-medium text-xl border hover:bg-green-400 hover:text-green-900 px-4 py-5 rounded-lg">
                onClick={ThisMonthVacations}
                My Vacations
            </button>
            <button
                className="bg-green-300 text-green-950 font-medium text-xl border  hover:bg-green-400 hover:text-green-900 px-4 py-5 rounded-lg"
                onClick={onAddNewVacOpenPopup}>
                Add A New Vacation
            </button>
        </div>
    )
};

export default VacationsPanel;