import React from "react";
import VideoFrame from "./VideoFrame";

const CameraView: React.FC = () => {
  const cameras = [1,2,3,4];

  return (
    <div className="flex flex-wrap pl-3 gap-y-2 w-[840px] ">
        {cameras.map((camera) => (
          <div className="w-[410px] px-1">
            <div className="
              relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-[5px] bg-clip-border 
              p-2
            ">
              <VideoFrame streamID={camera}></VideoFrame>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CameraView;
