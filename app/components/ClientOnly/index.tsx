import { useHydrated } from "./hooks";

type Props = {
  children(): JSX.Element;
  fallback?: JSX.Element | null;
};

export function ClientOnly({ children, fallback = null }: Props) {
  return useHydrated() ? <>{children()}</> : <>{fallback}</>;
}
