import React from "react";
import Overview from "./Overview.tsx";
import Employees from "./Employees.tsx";
import Scheduling from "./Scheduling.tsx";
import Vacations from "./Vacations.tsx";

export type Pages = "Overview" | "Employees" | "Scheduling" | "Vacations";

type AdminPages = Record<Pages,  () => React.JSX.Element>;

export const adminPages: AdminPages = {
    "Overview" : Overview,
    "Employees" : Employees,
    "Scheduling" : Scheduling,
    "Vacations" : Vacations,
};
