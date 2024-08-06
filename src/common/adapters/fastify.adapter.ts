import { FastifyAdapter } from "@nestjs/platform-fastify";
import FastifyCookie from "@fastify/cookie";
import FastifyMultipart from "@fastify/multipart";

const app: FastifyAdapter = new FastifyAdapter({
  trustProxy: true,
  logger: false,
  // forceCloseConnections: true,
});

// Chuyển phần cấu hình của FastifyMultipart vào trong phần đăng ký
app.register(FastifyMultipart, {
  limits: {
    fields: 10,
    fileSize: 1024 * 1024 * 6, // Giới hạn 6M
    files: 5,
  },
});

app.register(FastifyCookie, {
  secret: "cookie-secret",
});

app.getInstance().addHook("onRequest", (request, reply, done) => {
  // Thiết lập nguồn không xác định
  const { origin } = request.headers;
  if (!origin) request.headers.origin = request.headers.host;

  const { url } = request;

  if (url.endsWith(".php")) {
    reply.raw.statusMessage = "Không hỗ trợ ngôn ngữ PHP";

    return reply.code(418).send();
  }

  if (url.match(/favicon.ico$/) || url.match(/manifest.json$/))
    return reply.code(204).send();

  done();
});

export { app as fastifyApp };
