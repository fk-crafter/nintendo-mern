import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";

@Controller("upload")
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_req, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = `${process.env.BASE_URL ?? "http://localhost:5000"}/uploads/${file.filename}`;
    return { imageUrl };
  }
}
