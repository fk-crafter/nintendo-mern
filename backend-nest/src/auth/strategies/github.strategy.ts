import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Strategy } from "passport-github2";
import { AuthService } from "../auth.service";
import { Profile } from "passport";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: `${process.env.BACKEND_URL}/auth/github/callback`,
      scope: ["user:email"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: Error | null, user?: Express.User | false) => void,
  ): Promise<void> {
    const email = profile.emails?.[0]?.value;
    const name = profile.displayName || profile.username || "Unknown";

    if (!email) {
      return done(new Error("No email from GitHub"));
    }

    const user = await this.authService.validateOAuthLogin(
      email,
      name,
      "GITHUB",
    );

    return done(null, user);
  }
}
