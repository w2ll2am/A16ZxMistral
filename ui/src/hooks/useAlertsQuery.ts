import { useQueries } from "react-query";
import { useDispatch } from "react-redux";
import { addOrUpdateAlerts, cleanAlerts } from "../redux/slices/alertsSlice";
import { useEffect } from "react";
import { CLEAN_INTERVAL } from "../utils/constants";
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

  useEffect(() => {
    const cleanInterval = setInterval(() => {
      dispatch(cleanAlerts());
    }, CLEAN_INTERVAL);

    return () => clearInterval(cleanInterval);
  }, [dispatch]);

  const queries = useQueries(
    [1, 2, 3, 4].map((streamId) => ({
      queryKey: ["alerts", streamId],
      queryFn: () => fetchAlerts(streamId),
      onSuccess: (data: any) => {
        if (data && data.length > 0) {
          dispatch(addOrUpdateAlerts(data));
        }
      },
      refetchInterval: FETCH_INTERVAL,
    }))
  );

  return queries;
};
