import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Lookup: Allegation")
@Controller('lookup/allegation')
export class LookupAllegationController { }
