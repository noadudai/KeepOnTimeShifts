import {ScheduleModel, ShiftModel} from "@noadudai/scheduler-backend-client";

type scheduleIsForNextWeekProps = {
    schedules: {shifts: ShiftModel[], schedule: ScheduleModel | null}[],
    nextWeeksDayDates: Date[]
};

export const isShiftInNextWeek = ((shift: ShiftModel, nextWeeksDayDates: Date[]) => {
    const shiftDate = new Date(shift.shiftStartTime);
    return nextWeeksDayDates.some(dateInNextWeek =>
        shiftDate.toDateString() === dateInNextWeek.toDateString()
    );
});

export const scheduleIsForNextWeek = ({schedules, nextWeeksDayDates} : scheduleIsForNextWeekProps) => {
    return schedules.some((schedule) => {
        if (schedule.shifts.length == 0) return false;

        return schedule.shifts.every((shift: ShiftModel) => isShiftInNextWeek(shift, nextWeeksDayDates));
    });
};