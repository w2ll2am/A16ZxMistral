import json
from dataclasses import dataclass, asdict
from datetime import datetime


@dataclass
class Alert:
    id: str
    type: str
    description: str
    camera_id: int
    long: float
    lat: float
    severity: int
    timestamp: datetime

    def encode_json(self):
        to_dict = asdict(self)
        to_dict["timestamp"] = self.timestamp.timestamp()
        return json.dumps(to_dict)




if __name__ == "__main__":
    alert = Alert(
        "abc", "police", "desc", 1, 100, 200, 3, datetime.now()
    )
    print(alert.encode_json())
