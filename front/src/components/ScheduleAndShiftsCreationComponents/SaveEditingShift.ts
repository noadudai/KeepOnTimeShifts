import {Guid} from "guid-typescript";
import {ShiftMetadata} from "../ShiftsForNextWeek"


export const onSaveEditingShift = ({editingShiftStartTime, editingShiftEndTime, shiftInScheduleToUpdate, callBack} :
                            {editingShiftStartTime: Date, editingShiftEndTime: Date, shiftInScheduleToUpdate: ShiftMetadata, callBack: (shiftId: Guid, startTime: Date, endTime: Date) => void}) => {

    const newEditingStartTime = new Date(shiftInScheduleToUpdate.startTime);

    newEditingStartTime.setHours(editingShiftStartTime.getHours());
    newEditingStartTime.setMinutes(editingShiftStartTime.getMinutes());
    newEditingStartTime.setSeconds(0);
    newEditingStartTime.setMilliseconds(0);

    callBack(shiftInScheduleToUpdate.id, newEditingStartTime, editingShiftEndTime);

};