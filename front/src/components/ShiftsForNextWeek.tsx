import {useState} from 'react';
import { TiPlus } from "react-icons/ti";
import {IoIosCheckmark} from "react-icons/io";
import {Guid} from "guid-typescript";
import { format } from 'date-fns';
import DateTimePicker from 'react-datetime-picker';
import TimePicker from 'react-time-picker'
import {useCreateNewShiftsSchedule} from "../apis.ts";
import {ScheduleModel} from "@noadudai/scheduler-backend-client";
import {onSaveEditingShift} from "./ScheduleAndShiftsCreationComponents/SaveEditingShift.ts"
import {displayShiftTime, shiftTypeDisplay} from "./ScheduleAndShiftsCreationComponents/ShiftTypesAndTimeDisplayElements.tsx";
import {isSameDay} from "./ScheduleAndShiftsCreationComponents/SameDateCheck.ts";

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import {handleTimeSelect} from "./ScheduleAndShiftsCreationComponents/TimePickerTimeChangeHandler.ts";

export type ShiftTypes = 'Morning' | 'Evening' | 'Closing';

export type ShiftMetadata = {
    id: Guid;
    startTime: Date;
    endTime: Date | undefined;
    shiftType: ShiftTypes;
};

export type EditingShift = {
    startTime?: Date;
    endTime?: Date;
};

const ShiftsForNextWeek = () => {

    const daysInWeek: number = 7;
    const today: Date = new Date();
    const nextSunday = daysInWeek - today.getDay();
    const shiftTypes: ShiftTypes[] = ['Morning', 'Evening', 'Closing'];

    const [currentlyEditing, setCurrentlyEditing] = useState<Guid | undefined>(undefined);
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


    const shiftsButtonsGroupElement =
        <>
            {shiftTypes.map((sType) => (
                <div key={sType} className="grid grid-cols-8 w-full h-full gap-4">
                    {shiftTypeDisplay({shiftType: sType})}
                    {nextWeeksDayDates.map((date) => {
                        const shift = shiftsSchedule.find(s => s.shiftType === sType && s.startTime.toDateString() === date.toDateString());
                        if (shift) {
                            const shiftEndTime = shift.endTime;
                            const shiftStartTime = shift.startTime;

                            return(
                                <div  key={`${sType}-${date.toISOString()}`}>
                                    <div
                                        className={`border border-gray-100 rounded-lg w-full h-20 flex justify-center items-center ${
                                            shiftEndTime !== undefined ? 'bg-custom-cream-warm' : 'bg-custom-cream'
                                        }`}
                                    >
                                        {shiftEndTime !== undefined ?
                                            (
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between">
                                                        {isSameDay(date, shiftStartTime) ?
                                                            displayShiftTime({startOrEnd: "Starts", timeToRepresent: format(shiftStartTime, "HH:mm")}) :
                                                            displayShiftTime({startOrEnd: "Starts", timeToRepresent: format(shiftStartTime, "EEE HH:mm")})}
                                                    </div>
                                                    <div className="flex items-center gap-6">
                                                        {isSameDay(date, shiftEndTime) ?
                                                            displayShiftTime({startOrEnd: "Ends", timeToRepresent: format(shiftEndTime, "HH:mm")}):
                                                            displayShiftTime({startOrEnd: "Ends", timeToRepresent: format(shiftEndTime, "EEE HH:mm")})}
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    className="text-custom-pastel-green"
                                                    onClick={() => {
                                                        setCurrentlyEditing(shift.id);
                                                        setEditingShift({startTime: shift.startTime, endTime: shift.endTime});
                                                    }}>
                                                    <TiPlus size={35}/>
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            );
                        } else {
                            setCurrentlyEditing(undefined);
                        }
                    })}
                </div>
            ))}
        </>;


    const saveEditingShiftCallBack = (shiftId: Guid, startTime: Date, endTime: Date) => {
        setShiftsSchedule(prev =>
            prev.map((shift) =>
                shift.id === shiftId ? { ...shift, startTime: startTime, endTime: endTime } : shift));

        setEditingShift(undefined);
    }


    const onSubmitSchedule = () => {
        // Only the shifts that have a defined endTime, are shifts that the manager created for the schedule.
        const shiftsForMutation = shiftsSchedule.filter((shift): shift is ShiftMetadata & { endTime: Date }  => shift.endTime !== undefined);

        const data: ScheduleModel = {shifts: shiftsForMutation.map((shift) =>
                ({
                    shiftStartTime: shift.startTime.toISOString(),
                    shiftEndTime: shift.endTime.toISOString(),
                    shiftType: shiftTypes.indexOf(shift.shiftType)
                }))};

        mutation.mutate(data);
    };


    const EditingShift =
        <>
            {currentlyEditing && editingShift && (
                <div className="flex pt-64 justify-evenly inset-0 fixed items-center bg-black/5 backdrop-blur-sm">
                    <div className="bg-white border rounded-xl border-gray-200 p-6 flex flex-col gap-3 items-center">
                        <div className="flex items-center">
                            <label>Set shift starting time </label>
                            <TimePicker clearIcon={null} disableClock={true}
                                        className="border border-custom-cream-warm bg-custom-cream p-2 text-xs w-28"
                                        onChange={(e) => {
                                            if (e) {
                                                handleTimeSelect({
                                                    time: e,
                                                    onCallback: (date) => setEditingShift((prev) => ({
                                                        ...prev,
                                                        startTime: date
                                                    })),
                                                });
                                            }
                                        }}
                                        value={editingShift.startTime ? format(editingShift.startTime, "HH:mm") : ""}/>
                        </div>
                        <div>
                            <label>Set shift ending shift </label>
                            <DateTimePicker
                                onChange={(date: Date | null) => {
                                    if (date) {
                                        setEditingShift((prev) => ({...prev, endTime: date}));
                                    }
                                }}
                                value={editingShift.endTime}
                                className="border border-custom-cream-warm bg-custom-cream p-2 text-xs w-40"
                                disableClock={true}
                                calendarIcon={null}
                                clearIcon={null}
                            />
                        </div>
                        <button
                            className="disabled:bg-gray-300 disabled:text-gray-950 bg-custom-pastel-green p-2 text-center text-custom-cream rounded-xl items-center"
                            onClick={() => {
                                const shift = shiftsSchedule.find(s => s.id === currentlyEditing);

                                if(editingShift.startTime !== undefined && editingShift.endTime !== undefined && shift) {
                                    onSaveEditingShift({
                                        editingShiftStartTime: editingShift.startTime,
                                        editingShiftEndTime: editingShift.endTime,
                                        shiftInScheduleToUpdate: shift,
                                        callBack: saveEditingShiftCallBack,
                                    });
                                }
                            }}
                            disabled={!(editingShift.startTime !== undefined && editingShift.endTime !== undefined)}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </>;


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
            {shiftsButtonsGroupElement}
            <button className="bg-custom-pastel-green text-center text-custom-cream rounded-full" onClick={onSubmitSchedule}>
                <IoIosCheckmark size={40}/>
            </button>
            {EditingShift}
        </div>
    );
};

export default ShiftsForNextWeek;
