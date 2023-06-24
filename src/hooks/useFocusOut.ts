import { FocusEvent, useCallback, useRef } from 'react';

export const useFocusOut = <T extends HTMLElement>(
  callback: (event: FocusEvent<T>) => void
) => {
  const ref = useRef<T>(null);

  const onBlur = useCallback(
    (event: FocusEvent<T>) => {
      if (!ref.current?.contains(event.relatedTarget as Node)) {
        callback(event);
      }
    },
    [callback]
  );

  return [ref, { onBlur }] as const;
};
