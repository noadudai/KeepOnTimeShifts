import RequestStatusLabel from "./RequestStatusLabel.tsx";
import {BiCheckCircle} from "react-icons/bi";
import {IoBan} from "react-icons/io5";

const EmployeePendingRequests = () => {
    return (
        <div>
            <h1 className="flex justify-center text-2xl font-opensans">Pending Your Approval</h1>
            <div className="flex justify-between ">
                <div className="place-self-start flex gap-1 p-2">
                    <RequestStatusLabel status={"Approve"} backgroundColor={'bg-custom-pastel-green'}
                                        icon={BiCheckCircle}/>
                    <RequestStatusLabel status={"Deny"} backgroundColor={'bg-custom-warm-coral-pink'} icon={IoBan}/>
                </div>
            </div>
        </div>
    );
};

export default EmployeePendingRequests;