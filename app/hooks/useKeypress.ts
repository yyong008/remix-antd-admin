import { useEffect, useRef, useState } from "react";

import { fromEvent } from "rxjs";

export function useKeyPress(resetTime = 100) {
  const [key, setKey] = useState("");
  const tRef = useRef<any>();

  useEffect(() => {
    const keyDownObservable = fromEvent(document, "keydown");

    const subscription = keyDownObservable.subscribe((event: any) => {
      if (event.key) {
        setKey(event.key);
      }

      if (resetTime) {
        if (tRef.current) {
          clearInterval(tRef.current);
        }

        tRef.current = setTimeout(() => {
          setKey("");
        }, resetTime);
      }
    });

    return () => {
      subscription.unsubscribe();
      tRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [key];
}

export default useKeyPress;
