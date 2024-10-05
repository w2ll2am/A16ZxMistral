import React from "react";

interface AlertItemProps {
  title: string;
  timestamp: string;
}

const AlertItem: React.FC<AlertItemProps> = ({ title, timestamp }) => {
  return (
    <div className="relative mb-4 after:clear-both after:table after:content-['']">
      <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
        <i className="relative z-10 text-transparent ni ni-bell-55 leading-pro bg-gradient-to-tl from-green-600 to-lime-400 bg-clip-text fill-transparent"></i>
      </span>
      <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
        <h6 className="mb-0 font-semibold leading-normal text-sm text-slate-700">
          {title}
        </h6>
        <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default AlertItem;
