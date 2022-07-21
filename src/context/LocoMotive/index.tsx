import React, {
  createContext,
  DependencyList,
  MutableRefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { LocomotiveScrollOptions, Scroll } from 'locomotive-scroll';
import useResizeObserver from 'use-resize-observer';
import { useDebounce } from 'use-debounce';
import 'locomotive-scroll/dist/locomotive-scroll.css';

export interface LocomotiveScrollContextValue {
  scroll: Scroll | null;
  isReady: boolean;
}

const LocomotiveScrollContext = createContext<LocomotiveScrollContextValue>({
  scroll: null,
  isReady: false,
});

export interface LocomotiveScrollProviderProps {
  options: LocomotiveScrollOptions;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  watch: DependencyList | undefined;
  onUpdate?: (scroll: Scroll) => void;
  location?: string;
  onLocationChange?: (scroll: Scroll) => void;
}

export function LocomotiveScrollProvider({
  children,
  options,
  containerRef,
  watch,
  onUpdate,
  location,
  onLocationChange,
}: WithChildren<LocomotiveScrollProviderProps>) {
  const { height: containerHeight } = useResizeObserver<HTMLDivElement>({ ref: containerRef });
  const [isReady, setIsReady] = useState(false);
  const LocomotiveScrollRef = useRef<Scroll | null>(null);
  const [height] = useDebounce(containerHeight, 100);

  if (!watch) {
    console.warn(
      'react-locomotive-scroll: you did not add any props to watch. Scroll may have weird behaviours if the instance is not updated when the route changes',
    );
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import('locomotive-scroll').then((LocomotiveScroll) => {
      const dataScrollContainer = document.querySelector('[data-scroll-container]');

      if (LocomotiveScrollRef.current?.el) {
        return console.log('IT IS NOT NULL', LocomotiveScrollRef.current);
      }

      LocomotiveScrollRef.current = new LocomotiveScroll.default({
        el: dataScrollContainer ?? undefined,
        ...options,
      });

      setIsReady(true);

      console.log('locomotive starting here -----', LocomotiveScrollRef.current);
    });

    return () => {
      LocomotiveScrollRef.current?.destroy();
      console.log('locomotive DYING here -----', LocomotiveScrollRef.current);
      LocomotiveScrollRef.current = null;

      setIsReady(false);
    };
  }, []);

  useEffect(() => {
    console.log('isRedy: ', isReady, LocomotiveScrollRef.current);
  }, [isReady]);

  useEffect(() => {
    if (!LocomotiveScrollRef.current) {
      return;
    }

    console.log(
      'dependency change ---- -- - - - -',
      height,
      ' instance: ',
      LocomotiveScrollRef.current,
    );

    LocomotiveScrollRef.current.update();

    if (onUpdate) {
      onUpdate(LocomotiveScrollRef.current);
    }
  }, [watch, height]);

  useEffect(() => {
    if (LocomotiveScrollRef.current === null || !location) {
      return;
    }

    console.log('location change ---- -- - - - -');

    LocomotiveScrollRef.current.update();

    if (onLocationChange) {
      onLocationChange(LocomotiveScrollRef.current);
    }
  }, [location, onLocationChange]);

  return (
    <LocomotiveScrollContext.Provider value={{ scroll: LocomotiveScrollRef.current, isReady }}>
      {children}
    </LocomotiveScrollContext.Provider>
  );
}

LocomotiveScrollContext.displayName = 'LocomotiveScrollContext';
LocomotiveScrollProvider.displayName = 'LocomotiveScrollProvider';

export function useLocomotiveScroll(): LocomotiveScrollContextValue {
  const context = useContext(LocomotiveScrollContext);

  useEffect(() => {
    if (!context.scroll) {
      console.warn(
        'react-locomotive-scroll: the context is missing. You may be using the hook without registering LocomotiveScrollProvider, or you may be using the hook in a component which is not wrapped by LocomotiveScrollProvider.',
      );
    }
  }, [context.scroll]);

  return context;
}

useLocomotiveScroll.displayName = 'useLocomotiveScroll';
