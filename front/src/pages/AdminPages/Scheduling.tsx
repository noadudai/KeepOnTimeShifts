import WeeklyShiftCreatorPanel from "../../components/WeeklyShiftCreatorPanel.tsx";
import {useState} from "react";
import {Guid} from "guid-typescript";
import {ShiftMetadata, AllShiftTypes} from "../../components/ScheduleAndShiftsCreationComponents/Types.ts";
import {ScheduleModel} from "@noadudai/scheduler-backend-client";
import {useCreateNewShiftsSchedule} from "../../apis.ts";
import {DAYS} from "../../components/ScheduleAndShiftsCreationComponents/Days.ts";

type ShiftMetadataWithEndDate = ShiftMetadata & {endDateAndTime: Date};

const Scheduling = () => {
    const daysInWeek: number = 7;
    const today: Date = new Date();
    const nextSunday = daysInWeek - today.getDay();
    const nextWeeksDayDates: Date[] = Array.from({length: daysInWeek}, (_, i) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + nextSunday + i));
    const [scheduleSaved, setScheduleSaved] = useState<boolean>(false);

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
        const data: ScheduleModel = {shifts: shiftsForMutation.map((shift) =>
                ({
                    shiftStartTime: shift.startDateAndTime.toISOString(),
                    shiftEndTime: shift.endDateAndTime.toISOString(),
                    shiftType: shift.shiftType
                }))};

        mutation.mutate(data);

        setIsCreatingShiftsOpen(false);
        setScheduleSaved(true);
    } : undefined);

    const todayIsWednesday = today.getDay() < DAYS.WEDNESDAY;
    const todayIsNotYetWednesday = today.getDay() < DAYS.WEDNESDAY;

    return (
        <div className="flex items-center justify-center gap-4 p-2">
            <div className="p-5 group relative">
                <button
                    className={`rounded-lg bg-custom-cream-warm group-hover:bg-custom-cream-warm/80 transition-colors p-4 border-2 
                        ${scheduleSaved ? `border-custom-pastel-green`
                            : todayIsNotYetWednesday ? `border-orange-400`
                            : todayIsWednesday ? `border-custom-warm-coral-pink`
                                : ``}`}
                    onClick={() => setIsCreatingShiftsOpen(true)}>
                    Next Week's Shifts
                </button>
                <div className="opacity-0 group-hover:opacity-100 transition-all">
                    {todayIsNotYetWednesday ? "Create next week's shifts" : todayIsWednesday ? "Last day to create next week's shifts" : ""}
                </div>
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