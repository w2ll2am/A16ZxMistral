import { useQueries } from "react-query";
import { useDispatch } from "react-redux";
import { addAlerts } from "../redux/slices/alertsSlice";

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
      refetchInterval: 3000, // Refetch every 5 seconds
    }))
  );

  return queries;
};
