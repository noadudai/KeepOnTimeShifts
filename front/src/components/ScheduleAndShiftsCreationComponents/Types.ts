import {Guid} from "guid-typescript";


export const ShiftTypes = {MORNIGN: 'Morning', EVENING: 'Evening',  CLOSING: 'Closing'}  as const;
export type AllShiftTypes = typeof ShiftTypes[keyof typeof ShiftTypes];


export type ShiftMetadata = {
    id: Guid;
    startDateAndTime: Date;
    endDateAndTime: Date | undefined;
    shiftType: AllShiftTypes;
};

export type EditingShift = {
    id: Guid;
    startDateAndTime?: Date;
    endDateAndTime?: Date;
};


