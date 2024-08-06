/** Trích xuất giá trị trả về từ Promise */
type UnboxPromise<T extends Promise<any>> =
  T extends Promise<infer U> ? U : never;

declare type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/** eg: Chuyển đổi result = StringToUnion<'abc'> thành 'a'|'b'|'c' */
type StringToUnion<S extends string> = S extends `${infer S1}${infer S2}`
  ? S1 | StringToUnion<S2>
  : never;

/** Thay chuỗi */
type Replace<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${Right}`
  : Str;

/** Thay toàn bộ chuỗi */
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Left}${From}${infer Right}`
  ? Replace<Replace<`${Left}${To}${Right}`, From, To>, From, To>
  : Str;

/** eg: Chuyển đổi result = CamelCase<'foo-bar-baz'> thành fooBarBaz */
type CamelCase<S extends string> = S extends `${infer S1}-${infer S2}`
  ? S2 extends Capitalize<S2>
    ? `${S1}-${CamelCase<S2>}`
    : `${S1}${CamelCase<Capitalize<S2>>}`
  : S;

/** eg: Chuyển đổi result = StringToArray<'abc'> thành mảng ['a', 'b', 'c'] */
type StringToArray<
  S extends string,
  T extends any[] = [],
> = S extends `${infer S1}${infer S2}` ? StringToArray<S2, [...T, S1]> : T;

/** Các trường bắt buộc */
type RequiredKeys<T> = {
  [P in keyof T]: T extends Record<P, T[P]> ? P : never;
}[keyof T];

/** Các trường không bắt buộc */
type OptionalKeys<T> = {
  [P in keyof T]: object extends Pick<T, P> ? P : never;
}[keyof T];

/** Lấy các trường bắt buộc */
type GetRequired<T> = {
  [P in RequiredKeys<T>]-?: T[P];
};

/** Lấy các trường không bắt buộc */
type GetOptional<T> = {
  [P in OptionalKeys<T>]?: T[P];
};

/**  Kiểm tra sự tồn tại trong mảng result1 = Includes<[1, 2, 3, 4], '4'> kết quả： false; type result2 = Includes<[1, 2, 3, 4], 4> kết quả: true */
type Includes<T extends any[], K> = K extends T[number] ? true : false;

/** eg: Chuyển đổi result = MyConcat<[1, 2], [3, 4]>  thành [1, 2, 3, 4] */
type MyConcat<T extends any[], U extends any[]> = [...T, ...U];
/** eg: Thêm phần tử vào mảng result1 = MyPush<[1, 2, 3], 4> kết quả：[1, 2, 3, 4] */
type MyPush<T extends any[], K> = [...T, K];
/** eg: Xóa phần từ khỏi mảng result3 = MyPop<[1, 2, 3]>  kết quả：[1, 2] */
type MyPop<T extends any[]> = T extends [...infer L, infer R] ? L : never; // eslint-disable-line

type PropType<T, Path extends string> = string extends Path
  ? unknown
  : Path extends keyof T
    ? T[Path]
    : Path extends `${infer K}.${infer R}`
      ? K extends keyof T
        ? PropType<T[K], R>
        : unknown
      : unknown;

/**
 * NestedKeyOf
 * Get all the possible paths of an object
 * @example
 * type Keys = NestedKeyOf<{ a: { b: { c: string } }>
 * // 'a' | 'a.b' | 'a.b.c'
 */
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type RecordNamePaths<T extends object> = {
  [K in NestedKeyOf<T>]: PropType<T, K>;
};
