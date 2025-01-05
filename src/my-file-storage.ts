/*
 * @Author: wangshun@itbox.cn wangshun@itbox.cn
 * @Date: 2025-01-06 00:57:22
 * @LastEditors: wangshun@itbox.cn wangshun@itbox.cn
 * @LastEditTime: 2025-01-06 01:05:54
 */
import * as multer from 'multer';
import * as fs from 'fs';
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync('uploads');
    } catch (error) {
      console.log(error);
    }
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, uniqueSuffix);
  },
});
