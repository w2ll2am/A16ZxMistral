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

// const CameraCard: React.FC<CameraCardProps> = ({ cameraName, alertType }) => {
//   return (
    
//   );
// };

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
