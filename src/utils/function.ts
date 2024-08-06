import moment from "moment";
import { generateCode } from "./tool.util";
import { BusinessException } from "~/common/exceptions/biz.exception";
import * as bcrypt from "bcryptjs";
import momentzone from "moment-timezone";

export const PASSWORD_DEFAULT = `A1${new Date().getFullYear()}a@`;

export const verifyPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export const hashPassword = (password?: string) => {
  let result = PASSWORD_DEFAULT;
  if (password) result = password;
  return bcrypt.hashSync(result, 10);
};

export const getRenderCode = (
  key: string,
  value: number = 0,
  option: number = 4
) => {
  const result = String(value).padStart(option, "0");
  return key + result;
};

export const isCheckDosFile = (filename: string, last: string) => {
  if (!filename) return false;
  const cutString = filename.split(".");
  return cutString[cutString.length - 1] === last;
};

export const getTitleInClass = (className: string) => {
  if (!className)
    return {
      code: "",
      facilityName: "",
    };
  const cutString = className.split("_");
  return {
    code: cutString[0],
    facilityName: cutString[cutString.length - 1],
  };
};

export const getCodeStudent = (year: string, value: number) => {
  return `A1.${parseInt(year, 10)}.${generateCode(value + 1)}`;
};

export const formatPhoneNumber = (value: string | number) => {
  if (!value) return "";
  const phoneNumber: string = value.toString();
  return phoneNumber.replace(/^(\d{0,10})$/, "0$1");
};

export const isSameOrAfterDate = (inputDate: Date) => {
  const currentDate = moment();
  const dateToCheck = moment(inputDate);

  if (!dateToCheck.isValid()) {
    throw new BusinessException("400:Invalid date format");
  }

  return dateToCheck.isSameOrAfter(currentDate, "day");
};

export function countSpecificDays(expirationDate, targetDayOfWeek) {
  const daysOfWeek = {
    "Chủ nhật": 0,
    "Thứ 2": 1,
    "Thứ 3": 2,
    "Thứ 4": 3,
    "Thứ 5": 4,
    "Thứ 6": 5,
    "Thứ 7": 6,
  };

  const endDate = new Date(expirationDate);
  const currentDate = new Date();

  if (isNaN(endDate.getTime())) {
    throw new Error("Ngày hết hạn không hợp lệ");
  }

  const targetDay = daysOfWeek[targetDayOfWeek];

  if (targetDay === undefined) {
    throw new Error("Thứ không hợp lệ");
  }

  let count = 0;
  let current = new Date(currentDate);

  while (current <= endDate) {
    if (current.getDay() === targetDay) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
}

export const getTimeZoneUTC = (value?: string, format?: string) => {
  const date = value ? momentzone(value, format || "YYYY-MM-DD") : momentzone();

  if (!date.isValid()) {
    throw new BusinessException("400: Invalid date format");
  }

  const startOfDay = date.startOf("day").tz("Asia/Ho_Chi_Minh").toDate();
  const endOfDay = date.endOf("day").tz("Asia/Ho_Chi_Minh").toDate();

  const startOfDayUTC = momentzone(startOfDay).utc().toDate();
  const endOfDayUTC = momentzone(endOfDay).utc().toDate();

  return { startOfDay: startOfDayUTC, endOfDay: endOfDayUTC };
};

export const formatDate = (date) => date.toISOString().split("T")[0];

export function getFirstAndLastDay(monthYear: string) {
  if (!monthYear) return {};
  const [month, year] = monthYear.split("/").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const firstDayNextMonth: any = new Date(year, month, 1);
  const lastDay = new Date(firstDayNextMonth - 1);

  return {
    startOfDay: getTimeZoneUTC(formatDate(firstDay)).startOfDay,
    endOfDay: getTimeZoneUTC(formatDate(lastDay)).endOfDay,
  };
}

export function getStartAndEndOfYear() {
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const endOfYear = new Date(currentYear, 11, 31);

  return {
    startOfDay: getTimeZoneUTC(formatDate(startOfYear)).startOfDay,
    endOfDay: getTimeZoneUTC(formatDate(endOfYear)).endOfDay,
  };
}
