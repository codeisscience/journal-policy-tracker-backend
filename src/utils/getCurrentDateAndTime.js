import dayjs from "dayjs";

export const getCurrentDateAndTime = () => {
  return dayjs().format("DD-MMM-YYYY HH:mm:ss Z [UTC]");
};
