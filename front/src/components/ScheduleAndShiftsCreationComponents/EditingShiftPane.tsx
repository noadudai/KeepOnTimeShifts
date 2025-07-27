import {DateTimePickerAndLabel, TimePickerAndLabel} from "./TimeAndDatePickerComponents.tsx";
import {saveCurrentlyEditingShift} from "./SaveCurrentlyEditingShift.ts";
import {EditingShift, ShiftMetadata} from "./Types.ts";
import {Guid} from "guid-typescript";

export type EditingShiftPageProps = {
    editingShift: EditingShift;
    shiftsSchedule: ShiftMetadata[];
    saveEditingShiftCallBack: (id: Guid, start: Date, end: Date) => void;
    updateEditingShiftStartTime: (date: Date) => void;
    updateEditingShiftEndTime: (date: Date) => void;
}

export const EditingShiftPane = ({editingShift, shiftsSchedule, saveEditingShiftCallBack, updateEditingShiftStartTime, updateEditingShiftEndTime}: EditingShiftPageProps ) => {
    const StartAndEndTime = editingShift.startTime !== undefined && editingShift.endTime !== undefined;
    return (
        <>
            <div className="flex pt-64 justify-evenly inset-0 fixed items-center bg-black/5 backdrop-blur-sm">
                <div
                    className="bg-white border rounded-xl border-gray-200 p-6 flex flex-col gap-3 items-center">
                    <TimePickerAndLabel
                        label={"Set shift starting time "}
                        startTime={editingShift.startTime}
                        setTimeCallback={(date: Date) => updateEditingShiftStartTime(date)}
                    />
                    <DateTimePickerAndLabel
                        label={"Set shift ending shift "}
                        endTime={editingShift.endTime ?? new Date()} // show the end time or now
                        setEditShift={(date: Date) => updateEditingShiftEndTime(date)}
                    />
                    <button
                        className="disabled:bg-gray-300 disabled:text-gray-950 bg-custom-pastel-green p-2 text-center text-custom-cream rounded-xl items-center"
                        disabled={!StartAndEndTime}
                        onClick={() => {
                            const {id, startTime, endTime} = editingShift;
                            const shift = shiftsSchedule.find(s => s.id === id);

                            if (StartAndEndTime && shift) {
                                const editingShiftDataToSave = {
                                    editingShiftStartTime: startTime!,
                                    editingShiftEndTime: endTime!,
                                    shiftInScheduleToUpdate: shift,
                                    callBack: saveEditingShiftCallBack
                                };

                                saveCurrentlyEditingShift(editingShiftDataToSave);
                            }
                        }}>
                        Save
                    </button>
                </div>
            </div>
        </>)
};