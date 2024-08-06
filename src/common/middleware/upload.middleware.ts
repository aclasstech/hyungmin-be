import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import multer from "multer";

@Injectable()
export class UploadMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const storage = multer.memoryStorage();
    const upload = multer({ storage }).single("file");

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.status(400).send("Lỗi khi upload file.");
      } else if (err) {
        res.status(500).send("Lỗi server.");
      } else {
        next();
      }
    });
  }
}
