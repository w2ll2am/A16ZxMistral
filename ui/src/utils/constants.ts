export const getAlertColor = (type: string): string => {
  switch (type) {
    case "fire":
    case "smoke":
    case "crush":
      return "from-red-600 to-rose-400";
    default:
      return "from-yellow-600 to-yellow-400";
  }
};

export const getAlertBorderColor = (type: string): string => {
  switch (type) {
    case "fire":
    case "smoke":
    case "crush":
      return "border-red-600";
    default:
      return "border-yellow-600";
  }
};
