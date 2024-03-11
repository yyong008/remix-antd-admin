import { of, delay } from "rxjs";
import { initialNodes, initialEdges } from "~/db/editor/flow";

export const getFlowData$ = () => {
  return of({ initialNodes, initialEdges }).pipe(delay(20));
};
