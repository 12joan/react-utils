import { MutableRefObject, RefCallback } from 'react';

/**
 * Map the value contained within a ref.
 *
 * @template T
 * @template U
 * @param {MutableRefObject<U> | RefCallback<U>} upstreamRef - The ref that will receive the mapped value.
 * @param {(original: T) => U} map - The mapping function.
 * @returns {RefCallback<T>} A ref that accepts the original value.
 *
 * @example
 *   const MyComponent = () => {
 *     // Setter function<T>s can act as RefCallback<T>s.
 *     const [tagName, setTagName] = useState<string | null>(null);
 *     const elementRef = mapRef(setTagName, (element: HTMLDivElement) => element.tagName);
 *     return (
 *       <div ref={elementRef}>
 *         Tag name: {tagName || 'unknown'}
 *       </div>
 *     );
 *   };
 */

export const mapRef =
  <T, U>(
    upstreamRef: MutableRefObject<U> | RefCallback<U>,
    map: (original: T) => U
  ): RefCallback<T> =>
  (original: T) => {
    if (typeof upstreamRef === 'function') {
      upstreamRef(map(original));
    } else if (upstreamRef) {
      upstreamRef.current = map(original);
    }
  };
