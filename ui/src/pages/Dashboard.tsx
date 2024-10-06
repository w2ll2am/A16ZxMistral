import React from "react";
import Navbar from "../components/Layout/Navbar";
import CameraView from "../components/CameraView/CameraView";
import ChatBox from "../components/ChatBox/ChatBox";
import AlertsTimeline from "../components/AlertsTimeline/AlertsTimeline";
import InteractiveMap from "../components/Map/InteractiveMap";
import Graph from "../components/GraphView/Graph";

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="flex ease-soft-in-out relative h-full max-h-screen rounded-xl transition-all duration-200 p-2">
        <div className="flex flex-col -mx-3 w-min">    
          <CameraView />
          <div className="w-full px-3 mt-0 mb-6 ">
            <InteractiveMap />
          </div>

        </div>
        <div className="flex flex-col pl-3 w-full justify-start gap-y-2">
          <h1 className="text-right text-4xl font-black pr-4 py-1">DROPOUT</h1>
          <AlertsTimeline />
          <ChatBox />
        </div>
      </div>
      
      <div className="mt-20 p-2 flex flex-wrap w-full">
        <Graph/>
        <Graph/>
        <Graph/>
        <Graph/>
      </div>
    </div>
    
  );
};

export default Dashboard;
