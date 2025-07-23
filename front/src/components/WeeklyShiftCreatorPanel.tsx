import {useState} from 'react';
import {IoIosCheckmark} from "react-icons/io";
import {Guid} from "guid-typescript";
import {useCreateNewShiftsSchedule} from "../apis.ts";
import {ScheduleModel} from "@noadudai/scheduler-backend-client";
import {ShiftScheduleGrid} from "./ScheduleAndShiftsCreationComponents/ShiftScheduleGrid.tsx";


import {EditingShift, ShiftMetadata, ShiftTypes} from "./ScheduleAndShiftsCreationComponents/Types.ts";
import {EditingShiftPane} from "./ScheduleAndShiftsCreationComponents/EditingShiftPane.tsx";


const WeeklyShiftCreatorPanel = () => {

    const daysInWeek: number = 7;
    const today: Date = new Date();
    const nextSunday = daysInWeek - today.getDay();
    const shiftTypes: ShiftTypes[] = ['Morning', 'Evening', 'Closing'];

    const [editingShift, setEditingShift] = useState<EditingShift | undefined>(undefined);

    const nextWeeksDayDates: Date[] = Array.from({length: daysInWeek}, (_, i) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + nextSunday + i));

    const initialState: ShiftMetadata[] = Array.from(shiftTypes, (type) => nextWeeksDayDates.map((date) => {
        return ({id: Guid.create(), shiftType:type, startTime: date, endTime: undefined});
    })).flat();

    const [shiftsSchedule, setShiftsSchedule] = useState<ShiftMetadata[]>(initialState);

    const mutation = useCreateNewShiftsSchedule();

    const days = nextWeeksDayDates.map(date =>
        <p key={date.toISOString()} className="bg-custom-pastel-green rounded-lg items-center text-center italic pb-1">
            {date.toLocaleDateString('en-us', { weekday: 'short', day: "numeric", month: "numeric" })}
        </p>);

    const saveEditingShiftCallBack = (shiftId: Guid, startTime: Date, endTime: Date) => {
        setShiftsSchedule(prev =>
            prev.map((shift) =>
                shift.id === shiftId ? { ...shift, startTime: startTime, endTime: endTime } : shift));

        setEditingShift(undefined);
    }

    const onSubmitSchedule = () => {
        // Only the shifts that have a defined endTime, are shifts that the manager created for the schedule.
        const shiftsForMutation = shiftsSchedule.filter((shift)  => shift.endTime !== undefined);

        const data: ScheduleModel = {shifts: shiftsForMutation.map((shift) =>
                ({
                    shiftStartTime: shift.startTime.toISOString(),
                    shiftEndTime: shift.endTime!.toISOString(),
                    shiftType: shift.shiftType
                }))};

        mutation.mutate(data);
    };

    const updateEditingShiftStartTime = (date: Date) => {
        setEditingShift(prev => prev ? { ...prev, startTime: date } : prev);
    };

    const updateEditingShiftEndTime = (date: Date) => {
        setEditingShift(prev => prev ? { ...prev, endTime: date } : prev);
    };

    return (
        <div className="flex flex-col items-center p-4 gap-4">
            <h1 className="text-center text-2xl font-opensans bg-custom-cream-warm w-full  h-full rounded-lg">
                Create Shifts for next week
                <span className="italic text-xs">
                    {nextWeeksDayDates[0].toDateString()} - {nextWeeksDayDates.at(-1)?.toDateString()}
                </span>
            </h1>
            <div className="grid grid-cols-8 w-full h-full gap-4">
                <span className="bg-custom-pastel-green rounded-lg text-2xl text-center italic"/>
                {days}
            </div>
            <ShiftScheduleGrid shiftTypes={shiftTypes} nextWeeksDayDates={nextWeeksDayDates} shiftsSchedule={shiftsSchedule} setEditingShift={setEditingShift}/>
            <button className="bg-custom-pastel-green text-center text-custom-cream rounded-full" onClick={onSubmitSchedule}>
                <IoIosCheckmark size={40}/>
            </button>
            {editingShift &&
                <EditingShiftPane editingShift={editingShift}
                                               shiftsSchedule={shiftsSchedule}
                                               saveEditingShiftCallBack={saveEditingShiftCallBack}
                                               updateEditingShiftStartTime={updateEditingShiftStartTime}
                                               updateEditingShiftEndTime={updateEditingShiftEndTime}
                />}
        </div>
    );
};

export default WeeklyShiftCreatorPanel;
