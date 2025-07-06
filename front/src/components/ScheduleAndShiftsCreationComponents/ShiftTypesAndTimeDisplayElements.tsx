import {ShiftTypes} from "../ShiftsForNextWeek"

export const shiftTypeDisplay = ({shiftType}: {shiftType: ShiftTypes}) =>
    (<p className="bg-custom-pastel-green rounded-lg text-xl italic flex items-center justify-center text-center pb-1">
        {shiftType}
    </p>);

export const displayShiftTime = ({startOrEnd, timeToRepresent}: {startOrEnd: string, timeToRepresent: string}) => {
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