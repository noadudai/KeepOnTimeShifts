import {ScheduleModel, ShiftModel} from "@noadudai/scheduler-backend-client";

type isThereAScheduleForNextWeekProps = {
    schedule: {shifts: ShiftModel[], schedule: ScheduleModel | null},
    nextWeeksDayDates: Date[]
};

export const isThereAScheduleForNextWeek = ({schedule, nextWeeksDayDates} : isThereAScheduleForNextWeekProps) => {

    // .some on empty array returns true
    return schedule.shifts.every((shift: ShiftModel) => {
        if (!shift) return false;
        const shiftDate = new Date(shift.shiftStartTime);
        return nextWeeksDayDates.some(dateInNextWeek =>
            shiftDate.toDateString() === dateInNextWeek.toDateString()
        );
    });
};