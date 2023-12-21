const Args = (argName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const existingArgsMetadata = target[`__args_${propertyKey}`] || [];

    existingArgsMetadata.push({ argName, parameterIndex });

    target[`__args_${propertyKey}`] = existingArgsMetadata;
  };
};

export default Args;
