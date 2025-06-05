import React from 'react';

const RequestStatusLabel = ({status, backgroundColor, icon}: {status: string, backgroundColor:string, icon: (props: {size?: number}) => React.JSX.Element}) => {
    return (
        <div
            className={`flex items-center bg-${backgroundColor} text-xs text-black gap-2 rounded-xl p-2`}>
            {icon ({size: 20})}
            <h1 className="font-opensans">{status}</h1>
        </div>
    );
};

export default RequestStatusLabel;