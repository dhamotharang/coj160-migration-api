import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Litigant: Request")
@Controller('litigant/request')
export class RequestController { }
