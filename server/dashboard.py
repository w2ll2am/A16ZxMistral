
from dataclasses import dataclass, asdict
from datetime import datetime


@dataclass
class Alert:
    type: str
    stream_id: int
    long: float
    lat: float
    timestamp: datetime

    def to_dict(self):
        to_dict = asdict(self)
        to_dict["timestamp"] = self.timestamp.timestamp()
        return to_dict



if __name__ == "__main__":
    alert = Alert(
        "police", 1, 100, 200, datetime.now()
    )
    print(alert.to_dict())
