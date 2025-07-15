import { format } from 'date-fns';
import {isSameDay} from "./SameDateCheck.ts";
import {DisplayShiftTime} from "./ShiftTypesAndTimeDisplayElements.tsx";

export const RenderShiftTime = ({dateToCheck, timeToRender, startOrEndTimeLabel}: {dateToCheck: Date, timeToRender: Date, startOrEndTimeLabel: string}) => {
    return (
        <div className="flex items-center justify-between">
            {isSameDay(dateToCheck, timeToRender) ?
                <DisplayShiftTime startOrEnd={startOrEndTimeLabel} timeToRepresent={format(timeToRender, "HH:mm")} /> :
                <DisplayShiftTime startOrEnd={startOrEndTimeLabel} timeToRepresent={format(timeToRender, "EEE HH:mm")} />}
        </div>
    );
};