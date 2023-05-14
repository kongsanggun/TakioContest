import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import puppeteer, { executablePath } from 'puppeteer-core';

// TODO : 추후 환경 변수 적용 및 최적화 예정

@Injectable()
export class AppService {}
