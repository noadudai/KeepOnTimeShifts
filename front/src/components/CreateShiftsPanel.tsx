import React from 'react';
import { IoIosCheckmark } from "react-icons/io";

const CreateShiftsPanel = ({onClose}: { onClose: () => void }) => {
    const nextWeeksDayDates: string[] = []
    const daysInWeek: number = 7;

    const today: Date = new Date();

    const nextSunday = daysInWeek - today.getDay();

    for (let i = 0; i < 7; i++) {
        const dayInNextWeek = new Date(today)
        dayInNextWeek.setDate(dayInNextWeek.getDate() + nextSunday + i);
        nextWeeksDayDates.push(dayInNextWeek.toDateString());
    }

    const dates = nextWeeksDayDates.map((date) => <div className="flex items-center justify-center bg-lime-300 rounded-xl p-4 w-20">{date.slice(0,4)}</div>);
    // <ul>{dates}</ul>

    return (
        <div className="fixed inset-0 bg-black/10 flex justify-center items-center ">
            <div className="w-2/3 bg-white rounded-xl p-2">
                <div className="bg-amber-100 rounded-xl p-2 justify-center flex items-center">
                    <h1 className="text-2xl">Create Next Week's Shifts <span
                        className="italic text-xs">{nextWeeksDayDates.at(0)} - {nextWeeksDayDates.at(nextWeeksDayDates.length - 1)} </span>
                    </h1>
                </div>
                <div className="p-2 flex items-center justify-center">
                    <div className="flex flex-row gap-4 ">{dates}</div>
                </div>
                <div className="flex items-center justify-center p-6">
                    <button
                        className="bg-lime-300 bg-custom-pastel-green text-black rounded-xl"
                        onClick={onClose}>
                        <IoIosCheckmark size={40}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateShiftsPanel;