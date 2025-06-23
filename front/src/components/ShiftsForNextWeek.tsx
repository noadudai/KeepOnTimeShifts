import React, {useState} from 'react';
import { TiPlus } from "react-icons/ti";
import {IoIosCheckmark} from "react-icons/io";
import {Guid} from "guid-typescript";
import { format } from 'date-fns';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker'

import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

type ShiftTypes = 'Morning' | 'Evening' | 'Closing';

type ShiftMetadata = {
    id: Guid | undefined;
    startTime: Date;
    endTime: Date | undefined;
    shiftType: ShiftTypes;
};

const ShiftsForNextWeek = () => {

    const daysInWeek: number = 7;
    const today: Date = new Date();
    const nextSunday = daysInWeek - today.getDay();
    const shiftTypes: ShiftTypes[] = ['Morning', 'Evening', 'Closing'];

    const [currentlyEditing, setCurrentlyEditing] = useState<Guid | undefined>(undefined);
    const [editingStartTime, setEditingStartTime] = useState<Date | undefined>(undefined);
    const [editingEndDate, setEditingEndDate] = useState<Date | undefined>(undefined);
    const [editingEndTime, setEditingEndTime] = useState<Date | undefined>(undefined);


    const nextWeeksDayDates: Date[] = Array.from({length: daysInWeek}, (_, i) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + nextSunday + i));
    const initialState: ShiftMetadata[][] = Array.from(shiftTypes, (type) => nextWeeksDayDates.map((date) => {
        return ({id: Guid.create(), shiftType:type, startTime: date, endTime: undefined});
    }));

    const [shiftsSchedule, setShiftsSchedule] = useState<ShiftMetadata[]>(initialState.flat());

    const days = nextWeeksDayDates.map(date =>
        <p className="bg-custom-pastel-green rounded-lg items-center text-center italic pb-1">
            {date.toLocaleDateString('en-us', {
                weekday: 'short',
                day: "numeric", month: "numeric"
            })}
        </p>);

    const shiftTypeInTable = ({shiftType}: {shiftType: string}) => <p className="bg-custom-pastel-green rounded-lg text-xl italic flex items-center justify-center text-center pb-1">{shiftType}</p>

    const shiftsButtonsGroupElement = () => (
        <>
            {shiftTypes.map((sType) => (
                <div className="grid grid-cols-8 w-full h-full gap-4">
                    {shiftTypeInTable({shiftType:sType})}
                    {nextWeeksDayDates.map((date) => {
                        const shift = shiftsSchedule.find(s => s.shiftType === sType && s.startTime.toDateString() === date.toDateString());
                        return(
                            <div>
                                <div
                                    className="bg-custom-cream border border-gray-100 rounded-lg w-full h-20  flex justify-center items-center"
                                >
                                    {shift?.endTime !== undefined ?
                                        (
                                            <div>
                                                <div
                                                    className="flex items-center justify-center text-black text-xs">
                                                    Starts at {format(shift?.startTime, "HH:mm")}
                                                </div>
                                                <div
                                                    className="flex items-center justify-center text-black text-xs">
                                                    Ends at {shift?.endTime?.toDateString()}
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                className="text-custom-pastel-green"
                                                onClick={() => setCurrentlyEditing(shift?.id)}>
                                                <TiPlus size={35}/>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            ))}
        </>
    );

    const onSaveEditingShift = () => {
        console.log("onSaveEditingShifts");
        const shift = shiftsSchedule.find(s => s.id === currentlyEditing);
        if (editingEndDate && editingStartTime && editingEndTime && shift) {
            console.log("in if");
            const newStartTime = new Date(shift.startTime);
            const newEndTime = new Date(editingEndDate);
            newStartTime.setHours(editingStartTime.getHours());
            newStartTime.setMinutes(editingStartTime.getMinutes());
            newStartTime.setSeconds(0);
            newStartTime.setMilliseconds(0);

            newEndTime.setHours(editingEndTime.getHours());
            newEndTime.setMinutes(editingEndTime.getMinutes());
            newEndTime.setSeconds(0);
            newEndTime.setMilliseconds(0);

            console.log("newStartTime", newStartTime);
            console.log("newEndTime", newEndTime);


            setShiftsSchedule(prev => prev.map((shift) => shift.id === currentlyEditing ? {
                ...shift, startTime: newStartTime, endTime: editingEndDate,
            } : shift)
            );
        }

        setEditingEndDate(undefined);
        setEditingStartTime(undefined);
        setCurrentlyEditing(undefined);
    };

    const timeOnlClick = ({time, onCallback}: {time: string | null , onCallback: (date: Date) => void}) => {
        if(time){
            const [hour, minute] = time.split(":");
            console.log(time);
            console.log("hour", hour, "minute", minute);
            const startDate = new Date();
            startDate.setHours(parseInt(hour, 10));
            startDate.setMinutes(parseInt(minute, 10));
            console.log(startDate);
            onCallback(startDate);
        }
    };

    return (
        <div className="flex flex-col items-center p-4 gap-4">
            <h1 className="text-center text-2xl font-opensans bg-custom-cream-warm w-full  h-full rounded-lg">
                Create Shifts for next week
                <span className="italic text-xs">
                    {nextWeeksDayDates[0].toDateString()} - {nextWeeksDayDates[6].toDateString()}
                </span>
            </h1>
            <div className="grid grid-cols-8 w-full h-full gap-4">
                <span className="bg-custom-pastel-green rounded-lg text-2xl text-center italic"/>
                {days}
            </div>
            {shiftsButtonsGroupElement()}
            <button className="bg-custom-pastel-green text-center text-custom-cream rounded-full">
                <IoIosCheckmark size={40}/>
            </button>
            {currentlyEditing && (
                <div className="flex pt-64 justify-evenly inset-0 fixed items-center bg-black/5 backdrop-blur-sm">
                    <div className="bg-white border rounded-xl border-gray-200 p-6 flex flex-col gap-3 items-center">
                        <div className="flext">
                            <label>Set shift starting time </label>
                            <TimePicker clearIcon={null} disableClock={true}
                                className="border border-custom-cream-warm bg-custom-cream p-2 text-xs w-28" onChange={(e) => {
                                timeOnlClick({time: e, onCallback: setEditingStartTime})
                            }}
                                value={editingStartTime ? format(editingStartTime, "HH:mm") : ""}/>
                        </div>
                        <div>
                            <label>Set shift ending date </label>
                            <DatePicker
                                className="border border-custom-cream-warm bg-custom-cream p-2 text-xs w-28"
                                selected={editingEndDate} onChange={(date) => setEditingEndDate(date)}/>
                        </div>
                        <div className="flext">
                            <label>Set shift ending time </label>
                            <TimePicker clearIcon={null} disableClock={true}
                                className="border border-custom-cream-warm bg-custom-cream p-2 text-xs w-28" onChange={(e) => {
                                timeOnlClick({time: e, onCallback: setEditingEndTime})
                            }}
                                value={editingEndTime ? format(editingEndTime, "HH:mm") : ""}/>
                        </div>
                            <button
                                className="bg-custom-pastel-green text-center text-custom-cream rounded-xl items-center"
                                onClick={onSaveEditingShift}>
                                <p className="p-2">Save</p>
                            </button>
                        </div>
                    </div>
                    )}
                </div>
    );
};

export default ShiftsForNextWeek;
