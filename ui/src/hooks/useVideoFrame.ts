import { useState, useEffect, useRef } from 'react';

const STREAM_URL = "http://localhost:5000/stream/";

export const useVideoFrame = (streamID: number) => {
	const apiEndpoint = STREAM_URL + streamID.toString();
  	const [frameData, setFrameData] = useState<string|null>(null);
	const frameIntervalRef = useRef<number|null>(null);

	useEffect(() => {
		const fetchFrame = async () => {
		try {
			const response = await fetch(apiEndpoint);
			const data = await response.text(); // Assuming the API returns base64 text
			setFrameData(data);
		} catch (error) {
			console.error('Error fetching frame:', error);
		}
		};

		// Start fetching frames
		fetchFrame();
		frameIntervalRef.current = setInterval(fetchFrame, 100); // 30 fps

		// Cleanup function
		return () => {
			if (frameIntervalRef.current) {
				clearInterval(frameIntervalRef.current);
			}
		};
	}, [apiEndpoint]);

	return frameData;
};

