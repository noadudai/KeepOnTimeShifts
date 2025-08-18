import {ScheduleModel, ShiftModel} from "@noadudai/scheduler-backend-client";

type isScheduleSavedProps = {
    schedules: {shifts: ShiftModel[], schedule: ScheduleModel | null }[],
    nextWeeksDayDates: Date[]
};

export const isScheduleSaved = ({schedules, nextWeeksDayDates} : isScheduleSavedProps) => {
    return schedules.some(schedule => {
        const firstShift = schedule.shifts.at(0);
        if (!firstShift) return false;

        const shiftDate = new Date(firstShift.shiftStartTime);
        return nextWeeksDayDates.some(dateInNextWeek =>
            shiftDate.toDateString() === dateInNextWeek.toDateString()
        );
    });
};