import { HttpException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

type multerOptionsT = {
  maxFileSize?: number;
  type?: 'image' | 'book';
};

export const multerOptions = ({ maxFileSize = 2 * 1024 * 1024, type = 'image' }: multerOptionsT) => {
  const UPLOAD_LOCATION = 'uploads';
  const fileValidation = { image: /\.(jpg)$/, book: /\.(pdf)$/ }[type];

  return {
    limits: {
      fileSize: maxFileSize,
    },

    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(fileValidation)) {
        return callback(new HttpException(`Only ${type} files are allowed!`, 500), false);
      }
      callback(null, true);
    },

    storage: diskStorage({
      destination: (req: any, file: any, cb: any) => {
        const uploadPath = UPLOAD_LOCATION;

        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
      },
      filename: (req: any, file: any, cb: any) => {
        cb(null, `${uuid().replace(/-/g, '')}${extname(file.originalname)}`);
      },
    }),
  };
};

export const multerImageOptions = multerOptions({type: "image"});
export const multerBookOptions = multerOptions({ type: 'book' });
