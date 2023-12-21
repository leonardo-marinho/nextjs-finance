import { generateArgRequestMetadata } from '../utils/Decorator.utils';

const Req = (target: object, propertyKey: string | symbol, argIndex: number) => {
  generateArgRequestMetadata('req', target, propertyKey, argIndex);
};

export default Req;
