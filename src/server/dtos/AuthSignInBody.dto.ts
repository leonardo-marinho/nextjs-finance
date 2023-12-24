import { IsEmail, IsString } from 'class-validator';

export class AuthSignInBody {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
