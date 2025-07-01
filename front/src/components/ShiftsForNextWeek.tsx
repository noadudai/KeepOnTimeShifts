import {useState} from 'react';
import { TiPlus } from "react-icons/ti";
import {IoIosCheckmark} from "react-icons/io";
import {Guid} from "guid-typescript";
import { format } from 'date-fns';
import DateTimePicker from 'react-datetime-picker';
import TimePicker from 'react-time-picker'
import {useCreateNewShiftsSchedule} from "../apis.ts";
import {ScheduleModel} from "@noadudai/scheduler-backend-client";

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

type ShiftTypes = 'Morning' | 'Evening' | 'Closing';

type ShiftMetadata = {
    id: Guid | undefined;
    startTime: Date;
    endTime: Date | undefined;
    shiftType: ShiftTypes;
};

type EditingShift = {
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

    const initialState: ShiftMetadata[][] = Array.from(shiftTypes, (type) => nextWeeksDayDates.map((date) => {
        return ({id: Guid.create(), shiftType:type, startTime: date, endTime: undefined});
    }));

    const [shiftsSchedule, setShiftsSchedule] = useState<ShiftMetadata[]>(initialState.flat());

    const days = nextWeeksDayDates.map(date =>
        <p key={date.toISOString()} className="bg-custom-pastel-green rounded-lg items-center text-center italic pb-1">
            {date.toLocaleDateString('en-us', { weekday: 'short', day: "numeric", month: "numeric" })}
        </p>);

    const shiftTypeDisplay = ({shiftType}: {shiftType: ShiftTypes}) =>
        (<p className="bg-custom-pastel-green rounded-lg text-xl italic flex items-center justify-center text-center pb-1">
            {shiftType}
        </p>);

    const displayShiftTime = ({startOrEnd, timeToRepresent}: {startOrEnd: string, timeToRepresent: string}) => {
        return (
            <>
                <p className="items-center text-black">
                    {startOrEnd} at
                </p>
                <div className="bg-custom-cream w-20 p-1 rounded-lg text-xs text-center">
                    {timeToRepresent}
                </div>
            </>
        );
    };

    const isSameDay = (date1: Date, date2: Date) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    const shiftsButtonsGroupElement = () => (
        <>
            {shiftTypes.map((sType) => (
                <div key={sType} className="grid grid-cols-8 w-full h-full gap-4">
                    {shiftTypeDisplay({shiftType: sType})}
                    {nextWeeksDayDates.map((date) => {
                        const shift = shiftsSchedule.find(s => s.shiftType === sType && s.startTime.toDateString() === date.toDateString());
                        return(
                            <div  key={`${sType}-${date.toISOString()}`}>
                                <div
                                    className={`border border-gray-100 rounded-lg w-full h-20 flex justify-center items-center ${
                                        shift?.endTime !== undefined ? 'bg-custom-cream-warm' : 'bg-custom-cream'
                                    }`}
                                >
                                    {shift?.endTime !== undefined ?
                                        (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center justify-between">
                                                    {isSameDay(date, shift?.startTime) ?
                                                        displayShiftTime({startOrEnd: "Starts", timeToRepresent: format(shift?.startTime, "HH:mm")}) :
                                                        displayShiftTime({startOrEnd: "Starts", timeToRepresent: format(shift?.startTime, "EEE HH:mm")})}
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    {isSameDay(date, shift?.endTime) ?
                                                        displayShiftTime({startOrEnd: "Ends", timeToRepresent: format(shift?.endTime, "HH:mm")}):
                                                        displayShiftTime({startOrEnd: "Ends", timeToRepresent: format(shift?.endTime, "EEE HH:mm")})}
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
        const shift = shiftsSchedule.find(s => s.id === currentlyEditing);
        if (editingShift?.startTime && editingShift?.endTime && shift) {

            const newStartTime = new Date(shift.startTime);

            newStartTime.setHours(editingShift.startTime.getHours());
            newStartTime.setMinutes(editingShift.startTime.getMinutes());
            newStartTime.setSeconds(0);
            newStartTime.setMilliseconds(0);

            setShiftsSchedule(prev =>
                prev.map((shift) =>
                    shift.id === currentlyEditing ? { ...shift, startTime: newStartTime, endTime: editingShift.endTime } : shift));
        }

        setEditingShift(undefined);
        setCurrentlyEditing(undefined);
    };

    const mutation = useCreateNewShiftsSchedule();

    const onSubmitSchedule = () => {
        const shiftsForMutation = shiftsSchedule.filter(shift => shift.endTime !== undefined);
        console.log(shiftsForMutation);

        const data: ScheduleModel = {shifts: shiftsForMutation.map((shift) =>
                ({
                    shiftStartTime: shift.startTime.toISOString(),
                    shiftEndTime: shift.endTime?.toISOString(),
                    shiftType: shiftTypes.indexOf(shift.shiftType)
                }))};

        mutation.mutate(data);
    };


    const handleTimeSelect = ({time, onCallback, baseDate}: {time: string | null , onCallback: (date: Date) => void, baseDate?: Date}) => {
        if(time){
            const [hour, minute] = time.split(":");

            const newDate = baseDate ? new Date(baseDate) : new Date();
            newDate.setHours(parseInt(hour, 10));
            newDate.setMinutes(parseInt(minute, 10));

            onCallback(newDate);
        }
    };

    const isEditingShift =
        <>
            {currentlyEditing && (
                <div className="flex pt-64 justify-evenly inset-0 fixed items-center bg-black/5 backdrop-blur-sm">
                    <div className="bg-white border rounded-xl border-gray-200 p-6 flex flex-col gap-3 items-center">
                        <div className="flex items-center">
                            <label>Set shift starting time </label>
                            <TimePicker clearIcon={null} disableClock={true}
                                        className="border border-custom-cream-warm bg-custom-cream p-2 text-xs w-28"
                                        onChange={(e) => {
                                            handleTimeSelect({
                                                time: e,
                                                onCallback: (date) => setEditingShift((prev) => ({
                                                    ...prev,
                                                    startTime: date
                                                })),
                                                baseDate: editingShift?.startTime ?? new Date(),
                                            })
                                        }}
                                        value={editingShift?.startTime ? format(editingShift?.startTime, "HH:mm") : ""}/>
                        </div>
                        <div>
                            <label>Set shift ending shift </label>
                            <DateTimePicker
                                onChange={(date: Date | null) => {
                                    if (date) {
                                        setEditingShift((prev) => ({...prev, endTime: date}));
                                    }
                                }}
                                value={editingShift?.endTime}
                                className="border border-custom-cream-warm bg-custom-cream p-2 text-xs w-40"
                                disableClock={true}
                                calendarIcon={null}
                                clearIcon={null}
                            />
                        </div>
                        <button
                            className="bg-custom-pastel-green p-2 text-center text-custom-cream rounded-xl items-center"
                            onClick={onSaveEditingShift}>
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
                    {nextWeeksDayDates[0].toDateString()} - {nextWeeksDayDates[6].toDateString()}
                </span>
            </h1>
            <div className="grid grid-cols-8 w-full h-full gap-4">
                <span className="bg-custom-pastel-green rounded-lg text-2xl text-center italic"/>
                {days}
            </div>
            {shiftsButtonsGroupElement()}
            <button className="bg-custom-pastel-green text-center text-custom-cream rounded-full" onClick={onSubmitSchedule}>
                <IoIosCheckmark size={40}/>
            </button>
            {isEditingShift}
        </div>
    );
};

export default ShiftsForNextWeek;
