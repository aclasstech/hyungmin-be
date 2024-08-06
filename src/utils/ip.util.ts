import type { FastifyRequest } from "fastify";
/**
 * @module utils/ip
 * @description IP utility functions
 */
import type { IncomingMessage } from "node:http";
import axios from "axios";

/* Xác định xem IP có phải là mạng nội bộ hay không */
function isLAN(ip: string) {
  ip.toLowerCase();
  if (ip === "localhost") return true;
  let a_ip = 0;
  if (ip === "") return false;
  const aNum = ip.split(".");
  if (aNum.length !== 4) return false;
  a_ip += Number.parseInt(aNum[0]) << 24;
  a_ip += Number.parseInt(aNum[1]) << 16;
  a_ip += Number.parseInt(aNum[2]) << 8;
  a_ip += Number.parseInt(aNum[3]) << 0;
  a_ip = (a_ip >> 16) & 0xffff;
  return (
    a_ip >> 8 === 0x7f ||
    a_ip >> 8 === 0xa ||
    a_ip === 0xc0a8 ||
    (a_ip >= 0xac10 && a_ip <= 0xac1f)
  );
}

export function getIp(request: FastifyRequest | IncomingMessage) {
  const req = request as any;

  let ip: string =
    request.headers["x-forwarded-for"] ||
    request.headers["X-Forwarded-For"] ||
    request.headers["X-Real-IP"] ||
    request.headers["x-real-ip"] ||
    req?.ip ||
    req?.raw?.connection?.remoteAddress ||
    req?.raw?.socket?.remoteAddress ||
    undefined;
  if (ip && ip.split(",").length > 0) ip = ip.split(",")[0];

  return ip;
}

export async function getIpAddress(ip: string) {
  if (isLAN(ip)) return "IP nội bộ";
  try {
    const apiKey = process.env.IPGEO_API_KEY;
    const response = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`
    );
    const data = response.data;
    return data.country_name || "Địa chỉ không xác định";
  } catch (error) {
    return "Yêu cầu truy cập IP không thành công";
  }
}
