import {Link} from "react-router-dom";

function ScheduleOptionsNavbar() {
    return (
        <div>
            <nav className="bg-indigo-200 border border-indigo-300 rounded-sm shadow-sm">
                <div className="flex items-center justify-between p-1">
                    <div className="flex items-center pl-8 p-2 shadow-sms">
                        <h1 className="text-4xl font-bold text-neutral-700">Schedule Options</h1>
                    </div>
                    <div className="flex items-center justify-between p-2">
                        <div className="bg-indigo-100 text-neutral-500 font-medium hover:text-white border border-indigo-300 hover:bg-indigo-400 px-3 py-2 mx-0.5 rounded-lg">
                            <Link to="/">Home page</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default ScheduleOptionsNavbar;