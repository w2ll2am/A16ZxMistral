import React from "react";
import { Users, Shield, Volume2, BadgeAlert } from "lucide-react";

interface AlertType {
  type: "crowd" | "police" | "formation" | "audio";
}

interface CameraCardProps {
  cameraName: string;
  alertType: AlertType["type"];
}

const getAlertIcon = (type: AlertType["type"]) => {
  switch (type) {
    case "crowd":
      return <Users className="h-12 w-12" />;
    case "police":
      return <BadgeAlert className="h-12 w-12" />;
    case "formation":
      return <Shield className="h-12 w-12" />;
    case "audio":
      return <Volume2 className="h-12 w-12" />;
    default:
      return <Users className="h-12 w-12" />;
  }
};

const CameraCard: React.FC<CameraCardProps> = ({ cameraName, alertType }) => {
  return (
    <div className="w-full h-full lg:w-4/12 px-3 mb-6">
      <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border h-full">
        <div className="flex-auto p-4 h-full">
          <div className="flex flex-wrap -mx-3 h-full">
            <div className="w-full px-3 flex flex-col justify-center items-center text-center h-full">
              <div className="h-full w-full flex flex-col justify-center items-center bg-gradient-to-tl from-purple-700 to-pink-500 rounded-xl p-4">
                {/* Alert Icon */}
                <div className="text-white mb-4">{getAlertIcon(alertType)}</div>
                {/* Camera Name */}
                <h5 className="font-bold text-white">{cameraName}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CameraCardWrapperProps {
  cameraName: string;
}

const CameraCardWrapper: React.FC<CameraCardWrapperProps> = ({
  cameraName,
}) => {
  const alertTypes: AlertType["type"][] = [
    "crowd",
    "police",
    "formation",
    "audio",
  ];
  const randomAlertType =
    alertTypes[Math.floor(Math.random() * alertTypes.length)];

  return <CameraCard cameraName={cameraName} alertType={randomAlertType} />;
};

export default CameraCardWrapper;
