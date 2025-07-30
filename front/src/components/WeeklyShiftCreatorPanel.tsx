import {useState} from 'react';
import {IoIosCheckmark} from "react-icons/io";
import {Guid} from "guid-typescript";
import {ShiftScheduleGrid} from "./ScheduleAndShiftsCreationComponents/ShiftScheduleGrid.tsx";
import { IoClose } from "react-icons/io5";
import {EditingShift, ShiftMetadata, SHIFTTYPES} from "./ScheduleAndShiftsCreationComponents/Types.ts";
import {EditingShiftPane} from "./ScheduleAndShiftsCreationComponents/EditingShiftPane.tsx";

type Props = {
    onClose: () => void;
    saveEditingShiftToSchedule: (id: Guid, start: Date, end: Date) => void
    shiftsSchedule: ShiftMetadata[];
    nextWeeksDayDates: Date[];
    onSubmitSchedule: () => void;
};

const WeeklyShiftCreatorPanel = ({ onClose, saveEditingShiftToSchedule, shiftsSchedule, nextWeeksDayDates, onSubmitSchedule }: Props) => {

    const [editingShift, setEditingShift] = useState<EditingShift | undefined>(undefined);

    const days = nextWeeksDayDates.map(date =>
        <p key={date.toISOString()} className="bg-custom-pastel-green rounded-lg items-center text-center italic pb-1">
            {date.toLocaleDateString('en-us', { weekday: 'short', day: "numeric", month: "numeric" })}
        </p>);

    const saveEditingShiftToScheduleCallBack = (shiftId: Guid, startTime: Date, endTime: Date) => {
        saveEditingShiftToSchedule(shiftId, startTime, endTime);
        setEditingShift(undefined);
    }

    const updateEditingShiftStartTime = (date: Date) => {
        setEditingShift(prev => prev ? { ...prev, startTime: date } : prev);
    };

    const updateEditingShiftEndTime = (date: Date) => {
        setEditingShift(prev => prev ? { ...prev, endTime: date } : prev);
    };

    return (
        <div className="flex justify-evenly inset-0 bg-opacity-30 backdrop-blur-sm fixed items-center">
            <div className="flex flex-col w-2/3 bg-white place-self-center items-center p-4 gap-4 border border-gray-200 rounded-lg">
                <button className="place-self-end bg-custom-pastel-green text-center text-custom-cream rounded-full p-1" onClick={onClose}><IoClose /> </button>
                <h1 className="text-center text-2xl font-opensans bg-custom-cream-warm w-full p-2 h-full rounded-lg">
                    Create Shifts for next week <br/>
                    <span className="italic text-xs">
                        {nextWeeksDayDates[0].toDateString()} - {nextWeeksDayDates.at(-1)?.toDateString()}
                    </span>
                </h1>
                <div className="grid grid-cols-8 w-full h-full gap-4">
                    <span className="bg-custom-pastel-green rounded-lg text-2xl text-center italic"/>
                    {days}
                </div>
                <ShiftScheduleGrid shiftTypes={Array.from(Object.values(SHIFTTYPES))} nextWeeksDayDates={nextWeeksDayDates} shiftsSchedule={shiftsSchedule} setEditingShift={setEditingShift}/>
                <button className="bg-custom-pastel-green text-center text-custom-cream rounded-full" onClick={onSubmitSchedule}>
                    <IoIosCheckmark size={40}/>
                </button>
                {editingShift &&
                    <EditingShiftPane editingShift={editingShift}
                                                   shiftsSchedule={shiftsSchedule}
                                                   saveEditingShiftCallBack={saveEditingShiftToScheduleCallBack}
                                                   updateEditingShiftStartTime={updateEditingShiftStartTime}
                                                   updateEditingShiftEndTime={updateEditingShiftEndTime}
                    />}
            </div>
        </div>
    );
};

export default WeeklyShiftCreatorPanel;
