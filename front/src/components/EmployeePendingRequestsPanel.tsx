const EmployeePendingRequestsPanel = () => {

    const pendingActions = (
        <div className="border-8 rounded-xl border-custom-soft-blue h-40 w-40"></div>
    );

    return (
        <div className="flex flex-col gap-4 p-2">
            <h1 className="text-2xl font-opensans text-center">Pending Your Approval</h1>
            <div className="flex justify-evenly">
                {pendingActions}
                {pendingActions}
            </div>
        </div>
    );
};

export default EmployeePendingRequestsPanel;
