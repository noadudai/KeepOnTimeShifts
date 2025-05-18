import {useState} from "react";
import {CreateShiftsNavbar} from "../components/CreateShiftsNavbar.tsx";

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

    return(
        <div className="relative">
            <CreateShiftsNavbar />
            <ul>{dates}</ul>
        </div>
    );
}

export default CreateShiftsPage;
