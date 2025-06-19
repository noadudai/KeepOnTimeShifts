import React from "react";
import Overview from "./Overview.tsx";
import Employees from "./Employees.tsx";
import Scheduling from "./Scheduling.tsx";
import Vacations from "./Vacations.tsx";

type AdminPages = Record<string,  () => React.JSX.Element>;

export const adminPages: AdminPages = {
    overview: Overview,
    employees: Employees,
    scheduling: Scheduling,
    vacations: Vacations,
};
