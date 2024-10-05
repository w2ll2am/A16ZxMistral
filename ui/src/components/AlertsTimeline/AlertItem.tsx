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
  const iconProps = {
    size: 20,
    className: "text-white",
  };

  switch (type) {
    case "fire":
      return <Flame {...iconProps} />;
    case "smoke":
      return <Cloud {...iconProps} />;
    case "responders":
      return <Shield {...iconProps} />;
    case "formations":
      return <Users {...iconProps} />;
    case "crowds":
      return <Users {...iconProps} />;
    case "crush":
      return <UserX {...iconProps} />;
    default:
      return <AlertTriangle {...iconProps} />;
  }
};

const getAlertColor = (type: string) => {
  switch (type) {
    case "fire":
      return "from-red-600 to-rose-400";
    case "smoke":
      return "from-gray-600 to-gray-400";
    case "responders":
      return "from-blue-600 to-cyan-400";
    case "formations":
      return "from-green-600 to-lime-400";
    case "crowds":
      return "from-yellow-600 to-yellow-400";
    case "crush":
      return "from-purple-600 to-pink-400";
    default:
      return "from-orange-600 to-orange-400";
  }
};

const AlertItem: React.FC<AlertItemProps> = ({
  type,
  stream_id,
  timestamp,
  onClick,
}) => {
  const bgColor = getAlertColor(type);

  return (
    <div
      className="relative mb-4 flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
      onClick={onClick}
    >
      <div
        className={`w-10 h-10 rounded-full bg-gradient-to-tl ${bgColor} flex items-center justify-center mr-4`}
      >
        {getAlertIcon(type)}
      </div>
      <div className="flex-grow">
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
