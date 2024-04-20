import "reflect-metadata";

export function Loader(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  console.log("action target", target);
  descriptor.value = function (...args: any[]) {
    return target.get();
  };
}
