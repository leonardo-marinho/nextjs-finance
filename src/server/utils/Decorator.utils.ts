import 'reflect-metadata';

export const generateArgRequestMetadata = (
  argName: string,
  target: object,
  propertyKey: string | symbol,
  argIndex: number,
) => {
  Reflect.defineMetadata(`${propertyKey.toString()}-arg-${argName}`, argIndex, target, propertyKey);
};

export const processArgRequestMetadata = <TValue>(
  argName: string,
  value: TValue,
  argsArray: unknown[],
  target: object,
  propertyKey: string | symbol,
) => {
  if (Reflect.hasMetadata(`${propertyKey.toString()}-arg-body`, target, propertyKey)) {
    const bodyArgIndex = Reflect.getMetadata(
      `${propertyKey.toString()}-arg-${argName}`,
      target,
      propertyKey,
    );
    argsArray[bodyArgIndex] = value;
  }
};

export const processAndValidateArgRequestMetadata = <TValue>(
  argName: string,
  value: TValue,
  argsArray: unknown[],
  target: object,
  propertyKey: string | symbol,
) => {
  if (Reflect.hasMetadata(`${propertyKey.toString()}-arg-${argName}`, target, propertyKey)) {
    const bodyArgIndex = Reflect.getMetadata(
      `${propertyKey.toString()}-arg-${argName}`,
      target,
      propertyKey,
    );
    argsArray[bodyArgIndex] = value;
  }
};
