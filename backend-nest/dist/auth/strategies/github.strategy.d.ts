import { Strategy } from "passport-github2";
import { AuthService } from "../auth.service";
import { Profile } from "passport";
declare const GithubStrategy_base: new (...args: [options: import("passport-github2").StrategyOptionsWithRequest] | [options: import("passport-github2").StrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class GithubStrategy extends GithubStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: Error | null, user?: Express.User | false) => void): Promise<void>;
}
export {};
