import React from "react";
import {
  AlertTriangle,
  Flame,
  Cloud,
  Users,
  Shield,
  UserX,
} from "lucide-react";

interface AlertItemProps {
  type: string;
  stream_id: number;
  long: number;
  lat: number;
  timestamp: number;
  onClick: () => void;
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case "fire":
      return (
        <Flame className="relative z-10 leading-none text-transparent bg-gradient-to-tl from-red-600 to-rose-400 bg-clip-text fill-transparent" />
      );
    case "smoke":
      return (
        <Cloud className="relative z-10 leading-none text-transparent bg-gradient-to-tl from-gray-600 to-gray-400 bg-clip-text fill-transparent" />
      );
    case "responders":
      return (
        <Shield className="relative z-10 leading-none text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text fill-transparent" />
      );
    case "formations":
      return (
        <Users className="relative z-10 leading-none text-transparent bg-gradient-to-tl from-green-600 to-lime-400 bg-clip-text fill-transparent" />
      );
    case "crowds":
      return (
        <Users className="relative z-10 leading-none text-transparent bg-gradient-to-tl from-yellow-600 to-yellow-400 bg-clip-text fill-transparent" />
      );
    case "crush":
      return (
        <UserX className="relative z-10 leading-none text-transparent bg-gradient-to-tl from-purple-600 to-pink-400 bg-clip-text fill-transparent" />
      );
    default:
      return (
        <AlertTriangle className="relative z-10 leading-none text-transparent bg-gradient-to-tl from-orange-600 to-orange-400 bg-clip-text fill-transparent" />
      );
  }
};

const AlertItem: React.FC<AlertItemProps> = ({
  type,
  stream_id,
  timestamp,
  onClick,
}) => {
  return (
    <div
      className="relative mb-4 after:clear-both after:table after:content-['']"
      onClick={onClick}
    >
      <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
        {getAlertIcon(type)}
      </span>
      <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
        <h6 className="mb-0 text-sm font-semibold leading-normal text-slate-700">
          {type.charAt(0).toUpperCase() + type.slice(1)} Alert - Stream{" "}
          {stream_id}
        </h6>
        <p className="mt-1 mb-0 text-xs font-semibold leading-tight text-slate-400">
          {new Date(timestamp * 1000).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default AlertItem;
