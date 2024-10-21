import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { ConfigService } from 'src/app/shared/module/config-module/config.service';
@Injectable()
export class NotificationCommunicator {
  private logger: Logger = new Logger(NotificationCommunicator.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

}
