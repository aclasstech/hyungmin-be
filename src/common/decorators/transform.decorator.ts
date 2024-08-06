import { Transform } from "class-transformer";
import { castArray, isArray, isNil, trim } from "lodash";

/**
 * Chuyển đổi string sang number
 */
export function ToNumber(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value as string[] | string;

      if (isArray(value)) return value.map((v) => Number(v));

      return Number(value);
    },
    { toClassOnly: true }
  );
}

/**
 * Chuyển đổi string sang int
 */
export function ToInt(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value as string[] | string;

      if (isArray(value)) return value.map((v) => Number.parseInt(v));

      return Number.parseInt(value);
    },
    { toClassOnly: true }
  );
}

/**
 * Chuyển đổi string sang boolean
 */
export function ToBoolean(): PropertyDecorator {
  return Transform(
    (params) => {
      switch (params.value) {
        case "true":
          return true;
        case "false":
          return false;
        default:
          return params.value;
      }
    },
    { toClassOnly: true }
  );
}

/**
 * Chuyển đổi string sang date
 */
export function ToDate(): PropertyDecorator {
  return Transform(
    (params) => {
      const { value } = params;

      if (!value) return;

      return new Date(value);
    },
    { toClassOnly: true }
  );
}

/**
 * Chuyển đổi sang dạng mảng
 */
export function ToArray(): PropertyDecorator {
  return Transform(
    (params) => {
      const { value } = params;

      if (isNil(value)) return [];

      return castArray(value);
    },
    { toClassOnly: true }
  );
}

/**
 * Chuyển đổi về đúng định dạng khoảng trắng
 */
export function ToTrim(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value as string[] | string;

      if (isArray(value)) return value.map((v) => trim(v));

      return trim(value);
    },
    { toClassOnly: true }
  );
}

/**
 * Chuyển đổi về dạng chữ thường
 */
export function ToLowerCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value as string[] | string;

      if (!value) return;

      if (isArray(value)) return value.map((v) => v.toLowerCase());

      return value.toLowerCase();
    },
    { toClassOnly: true }
  );
}

/**
 * Chuyển đổi thành dạng chữ hoa
 */
export function ToUpperCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value as string[] | string;

      if (!value) return;

      if (isArray(value)) return value.map((v) => v.toUpperCase());

      return value.toUpperCase();
    },
    { toClassOnly: true }
  );
}
