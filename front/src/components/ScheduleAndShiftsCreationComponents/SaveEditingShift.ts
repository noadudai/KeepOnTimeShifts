import {Guid} from "guid-typescript";
import {ShiftMetadata} from "../ShiftsForNextWeek"

export type ShiftDataToSave = {
    editingShiftStartTime: Date;
    editingShiftEndTime: Date;
    shiftInScheduleToUpdate: ShiftMetadata;
    callBack: (shiftId: Guid, startTime: Date, endTime: Date) => void;
}

export const saveEditingShift = (editingShiftDataToSave: ShiftDataToSave) => {

    const newEditingStartTime = new Date(editingShiftDataToSave.shiftInScheduleToUpdate.startTime);

    newEditingStartTime.setHours(editingShiftDataToSave.editingShiftStartTime.getHours());
    newEditingStartTime.setMinutes(editingShiftDataToSave.editingShiftStartTime.getMinutes());
    newEditingStartTime.setSeconds(0);
    newEditingStartTime.setMilliseconds(0);

    editingShiftDataToSave.callBack(editingShiftDataToSave.shiftInScheduleToUpdate.id, newEditingStartTime, editingShiftDataToSave.editingShiftEndTime);

};