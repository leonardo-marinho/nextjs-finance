import env from 'env-var';

class JwtConfig {
  expiresIn: string;
  secret: string;

  constructor() {
    this.expiresIn = env.get('JWT_EXPIRES_IN').required().asString();
    this.secret = env.get('JWT_SECRET_TOKEN').required().asString();
  }
}

export default JwtConfig;
