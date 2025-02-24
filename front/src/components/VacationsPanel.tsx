const VacationsPanel = ({onAddNewVacOpenPopup} : {onAddNewVacOpenPopup: () => void}) => {
    return (
        <div className="flex justify-evenly">
            <button
                className="bg-green-300 text-green-950 font-medium text-xl border border-green-950 hover:bg-green-200 hover:text-green-900 px-4 py-5 rounded-lg">
                My Vacations
            </button>
            <button
                className="bg-green-300 text-green-950 font-medium text-xl border border-green-950 hover:bg-green-200 hover:text-green-900 px-4 py-5 rounded-lg"
                onClick={onAddNewVacOpenPopup}>
                Add A New Vacation
            </button>
        </div>
    )
};

export default VacationsPanel;