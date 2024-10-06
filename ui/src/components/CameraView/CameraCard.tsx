import React from "react";
import { Users, Shield, Volume2, BadgeAlert } from "lucide-react";

interface AlertType {
  type: "crowd" | "police" | "formation" | "audio";
}

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
