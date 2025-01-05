/*
 * @Author: wangshun@itbox.cn wangshun@itbox.cn
 * @Date: 2024-12-22 02:08:04
 * @LastEditors: wangshun@itbox.cn wangshun@itbox.cn
 * @LastEditTime: 2025-01-03 00:59:52
 */
import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
}
