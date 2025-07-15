import {useState} from 'react';
import {IoIosCheckmark} from "react-icons/io";
import {Guid} from "guid-typescript";
import {useCreateNewShiftsSchedule} from "../apis.ts";
import {ScheduleModel} from "@noadudai/scheduler-backend-client";
import {saveEditingShift, ShiftDataToSave} from "./ScheduleAndShiftsCreationComponents/SaveEditingShift.ts"
import {
    DateTimePickerComponent,
    TimePickerComponent
} from "./ScheduleAndShiftsCreationComponents/TimeAndDatePickerComponents.tsx";
import {ShiftsButtonsGroup} from "./ScheduleAndShiftsCreationComponents/ShiftButtonsGroup.tsx";

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

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

const ShiftsForNextWeek = () => {

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

    const editingShiftElement = editingShift && (
        <>
            <div className="flex pt-64 justify-evenly inset-0 fixed items-center bg-black/5 backdrop-blur-sm">
                <div
                    className="bg-white border rounded-xl border-gray-200 p-6 flex flex-col gap-3 items-center">
                    <TimePickerComponent
                        label={"Set shift starting time "}
                        startTime={editingShift.startTime}
                        setTimeCallback={(date: Date) => setEditingShift((prev) => ({ ...prev, startTime: date }))}
                    />
                    <DateTimePickerComponent
                        label={"Set shift ending shift "}
                        endTime={editingShift.endTime!}
                        setEditShift={(date: Date) => setEditingShift((prev) => ({...prev, endTime: date}))}
                    />
                    <button
                        className="disabled:bg-gray-300 disabled:text-gray-950 bg-custom-pastel-green p-2 text-center text-custom-cream rounded-xl items-center"
                        disabled={!(editingShift.startTime && editingShift.endTime)}
                        onClick={() => {
                            const {id, startTime, endTime} = editingShift;
                            const shift = shiftsSchedule.find(s => s.id === id);

                            if (startTime !== undefined && endTime !== undefined && shift) {
                                const editingShiftDataToSave: ShiftDataToSave = {
                                    editingShiftStartTime: startTime,
                                    editingShiftEndTime: endTime,
                                    shiftInScheduleToUpdate: shift,
                                    callBack: saveEditingShiftCallBack
                                };

                                saveEditingShift(editingShiftDataToSave);
                            }
                        }}>
                            Save
                    </button>
                </div>
            </div>
        </>);


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
            <ShiftsButtonsGroup shiftTypes={shiftTypes} nextWeeksDayDates={nextWeeksDayDates} shiftsSchedule={shiftsSchedule} setEditingShift={setEditingShift}/>
            <button className="bg-custom-pastel-green text-center text-custom-cream rounded-full" onClick={onSubmitSchedule}>
                <IoIosCheckmark size={40}/>
            </button>
            {editingShift && editingShiftElement}
        </div>
    );
};

export default ShiftsForNextWeek;
