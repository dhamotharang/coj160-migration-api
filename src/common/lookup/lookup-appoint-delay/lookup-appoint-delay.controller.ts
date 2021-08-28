import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Lookup: Appoint delay")
@Controller('lookup/appointDelay')
export class LookupAppointDelayController { }
