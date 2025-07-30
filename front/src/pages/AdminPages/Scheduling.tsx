import WeeklyShiftCreatorPanel from "../../components/WeeklyShiftCreatorPanel.tsx";
import {useState} from "react";
import {Guid} from "guid-typescript";
import {ShiftMetadata, SHIFTTYPES} from "../../components/ScheduleAndShiftsCreationComponents/Types.ts";
import {ScheduleModel} from "@noadudai/scheduler-backend-client";
import {useCreateNewShiftsSchedule} from "../../apis.ts";

const Scheduling = () => {
    const daysInWeek: number = 7;
    const today: Date = new Date();
    const nextSunday = daysInWeek - today.getDay();
    const nextWeeksDayDates: Date[] = Array.from({length: daysInWeek}, (_, i) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + nextSunday + i));

    const initialState: ShiftMetadata[] = Array.from(Object.values(SHIFTTYPES), (type) => nextWeeksDayDates.map((date) => {
        return ({id: Guid.create(), shiftType:type, startTime: date, endTime: undefined});
    })).flat();

    const [shiftsSchedule, setShiftsSchedule] = useState<ShiftMetadata[]>(initialState);
    const [isCreatingShiftsOpen, setIsCreatingShiftsOpen] = useState(false);

    const handleCreatingShiftsOpen = () => {
        setIsCreatingShiftsOpen(!isCreatingShiftsOpen);
    }

    const saveEditingShiftToSchedule = (shiftId: Guid, startTime: Date, endTime: Date) => {
        setShiftsSchedule(prev =>
            prev.map((shift) =>
                shift.id === shiftId ? { ...shift, startTime: startTime, endTime: endTime } : shift));
    };

    const mutation = useCreateNewShiftsSchedule();

    const submitShiftsSchedule = () => {
        // Only the shifts that have a defined endTime, are shifts that the manager created for the schedule.
        const shiftsForMutation = shiftsSchedule.filter((shift)  => shift.endTime !== undefined);

        if (shiftsForMutation.length > 0) {
            const data: ScheduleModel = {shifts: shiftsForMutation.map((shift) =>
                    ({
                        shiftStartTime: shift.startTime.toISOString(),
                        shiftEndTime: shift.endTime!.toISOString(),
                        shiftType: shift.shiftType
                    }))};

            mutation.mutate(data);
        }
        setIsCreatingShiftsOpen(!isCreatingShiftsOpen);
    };

    return (
        <div className="flex items-center justify-center gap-4 p-2">
            <div className="p-5">
                <button className="border rounded-lg bg-custom-cream-warm p-4"
                    onClick={handleCreatingShiftsOpen}>Create Next Week's Shifts</button>
                <button></button>
            </div>
            {isCreatingShiftsOpen && <WeeklyShiftCreatorPanel
                onClose={() => {setIsCreatingShiftsOpen(false)}}
                saveEditingShiftToSchedule={saveEditingShiftToSchedule}
                shiftsSchedule={shiftsSchedule}
                nextWeeksDayDates={nextWeeksDayDates}
                onSubmitSchedule={submitShiftsSchedule}/>}
        </div>
    );
};

export default Scheduling;