import * as crypto from 'crypto';

export const md5 = (str: string) => {
  const md5 = crypto.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
};
