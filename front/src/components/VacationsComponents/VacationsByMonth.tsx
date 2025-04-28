import axios from "axios";
import {
    AddNewUserScheduleRequestApi,
    UserDateRangePreferenceRequestModel,
} from "@noadudai/scheduler-backend-client/api.ts";
import {useMutation} from "@tanstack/react-query";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import {OneVacationDateRangeModel, UserVacationsResponse} from "@noadudai/scheduler-backend-client";
import DatePicker from "react-calendar";

const VacationsByMonth = ({showVacations}: {showVacations: boolean }) => {
    const {getAccessTokenSilently} = useAuth0();

    const [vacations, setVacations] = useState<UserVacationsResponse | null>(null);
    const [vacationFilterStartDate, setVacationFilterStartDate] = useState(null);
    const [vacationFilterEndDate, setVacationFilterEndDate] = useState(null);
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);
    const [showFiltering, setShowFiltering] = useState(showVacations);

    const ax = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`,
    });

    const userSchedulePreferenceRequestApi: AddNewUserScheduleRequestApi = new AddNewUserScheduleRequestApi(undefined, undefined, ax);

    const userSchedulePrefReqPostRequest = useMutation({
        mutationFn: async (data: UserDateRangePreferenceRequestModel) =>
        {
            const token = await getAccessTokenSilently();


            const response = await userSchedulePreferenceRequestApi.userSchedulePreferencesRequestVacationsByDateRangePost(data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        },
        onSuccess: (vacations) => {
            setVacations(vacations);
        },
        onError: (error) => {
            console.error('Error fetching dates:', error);
        },
    });

    const handleGetVacationsByDateRange = () => {

        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const dateRangeModel: UserDateRangePreferenceRequestModel = {start_date: firstDay, end_date: lastDay};

        userSchedulePrefReqPostRequest.mutate(dateRangeModel);
        setShowFiltering(false)
    }


    return (
        <div>
            {showFiltering &&
                <div className="flex items-center justify-evenly w-full">
                    <div className="relative w-64">
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={vacationFilterStartDate ? vacationFilterStartDate.toLocaleDateString() : ''}
                            placeholder="My vacations from"
                            onClick={() => setShowStartCalendar(true)} // Show calendar on input click
                        />
                        {showStartCalendar && (
                            <div
                                className="calendar-container absolute mt-2 z-10 bg-emerald-800 border shadow-md rounded-md w-64 p-2 text-emerald-50">
                                <DatePicker
                                    selected={vacationFilterStartDate}
                                    onChange={(date) => {
                                        setVacationFilterStartDate(date);
                                        setShowStartCalendar(false);
                                    }}
                                    popperPlacement="bottom"
                                />
                            </div>
                        )}
                    </div>
                    <div className="relative w-64">
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={vacationFilterEndDate ? vacationFilterEndDate.toLocaleDateString() : ''}
                            placeholder="To"
                            onClick={() => setShowEndCalendar(true)} // Show calendar on input click
                        />
                        {showEndCalendar && (
                            <div
                                className="calendar-container absolute mt-2 z-10 bg-emerald-800 border shadow-md rounded-md w-64 p-2 text-emerald-50">
                                <DatePicker
                                    selected={vacationFilterEndDate}
                                    onChange={(date) => {
                                        setVacationFilterEndDate(date);
                                        setShowEndCalendar(false);
                                    }}
                                    popperPlacement="bottom"
                                />
                            </div>
                        )}
                    </div>
                    <button className=" bg-green-950/40 text-teal-950 font-medium text-xl hover:bg-green-950/50 px-4 py-5 rounded-lg" onClick={handleGetVacationsByDateRange}  > See vacations! </button>
                </div>
            }
            <div className="flex flex-wrap gap-2">
                {vacations ? (vacations?.vacations?.map((range, index) => (
                    <span
                        key={index}
                        className="bg-blue-950/10 text-blue-950 px-4 py-1 rounded-lg"
                    >
                  {range.startDate === range.endDate ? new Date(range.startDate).toLocaleDateString() : `${new Date(range.startDate).toLocaleDateString()} - ${new Date(range.endDate).toLocaleDateString()}`}
                </span>
                ))) : (<span> No vacations yet :) </span>)}
            </div>
        </div>
    )
}

export default VacationsByMonth;