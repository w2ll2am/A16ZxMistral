import { useQueries } from "react-query";
import { useDispatch } from "react-redux";
import { addAlerts, decrementTTL } from "../redux/slices/alertsSlice";
import { useEffect } from "react";
const TTL_DECREMENT_INTERVAL = 100; // 100ms
const FETCH_INTERVAL = 3000; // 3 seconds

const fetchAlerts = async (streamId: number) => {
  const response = await fetch(
    `http://localhost:8000/stream/alert/${streamId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useAlertsQuery = () => {
  const dispatch = useDispatch();

  const queries = useQueries(
    [1, 2, 3, 4].map((streamId) => ({
      queryKey: ["alerts", streamId],
      queryFn: () => fetchAlerts(streamId),
      onSuccess: (data: any) => {
        if (data && data.length > 0) {
          dispatch(addAlerts(data));
        }
      },
      refetchInterval: FETCH_INTERVAL,
    }))
  );

  // Set up TTL decrement interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(decrementTTL());
    }, TTL_DECREMENT_INTERVAL);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return queries;
};
