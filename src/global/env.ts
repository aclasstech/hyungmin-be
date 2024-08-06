export const isDev = process.env.NODE_ENV === "development";

export const isTest = !!process.env.TEST;
export const cwd = process.cwd();

/**
 * Các kiểu dữ liệu cơ bản
 */
export type BaseType = boolean | number | string | undefined | null;

/**
 * Định nghĩa các biến môi trường
 * @param key Giá trị chính
 * @param defaultValue Giá trị mặc định
 * @param callback Định dạng
 */
function fromatValue<T extends BaseType = string>(
  key: string,
  defaultValue: T,
  callback?: (value: string) => T
): T {
  const value: string | undefined = process.env[key];
  if (typeof value === "undefined") return defaultValue;

  if (!callback) return value as unknown as T;

  return callback(value);
}

export function env(key: string, defaultValue: string = "") {
  return fromatValue(key, defaultValue);
}

export function envString(key: string, defaultValue: string = "") {
  return fromatValue(key, defaultValue);
}

export function envNumber(key: string, defaultValue: number = 0) {
  return fromatValue(key, defaultValue, (value) => {
    try {
      return Number(value);
    } catch {
      throw new Error(`${key} biến môi trường không phải dạng số`);
    }
  });
}

export function envBoolean(key: string, defaultValue: boolean = false) {
  return fromatValue(key, defaultValue, (value) => {
    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(`${key} biến môi trường không phải dạng boolean`);
    }
  });
}
