import { generateArgRequestMetadata } from '../utils/Decorator.utils';

const Res = (target: object, propertyKey: string | symbol, argIndex: number) => {
  generateArgRequestMetadata('res', target, propertyKey, argIndex);
};

export default Res;
