import {ShiftTypeLabel} from "./ShiftTypesAndTimeDisplayElements.tsx";
import {isSameDay} from "./SameDateCheck.ts";
import {ShiftTimePane} from "./ShiftTimePane.tsx";
import {TiPlus} from "react-icons/ti";
import {EditingShift, ShiftMetadata, ShiftTypes} from "./Types.ts";

export type ShiftScheduleGridProps = {
    shiftTypes: ShiftTypes[];
    nextWeeksDayDates: Date[];
    shiftsSchedule: ShiftMetadata[];
    setEditingShift: (shift: EditingShift | undefined) => void;
};

export const ShiftScheduleGrid = ({ shiftTypes, nextWeeksDayDates, shiftsSchedule, setEditingShift }: ShiftScheduleGridProps) => {
     return <>
        {shiftTypes.map((sType) => (
            <div key={sType} className="grid grid-cols-8 w-full h-full gap-4">
                <ShiftTypeLabel shiftType={sType} />
                {nextWeeksDayDates.map((date) => {
                    const shift = shiftsSchedule.find(s => s.shiftType === sType && isSameDay(s.startTime, date));

                    if (shift) {
                        const shiftEndTime = shift.endTime;
                        const shiftStartTime = shift.startTime;

                        // Indicates whether a shift is fully created (it has a defined end time). Since it starts with endTime = undefined and gets defined when the shift is ready/set
                        const isShiftReadyForSchedule = shiftEndTime !== undefined;
                        return(
                            <div  key={`${sType}-${date.toISOString()}`}>
                                <div
                                    className={`border border-gray-100 rounded-lg w-full h-20 flex justify-center items-center ${
                                        isShiftReadyForSchedule ? 'bg-custom-cream-warm' : 'bg-custom-cream'
                                    }`}
                                >
                                    {isShiftReadyForSchedule ?
                                        (
                                            <div className="flex flex-col gap-2">
                                                <ShiftTimePane dayClickedInWeek={date} timeToRender={shiftStartTime} label={"Starts"}/>
                                                <ShiftTimePane dayClickedInWeek={date} timeToRender={shiftEndTime} label={"Ends"}/>
                                            </div>
                                        ) :
                                        (
                                            <button className="text-custom-pastel-green"
                                                    onClick={() => {setEditingShift({id: shift.id, startTime: shiftStartTime, endTime: shiftEndTime})}}>
                                                <TiPlus size={35}/>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        ))}
    </>};