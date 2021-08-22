import { createParamDecorator, Logger } from '@nestjs/common';
import CryptoJS = require('crypto-js');

export const User = createParamDecorator((data, req) => {
  const userData = req.args[0].user;
  const bytes = CryptoJS.AES.decrypt(userData.payload, process.env.SECRET);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
});
