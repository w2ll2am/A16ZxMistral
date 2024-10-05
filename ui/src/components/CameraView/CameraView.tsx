import React from "react";
import VideoFrame from "./VideoFrame";

const CameraView: React.FC = () => {
  const cameras = [1,2,3,4];

  return (
    <div className="flex flex-wrap w-[70%] px-3 mb-6 lg:mb-0 h-96 ">
        {cameras.map((camera) => (
          <div className="w-[400px] px-1 mb-6">
            <div className="
              relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border 
              p-4
            ">
              <VideoFrame streamID={camera}></VideoFrame>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CameraView;
