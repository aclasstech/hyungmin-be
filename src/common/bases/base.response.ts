import { Types } from "mongoose";

export class BaseResponse {
  constructor() {}

  get(data: any) {
    return formatData(data["_doc"]);
  }
}

function formatData(obj: any): any {
  if (obj instanceof Array) {
    console.log("-----obj", obj)
    return obj.map((item) => formatData(item));
  } else if (obj instanceof Object) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === "_id") {
        let temp = value;
        if (value instanceof Types.ObjectId) {
          temp = value.toHexString();
        }
        if (value instanceof Buffer) {
          temp = value.toString("hex");
        }
        result["id"] = temp;
      } else if (value instanceof Date) {
        result[key] = value.toISOString();
      } else if (value instanceof Object || value instanceof Array) {
        result[key] = formatData(value);
      } else {
        result[key] = value;
      }

      if (key === "__v") {
        delete result[key];
      }
    }
    return result;
  }
  return obj;
}
