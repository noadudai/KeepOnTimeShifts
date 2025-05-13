import {useState} from "react";

const CreateShiftsPage = () => {

    const nextWeeksDayDates: string[] = []
    const daysInWeek: number = 7;

    const today: Date = new Date();

    const nextSunday = daysInWeek - today.getDay();

    for (let i= 0; i < 7; i++) {
        const dayInNextWeek = new Date(today)
        dayInNextWeek.setDate(dayInNextWeek.getDate() + nextSunday +i);
        nextWeeksDayDates.push(dayInNextWeek.toDateString());
    }

    const dates = nextWeeksDayDates.map((date) => <li>{date}</li>);

    return(<ul>{dates}</ul>)
}

export default CreateShiftsPage;
