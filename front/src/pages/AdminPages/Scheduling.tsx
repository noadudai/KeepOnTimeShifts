import WeeklyShiftCreatorPanel from "../../components/WeeklyShiftCreatorPanel.tsx";
import {useState} from "react";

const Scheduling = () => {
    const [isCreatingShiftsOpen, setIsCreatingShiftsOpen] = useState(false);

    const handleCreatingShiftsOpen = () => {
        setIsCreatingShiftsOpen(!isCreatingShiftsOpen);
    }

    return (
        <div className="flex items-center justify-center gap-4 p-2">
            <div className="p-5">
                <button className="border rounded-lg bg-custom-cream-warm p-4"
                    onClick={handleCreatingShiftsOpen}>Create Next Week's Shifts</button>
                <button></button>
            </div>
            {isCreatingShiftsOpen && <WeeklyShiftCreatorPanel onClose={() => {
                setIsCreatingShiftsOpen(false)
            }}/>}
        </div>
    );
};

export default Scheduling;