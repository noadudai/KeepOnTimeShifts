import {Guid} from "guid-typescript";


export const SHIFTTYPES = {MORNIGN: 'Morning', EVENING: 'Evening',  CLOSING: 'Closing'}  as const;
export type ShiftTypes = typeof SHIFTTYPES[keyof typeof SHIFTTYPES];


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
