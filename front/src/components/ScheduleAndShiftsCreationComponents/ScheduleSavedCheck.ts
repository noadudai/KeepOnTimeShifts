import {ScheduleModel, ShiftModel} from "@noadudai/scheduler-backend-client";

type isScheduleSavedProps = {
    schedule: {shifts: ShiftModel[], schedule: ScheduleModel | null},
    nextWeeksDayDates: Date[]
};

export const isThereAScheduleForNextWeek = ({schedule, nextWeeksDayDates} : isScheduleSavedProps) => {

    // .some on empty array returns true
    return schedule.shifts.every((shift: ShiftModel) => {
        if (!shift) return false;
        const shiftDate = new Date(shift.shiftStartTime);
        return nextWeeksDayDates.some(dateInNextWeek =>
            shiftDate.toDateString() === dateInNextWeek.toDateString()
        );
    });
};