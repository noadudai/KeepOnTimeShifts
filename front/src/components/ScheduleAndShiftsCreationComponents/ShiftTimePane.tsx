import { format } from 'date-fns';
import {isSameDay} from "./SameDateCheck.ts";
import {ShiftTimeInfo} from "./ShiftTypesAndTimeDisplayElements.tsx";


export type ShiftTimePaneProps = {
    dayClickedInWeek: Date;
    timeToRender: Date;
    label: string;
};

export const ShiftTimePane = ({dayClickedInWeek, timeToRender, label}: ShiftTimePaneProps) => {
    return (
        <div className="flex items-center justify-between">
            {isSameDay(dayClickedInWeek, timeToRender) ?
                <ShiftTimeInfo startOrEnd={label} timeToRepresent={format(timeToRender, "HH:mm")} /> :
                <ShiftTimeInfo startOrEnd={label} timeToRepresent={format(timeToRender, "EEE HH:mm")} />}
        </div>
    );
};