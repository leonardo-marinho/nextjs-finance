import { IsEmail, IsString } from 'class-validator';

export class AuthSignUpBodyDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
