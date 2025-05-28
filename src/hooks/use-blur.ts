import { type RefObject, useEffect, useRef } from 'react';

export const useBlur = (onClick: () => void, exceptionRefs: (RefObject<HTMLElement> | null)[] = []) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const isInsideTarget = ref.current && ref.current.contains(event.target as Node);

      const isInsideException = exceptionRefs.some(
        (exceptionRef) => exceptionRef && exceptionRef.current && exceptionRef.current.contains(event.target as Node)
      );

      if (!isInsideTarget && !isInsideException && isInsideTarget !== null) {
        onClick();
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onClick, exceptionRefs]);

  return ref;
};
