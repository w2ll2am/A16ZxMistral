import React from "react";
import Navbar from "../components/Layout/Navbar";
import CameraView from "../components/CameraView/CameraView";
import ChatBox from "../components/ChatBox/ChatBox";
import AlertsTimeline from "../components/AlertsTimeline/AlertsTimeline";
import InteractiveMap from "../components/Map/InteractiveMap";

const Dashboard: React.FC = () => {
  return (
    <div className="ease-soft-in-out relative h-full max-h-screen rounded-xl transition-all duration-200">
      <Navbar />
      <div className="w-full px-6 py-6 mx-auto">
        <div className="flex flex-wrap mt-6 -mx-3">
          <CameraView />

          <div className="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
            <ChatBox />
          </div>
        </div>
        <div className="flex flex-wrap my-6 -mx-3">
          <div className="w-full max-w-full px-3 mt-0 mb-6 md:mb-0 md:w-1/2 md:flex-none lg:w-2/3 lg:flex-none">
            <InteractiveMap />
          </div>
          <div className="w-full max-w-full px-3 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
            <AlertsTimeline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
