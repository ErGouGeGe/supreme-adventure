/*
 * @Author: wangshun@itbox.cn wangshun@itbox.cn
 * @Date: 2024-12-23 02:32:52
 * @LastEditors: wangshun@itbox.cn wangshun@itbox.cn
 * @LastEditTime: 2025-01-03 01:16:34
 */
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;
  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(6, {
    message: '密码不能少于 6 位',
  })
  password: string;

  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @IsEmail(
    {},
    {
      message: '不是合法的邮箱格式',
    },
  )
  email: string;

  @IsNotEmpty({
    message: '验证码不能为空',
  })
  captcha: string;
}
