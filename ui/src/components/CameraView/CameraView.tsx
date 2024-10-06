import React from "react";
import { useSelector } from "react-redux";
import VideoFrame from "./VideoFrame";
import { getAlertColor } from "../../utils/constants";
import { RootState } from "../../redux/store";
import { selectAlertsByStreamId } from "../../redux/slices/alertsSlice";

const CameraView: React.FC = () => {
  const cameras = [1, 2, 3, 4];

  return (
    <div className="flex flex-wrap pl-3 gap-y-2 w-[840px]">
      {cameras.map((camera) => {
        const alerts = useSelector((state: RootState) =>
          selectAlertsByStreamId(state, camera)
        );
        const alertTypes = alerts.map((alert) => alert.type);
        const borderColors = alertTypes.map(getAlertColor);

        return (
          <div key={camera} className="w-[410px] px-1">
            <div
              className={`
                relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-[5px] bg-clip-border
                p-2 border-4 ${
                  borderColors.length > 0
                    ? `bg-gradient-to-r ${borderColors.join(" ")}`
                    : ""
                }
              `}
            >
              <VideoFrame streamID={camera} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CameraView;
