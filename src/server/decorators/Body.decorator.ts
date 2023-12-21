import { generateArgRequestMetadata } from '../utils/Decorator.utils';

const Body = (target: object, propertyKey: string | symbol, argIndex: number) => {
  generateArgRequestMetadata('body', target, propertyKey, argIndex);
};

export default Body;
