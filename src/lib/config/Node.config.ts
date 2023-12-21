import env from 'env-var';

class NodeConfig implements NodeConfig {
  private env: string;

  constructor() {
    this.env = env.get('NODE_ENV').required().asString();
  }

  isDevEnv(): boolean {
    return this.env === 'development';
  }
}

export default NodeConfig;
