import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSortedAlerts, Alert } from "../../redux/slices/alertsSlice";
import { useAlertsQuery } from "../../hooks/useAlertsQuery";
import AlertItem from "./AlertItem";
import { useChat } from "../../hooks/useChat";

const AlertsTimeline: React.FC = () => {
  const sortedAlerts = useSelector(selectSortedAlerts);
  const [displayedAlerts, setDisplayedAlerts] = useState<Alert[]>([]);
  const { sendMessage } = useChat();
  useAlertsQuery();

  useEffect(() => {
    const newAlerts = sortedAlerts.filter(
      (alert) =>
        !displayedAlerts.some(
          (displayedAlert) =>
            displayedAlert.type === alert.type &&
            displayedAlert.stream_id === alert.stream_id &&
            displayedAlert.timestamp === alert.timestamp
        )
    );

    if (newAlerts.length > 0) {
      setDisplayedAlerts((prevAlerts) => [...newAlerts, ...prevAlerts]);
    }
  }, [sortedAlerts]);

  const handleAlertClick = (alert: Alert) => {
    if (alert) {
      sendMessage(
        `Tell me more about the ${alert.type} alert in stream ${alert.stream_id}`
      );
    }
  };

  return (
    <div className="w-full max-w-full px-3 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
      <div className="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
        <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
          <h6 className="mb-0">Alerts overview</h6>
        </div>
        <div className="flex-auto p-4 overflow-hidden">
          <div className="h-[calc(100vh-230px)] overflow-y-auto">
            <div className="relative">
              {displayedAlerts.map((alert, index) => (
                <AlertItem
                  key={`${alert.stream_id}-${alert.type}-${alert.timestamp}-${index}`}
                  {...alert}
                  onClick={() => handleAlertClick(alert)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsTimeline;
