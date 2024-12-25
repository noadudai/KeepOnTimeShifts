import LoginButton from "./login.tsx";

const HomePageNavbar = () => {

    return (
        <div>
            <nav className="bg-green-400 rounded-sm shadow-sm">
                <div className="flex items-center justify-between p-1">
                    <button className="group h-10 w-10 rounded-md border border-lime-950 hover:bg-green-300">
                        <div className="grid justify-items-center gap-1.5">
                            <div className="bg-lime-950 hover:bg-green-900 h-1 w-8 rounded-full"></div>
                            <div className="bg-lime-950 hover:bg-green-900 h-1 w-8 rounded-full"></div>
                            <div className="bg-lime-950 hover:bg-green-900 h-1 w-8 rounded-full"></div>
                        </div>
                    </button>
                    <div className="flex items-center pl-8 p-2 shadow-sms">
                        <h1 className="text-4xl text-green-950">Keep On Time Shifts</h1>
                    </div>
                    <LoginButton />
                </div>
            </nav>
        </div>
    );
}

export default HomePageNavbar;