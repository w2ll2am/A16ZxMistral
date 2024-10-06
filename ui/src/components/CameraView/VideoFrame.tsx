import { useVideoFrame } from "../../hooks/useVideoFrame";

// Example usage in a component
const VideoFrame = ({streamID}:{streamID: number}) => {
    const frameData = useVideoFrame(streamID);
    return (
      <div>
        {frameData ? (
          <img 
            src={`data:image/jpeg;base64,${frameData}`} alt="Video frame"
            className="w-[400px] h-[220px] object-cover"
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };
  
  export default VideoFrame;