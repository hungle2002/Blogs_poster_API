import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationServiceService } from './providers/google-authentication.service.service';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
  constructor(
    /**
     * Injecting the google-authentication service
     */
    private readonly googleAuthenticationService: GoogleAuthenticationServiceService,
  ) {}

  @Post()
  public async authenticate(@Body() googleTokenDto: GoogleTokenDto) {
    return await this.googleAuthenticationService.authenticate(googleTokenDto);
  }
}
