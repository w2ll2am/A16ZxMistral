import React from "react";
import { useSelector } from "react-redux";
import VideoFrame from "./VideoFrame";
import { RootState } from "../../redux/store";
import { selectAlertsByStreamId } from "../../redux/slices/alertsSlice";

const getAlertBorderColor = (alerts: any[]): string => {
  const redAlerts = ["fire", "smoke", "crush"];
  const yellowAlerts = ["responders", "formations", "crowds"];

  if (alerts.some((alert) => redAlerts.includes(alert.type.toLowerCase()))) {
    return "border-red-600";
  } else if (
    alerts.some((alert) => yellowAlerts.includes(alert.type.toLowerCase()))
  ) {
    return "border-yellow-600";
  } else {
    return "border-gray-300"; // Default to gray if no red or yellow alerts
  }
};

const CameraView: React.FC = () => {
  const cameras = [1, 2, 3, 4];

  return (
    <div className="flex flex-wrap pl-3 gap-y-2 w-[840px]">
      {cameras.map((camera) => {
        const alerts = useSelector((state: RootState) =>
          selectAlertsByStreamId(state, camera)
        );

        const firstAlert = !!alerts[0];
        const borderColor = getAlertBorderColor(alerts);

        return (
          <div key={camera} className="w-[410px] px-1">
            <div
              className={`relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-[5px] bg-clip-border p-2 border-4 ${borderColor}`}
            >
              <VideoFrame streamID={camera} />
              {firstAlert && (
                <div className="absolute top-0 left-0 m-2 px-2 py-1 bg-white bg-opacity-75 rounded text-sm font-semibold">
                  {firstAlert.type}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CameraView;
