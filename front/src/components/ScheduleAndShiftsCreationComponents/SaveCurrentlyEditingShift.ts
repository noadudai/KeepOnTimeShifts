import {ShiftDataToSave} from "./Types.ts";


export const saveCurrentlyEditingShift = (editingShiftDataToSave: ShiftDataToSave) => {

    const newEditingStartTime = new Date(editingShiftDataToSave.shiftInScheduleToUpdate.startTime);

    newEditingStartTime.setHours(editingShiftDataToSave.editingShiftStartTime.getHours());
    newEditingStartTime.setMinutes(editingShiftDataToSave.editingShiftStartTime.getMinutes());
    newEditingStartTime.setSeconds(0);
    newEditingStartTime.setMilliseconds(0);

    editingShiftDataToSave.callBack(editingShiftDataToSave.shiftInScheduleToUpdate.id, newEditingStartTime, editingShiftDataToSave.editingShiftEndTime);

};