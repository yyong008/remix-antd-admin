import "reflect-metadata";

export function Loader(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  descriptor.value = function (...args: any[]) {
    return target.get();
  };
}
