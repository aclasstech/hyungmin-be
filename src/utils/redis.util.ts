import { RedisKeys } from "src/constants/cache.constant";

type Prefix = "a1-math-club";
const prefix = "a1-math-club";

export function getRedisKey<T extends string = RedisKeys | "*">(
  key: T,
  ...concatKeys: string[]
): `${Prefix}:${T}${string | ""}` {
  return `${prefix}:${key}${
    concatKeys && concatKeys.length ? `:${concatKeys.join("_")}` : ""
  }`;
}
