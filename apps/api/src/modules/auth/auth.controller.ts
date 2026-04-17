import { Controller } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {}
