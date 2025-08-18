import WeeklyShiftCreatorPanel from "../../components/WeeklyShiftCreatorPanel.tsx";
import {useState} from "react";
import {Guid} from "guid-typescript";
import {ShiftMetadata, AllShiftTypes} from "../../components/ScheduleAndShiftsCreationComponents/Types.ts";
import {useCreateNewShiftsSchedule} from "../../apis.ts";
import {CreateNewScheduleModel} from "@noadudai/scheduler-backend-client/dist/api";

type ShiftMetadataWithEndDate = ShiftMetadata & {endDateAndTime: Date};

const Scheduling = () => {
    const daysInWeek: number = 7;
    const today: Date = new Date();
    const nextSunday = daysInWeek - today.getDay();
    const nextWeeksDayDates: Date[] = Array.from({length: daysInWeek}, (_, i) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + nextSunday + i));

    const initialState: ShiftMetadata[] = Array.from(Object.values(AllShiftTypes), (type) => nextWeeksDayDates.map((date) => {
        return ({id: Guid.create(), shiftType:type, startDateAndTime: date, endDateAndTime: undefined});
    })).flat();

    const [shiftsSchedule, setShiftsSchedule] = useState<ShiftMetadata[]>(initialState);

    // Only the shifts that have a defined endDateAndTime, are shifts that the manager created for the schedule.
    const shiftHasEndDate = (shift: ShiftMetadata): shift is ShiftMetadataWithEndDate => {
        return shift.endDateAndTime !== undefined;
    };
    const shiftsForMutation: ShiftMetadataWithEndDate[] = shiftsSchedule.filter(shiftHasEndDate);

    const [isCreatingShiftsOpen, setIsCreatingShiftsOpen] = useState(false);

    const saveEditingShiftToSchedule = (shiftId: Guid, startDateAndTime: Date, endDateAndTime: Date) => {
        setShiftsSchedule(prev =>
            prev.map((shift) =>
                shift.id === shiftId ? { ...shift, startDateAndTime: startDateAndTime, endDateAndTime: endDateAndTime } : shift));
    };

    const mutation = useCreateNewShiftsSchedule();

    const submitShiftsSchedule = (shiftsForMutation.length > 0 ? () => {
        const data: CreateNewScheduleModel = { shifts: shiftsForMutation.map((shift) =>
                ({
                    shiftStartTime: shift.startDateAndTime.toISOString(),
                    shiftEndTime: shift.endDateAndTime.toISOString(),
                    shiftType: shift.shiftType
                }))};

        mutation.mutate(data);

        setIsCreatingShiftsOpen(false);
        setShiftsSchedule(initialState)
    } : undefined);

    return (
        <div className="flex items-center justify-center gap-4 p-2">
            <div className="p-5">
                <button className="border rounded-lg bg-custom-cream-warm p-4"
                    onClick={() => setIsCreatingShiftsOpen(true)}>
                    Create Next Week's Shifts
                </button>
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