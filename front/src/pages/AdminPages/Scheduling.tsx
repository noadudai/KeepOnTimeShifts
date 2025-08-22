import WeeklyShiftPanel from "../../components/WeeklyShiftPanel.tsx";
import {useState} from "react";
import {Guid} from "guid-typescript";
import {
    ShiftMetadata,
    AllShiftTypes,
    ShiftMetadataWithEndDate
} from "../../components/ScheduleAndShiftsCreationComponents/Types.ts";
import {useCreateNewShiftsSchedule, useQueryAllSchedulesDescending} from "../../apis.ts";
import {CreateNewScheduleModel} from "@noadudai/scheduler-backend-client/dist/api";
import {getNextWeeksDates} from "../../components/ScheduleAndShiftsCreationComponents/NextWeeksDates.ts";
import { scheduleIsInGivenDateRange } from "../../components/ScheduleAndShiftsCreationComponents/ScheduleIsForNextWeekCheck.ts";
import {DAYS} from "../../components/ScheduleAndShiftsCreationComponents/Days.ts";

const Scheduling = () => {
    const nextWeeksDayDates: Date[] = getNextWeeksDates();
    const [isWeeklyShiftPanelOpen, setIsWeeklyShiftPanelOpen] = useState(false);

    const initialState: ShiftMetadata[] = Array.from(Object.values(AllShiftTypes), (type) => nextWeeksDayDates.map((date) => {
        return ({id: Guid.create(), shiftType:type, startDateAndTime: date, endDateAndTime: undefined});
    })).flat();
    const [shiftsSchedule, setShiftsSchedule] = useState<ShiftMetadata[]>(initialState);

    const {data: schedulesResponse} = useQueryAllSchedulesDescending();
    const schedules = schedulesResponse?.schedules ?? []; // the schedules from the api can be possibly null
    const ShiftsSchedules = schedules.map(schedule => ({ // the schedule's shifts from the api can be possibly null
        ...schedule,
        shifts: schedule.shifts ?? [],
    }));

    const isScheduleForNextWeek = ShiftsSchedules.length > 0 ? scheduleIsInGivenDateRange({schedules: ShiftsSchedules, dateRange:nextWeeksDayDates}) : undefined;

    const nextWeeksShifts: ShiftMetadata[] = isScheduleForNextWeek ? isScheduleForNextWeek.shifts.map((shift) =>
        {return {id: Guid.create(), shiftType: shift.shiftType, startDateAndTime: new Date(shift.shiftStartTime), endDateAndTime: new Date(shift.shiftEndTime)}}) : [];

    // Only the shifts that have a defined endDateAndTime, are shifts that the manager created for the schedule.
    const shiftHasEndDate = (shift: ShiftMetadata): shift is ShiftMetadataWithEndDate => {
        return shift.endDateAndTime !== undefined;
    };
    const shiftsForMutation: ShiftMetadataWithEndDate[] = shiftsSchedule.filter(shiftHasEndDate);

    const saveEditingShiftToSchedule = (shiftId: Guid, startDateAndTime: Date, endDateAndTime: Date) => {
        setShiftsSchedule(prev =>
            prev.map((shift) =>
                shift.id === shiftId ? { ...shift, startDateAndTime: startDateAndTime, endDateAndTime: endDateAndTime } : shift));
    };

    const mutation = useCreateNewShiftsSchedule();
    const submitShiftsSchedule = (shiftsForMutation.length > 0 ? () => {
        const data: CreateNewScheduleModel = {shifts: shiftsForMutation.map((shift) =>
                ({
                    shiftStartTime: shift.startDateAndTime.toISOString(),
                    shiftEndTime: shift.endDateAndTime.toISOString(),
                    shiftType: shift.shiftType
                }))};

        mutation.mutate(data);

        setIsWeeklyShiftPanelOpen(false);
    } : undefined);

    const today = new Date();
    const todayIsWednesday = today.getDay() == DAYS.WEDNESDAY;
    const todayIsNotYetWednesday = today.getDay() < DAYS.WEDNESDAY;

    return (
        <div className="flex items-center justify-center gap-4 p-2">
            <div className="p-5 group relative">
                <button
                    className={`rounded-lg bg-custom-cream-warm group-hover:bg-custom-cream-warm/80 transition-colors p-4 border-2
                        ${isScheduleForNextWeek ? `border-custom-pastel-green`
                            : todayIsNotYetWednesday ? `border-orange-400`
                            : todayIsWednesday ? `border-custom-warm-coral-pink`
                                : ``}`}
                    onClick={() => setIsWeeklyShiftPanelOpen(true)}>
                    Next Week's Shifts
                </button>
                <div className="opacity-0 group-hover:opacity-100 transition-all text-xs">
                    {isScheduleForNextWeek ? "" : todayIsNotYetWednesday ? "Create next week's shifts" : todayIsWednesday ? "Last day to create next week's shifts!!" : ""}
                </div>
            </div>

            {isWeeklyShiftPanelOpen && <WeeklyShiftPanel
                onClose={() => setIsWeeklyShiftPanelOpen(false)}
                saveEditingShiftToSchedule={saveEditingShiftToSchedule}
                shiftsSchedule={isScheduleForNextWeek ? nextWeeksShifts : shiftsSchedule}
                nextWeeksDayDates={nextWeeksDayDates}
                onSubmitSchedule={submitShiftsSchedule}
                mode={isScheduleForNextWeek ? "view" : "edit"}
                />
            }
        </div>
    );
};

export default Scheduling;