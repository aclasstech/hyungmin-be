import { GoogleAuthGuard } from "./google-auth.guard";
import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { GoogleAuthService } from "./google-auth.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Google OAuth")
@Controller("auth")
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get("google-redirect")
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req: any) {
    return this.googleAuthService.googleLogin(req);
  }
}
