import { of, delay } from "rxjs";
import { initialNodes, initialEdges } from "~/__mock__/db/editor/flow";

export const getFlowData$ = () => {
  return of({ initialNodes, initialEdges }).pipe(delay(20));
};
