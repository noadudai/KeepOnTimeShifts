import {Link} from "react-router-dom";
import React from "react";

const SideBarMenu = () => {

    return (
        <div className="absolute left-0 top-16 z-50">
            <div className="rounded overflow-hidden border border-teal-700/80 shadow-lg px-6 py-4 bg-teal-800/40 ">
                <Link className="bg-green-950 text-white font-medium text-l hover:bg-green-950/90 hover:text-white px-2 py-2 rounded-lg" to="admins-panel">Manager's Panel</Link>
            </div>
        </div>
    );
}

export default SideBarMenu;