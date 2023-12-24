import { generateArgRequestMetadata } from '../utils/Decorator.utils';

const UserId = (target: object, propertyKey: string | symbol, argIndex: number) => {
  generateArgRequestMetadata('userId', target, propertyKey, argIndex);
};

export default UserId;
