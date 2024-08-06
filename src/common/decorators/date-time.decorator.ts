import * as moment from "moment-timezone";

export const dateTime = moment
  .tz(Date.now(), "Asia/Ho_Chi_Minh")
  .format("YYYY-MM-DD HH:mm:ss");

export const dateTimeZone = moment
  .tz(Date.now(), "Asia/Ho_Chi_Minh")
  .format("YYYY-MM-DD");
