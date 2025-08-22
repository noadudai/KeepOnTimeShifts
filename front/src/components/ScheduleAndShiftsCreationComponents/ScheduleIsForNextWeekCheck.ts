import {ScheduleModel, ShiftModel} from "@noadudai/scheduler-backend-client";

type scheduleIsForNextWeekProps = {
    schedule: {shifts: ShiftModel[], schedule: ScheduleModel | null},
    nextWeeksDayDates: Date[]
};

export const scheduleIsForNextWeek = ({schedule, nextWeeksDayDates} : scheduleIsForNextWeekProps) => {
    if (schedule.shifts.length == 0) return false;

    return schedule.shifts.every((shift: ShiftModel) => {
        const shiftDate = new Date(shift.shiftStartTime);
        return nextWeeksDayDates.some(dateInNextWeek =>
            shiftDate.toDateString() === dateInNextWeek.toDateString()
        );
    });
};