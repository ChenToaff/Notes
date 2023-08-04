import { useEffect, useRef } from "react";

const useUpdateEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) return func();
    else didMount.current = true;
  }, deps);
};

export default useUpdateEffect;
