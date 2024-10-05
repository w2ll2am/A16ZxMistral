import React from "react";
import CameraCard from "./CameraCard";
import VideoFrame from "./VideoFrame";

const CameraView: React.FC = () => {
  const cameras = ["Camera 1", "Camera 2", "Camera 3"];

  return (
    <div className="w-full px-3 mb-6 lg:mb-0 lg:w-7/12 h-96 lg:h-120">
      <div className="h-full flex flex-wrap -mx-3">
        {cameras.map((camera, index) => (
          <div>
            <CameraCard key={index} cameraName={camera} />
            <VideoFrame streamID={index+1} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraView;
