import {useState} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {AddNewUserScheduleRequestApi} from "@noadudai/scheduler-backend-client/api.ts"
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {UserDateRangePreferenceRequestModel} from "@noadudai/scheduler-backend-client/api.ts";
import {DateRangeRequestType} from "@noadudai/scheduler-backend-client";

const AddNewVacationRequest = ({onClose}: { onClose: () => void }) => {
    const {getAccessTokenSilently} = useAuth0();

    const [vacationStartDate, setVacationStartDate] = useState('');
    const [vacationEndDate, setVacationEndDate] = useState('');

    const ax = axios.create({
        baseURL: 'http://localhost:5029',
    });

    const userSchedulePreferenceRequestApi: AddNewUserScheduleRequestApi = new AddNewUserScheduleRequestApi(undefined, undefined, ax);

    const userSchedulePrefReqPostRequest = useMutation({
        mutationFn: async(data: UserDateRangePreferenceRequestModel) =>
        {
            const token = await getAccessTokenSilently();

            const response = await userSchedulePreferenceRequestApi.userSchedulePreferencesRequestDateRangePreferenceRequestPost(data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response;
        }
    });

    const handleSubmitVacation = () => {
        const startDateDateTime = new Date(vacationStartDate.split("/").reverse().join("-"));
        const endDateDateTime = new Date(vacationEndDate.split("/").reverse().join("-"));

        const data: UserDateRangePreferenceRequestModel = {start_date: startDateDateTime.toISOString(), end_date: endDateDateTime.toISOString(), request_type: DateRangeRequestType.Vacation};

        userSchedulePrefReqPostRequest.mutate(data);
        setVacationStartDate('');
        setVacationEndDate('');
        
        onClose();
    }

    return (
        <div className="flex pt-64 justify-evenly inset-0 bg-opacity-30 backdrop-blur-sm fixed items-center">
            <div className="border border-gray-200 rounded-lg bg-grey-200 p-2">
                <div className="flex items-center justify-evenly text-black">
                    <p>Start Date</p>
                    <p>End Date</p>
                </div>
                <input
                    type="text"
                    id="start_date"
                    className="shadow border rounded py-1 px-2 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="dd/mm/year"
                    value={vacationStartDate}
                    onChange={(e) => setVacationStartDate(e.target.value)}/>
                <input
                    type="text"
                    id="end_date"
                    className="shadow border rounded py-1 px-2 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="dd/mm/year"
                    value={vacationEndDate}
                    onChange={(e) => setVacationEndDate(e.target.value)}/>

                <div className="flex justify-center space-x-2" onClick={handleSubmitVacation}>
                    <button
                        className="bg-green-300 text-green-950 font-medium border border-green-950 hover:bg-green-200 hover:text-green-900 px-3 py-2 mx-0.5 rounded-lg">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
};

export default AddNewVacationRequest;