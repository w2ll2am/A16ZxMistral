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
    <div className="border-black/12.5 shadow-soft-xl relative flex h-[1000px] flex-col break-words rounded-xl border-0 border-solid bg-white bg-clip-border">
      <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white px-6 pt-2 pb-2">
        <h6 className="mb-0">Alerts overview</h6>
      </div>
      <div className="flex-auto px-4 py-1 overflow-hidden">
        <div className="h-[150px] overflow-y-auto">
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
  );
};

export default AlertsTimeline;
