import React from "react";
import { getAlertColor } from "../../utils/constants";
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

const AlertItem: React.FC<AlertItemProps> = ({
  type,
  stream_id,
  timestamp,
  onClick,
}) => {
  // Defensive checks
  if (!type || typeof type !== "string") {
    console.error("Invalid alert type:", type);
    return null;
  }

  const bgColor = getAlertColor(type);
  console.log(type);

  // Ensure type is a string and has a length
  const alertType = type.toLowerCase();
  const capitalizedType =
    alertType.charAt(0).toUpperCase() + alertType.slice(1);

  return (
    <div
      className="relative mb-0 flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
      onClick={onClick}
    >
      <div
        className={`w-8 h-8 rounded-full bg-gradient-to-tl ${bgColor} flex items-center justify-center mr-4`}
      >
        {getAlertIcon(alertType)}
      </div>
      <div className="flex-grow">
        <h6 className="mb-0 text-sm font-semibold leading-normal text-slate-700">
          {capitalizedType} - Stream {stream_id}
          <p className="mt-0 mb-0 text-xs font-semibold leading-tight text-slate-400">
            {new Date(timestamp * 1000).toLocaleString()}
          </p>
        </h6>
      </div>
    </div>
  );
};

export default AlertItem;
