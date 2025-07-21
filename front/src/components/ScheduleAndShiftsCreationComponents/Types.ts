import {Guid} from "guid-typescript";


export type ShiftTypes = 'Morning' | 'Evening' | 'Closing';

export type ShiftMetadata = {
    id: Guid;
    startTime: Date;
    endTime: Date | undefined;
    shiftType: ShiftTypes;
};

export type EditingShift = {
    id?: Guid;
    startTime?: Date;
    endTime?: Date;
};

export type ShiftDataToSave = {
    editingShiftStartTime: Date;
    editingShiftEndTime: Date;
    shiftInScheduleToUpdate: ShiftMetadata;
    callBack: (shiftId: Guid, startTime: Date, endTime: Date) => void;
}


export type ShiftsButtonsGroupProps = {
    shiftTypes: ShiftTypes[];
    nextWeeksDayDates: Date[];
    shiftsSchedule: ShiftMetadata[];
    setEditingShift: (shift: EditingShift | undefined) => void;
};

export type ShiftTimePaneProps = {
    dayClickedInWeek: Date;
    timeToRender: Date;
    label: string;
};

export type TimePickerAndLabelProps = {
    label: string;
    startTime?: Date;
    setTimeCallback: (date: Date) => void;
};