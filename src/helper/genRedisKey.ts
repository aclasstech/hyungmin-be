import { RedisKeys } from "~/constants/cache.constant";

/** Tạo redis key */
export function genCaptchaImgKey(val: string | number) {
  return `${RedisKeys.CAPTCHA_IMG_PREFIX}${String(val)}` as const;
}

/** Tạo auth token redis key */
export function genAuthTokenKey(val: string | number) {
  return `${RedisKeys.AUTH_TOKEN_PREFIX}${String(val)}` as const;
}
/** Tạo auth permission redis key */
export function genAuthPermKey(val: string | number) {
  return `${RedisKeys.AUTH_PERM_PREFIX}${String(val)}` as const;
}
/** Tạo auth passwordVersion redis key */
export function genAuthPVKey(val: string | number) {
  return `${RedisKeys.AUTH_PASSWORD_V_PREFIX}${String(val)}` as const;
}
/** Tạo online user redis key */
export function genOnlineUserKey(tokenId: string) {
  return `${RedisKeys.ONLINE_USER_PREFIX}${String(tokenId)}` as const;
}
/** Tạo token blacklist redis key */
export function genTokenBlacklistKey(tokenId: string) {
  return `${RedisKeys.TOKEN_BLACKLIST_PREFIX}${String(tokenId)}` as const;
}
