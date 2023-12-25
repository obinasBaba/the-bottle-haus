'use client';

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
import { MotionValue, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';
import MouseFollower from 'mouse-follower';
import gsap from 'gsap';
import RouteChangeEvent from '@/util/helpers/RouteChangeEvent';
import { usePathname, useSearchParams } from 'next/navigation';

export interface LocomotiveScrollContextValue {
  scroll: Scroll | null;
  isReady: boolean;
  scale: MotionValue<number>;
  scrollDirection: MotionValue<string>;
  yProgress: MotionValue<number>;
  y: MotionValue<number>;
  cursor: React.MutableRefObject<MouseFollower | undefined>;
}

const LocomotiveScrollContext = createContext<LocomotiveScrollContextValue>({
  scroll: null,
  isReady: false,
  scale: new MotionValue<number>(),
} as any);

export interface LocomotiveScrollProviderProps {
  options: LocomotiveScrollOptions;
  watch: DependencyList | undefined;
  onUpdate?: (scroll: Scroll) => void;
  location?: string;
  onLocationChange?: (scroll: Scroll) => void;
}

MouseFollower.registerGSAP(gsap);

export function LocomotiveScrollProvider({
  children,
  options,
  watch,
  onUpdate,
  location,
  onLocationChange,
}: WithChildren<LocomotiveScrollProviderProps>) {
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { height: containerHeight } = useResizeObserver<HTMLDivElement>({ ref: containerRef });
  const [isReady, setIsReady] = useState(false);
  const LocomotiveScrollRef = useRef<Scroll | null>(null);
  const [height] = useDebounce(containerHeight, 100);
  const cursor = useRef<MouseFollower>();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const yLimit = useMotionValue(0);
  const xLimit = useMotionValue(0);
  const scrollDirection = useMotionValue('');

  const yProgress = useTransform(y, [0, yLimit.get()], [0, 1], { clamp: false });

  const ySmooth = useSpring(y, { damping: 50, stiffness: 400 });
  const velocity = useVelocity(ySmooth);

  const scale = useTransform(velocity, [-3000, 0, 3000], [1.01, 1, 1.01], { clamp: true });

  useLayoutEffect(() => {
    const event = RouteChangeEvent.GetInstance();

    event.addListener('end', () => {
      cursor.current?.removeText();
      cursor.current?.removeState('-opaque');
      cursor.current?.removeState('-pointer');
    });
  }, []);

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log('url -------', url);

    cursor.current?.removeText();
    cursor.current?.removeState('-opaque');
    cursor.current?.removeState('-pointer');

    console.log('scroll : ', LocomotiveScrollRef.current);

    if (LocomotiveScrollRef.current) {
      // scroll to the top
      console.log('scroll to the top --');
      if (typeof LocomotiveScrollRef.current?.scrollTo === 'function') {
        LocomotiveScrollRef?.current?.update();
        LocomotiveScrollRef.current?.scrollTo(0, { duration: 0, disableLerp: true });
      }
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    // return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import('locomotive-scroll').then((LocomotiveScroll) => {
      const dataScrollContainer = document.querySelector('[data-scroll-container]');
      containerRef.current = dataScrollContainer as HTMLDivElement;

      if (LocomotiveScrollRef.current?.el) {
        // console.log('IT IS NOT NULL', LocomotiveScrollRef.current.name);
        return;
      }

      // check if the media query is greater than 768px
      if (window.matchMedia('(min-width: 1000px)').matches) {
        cursor.current = new MouseFollower();
      }

      LocomotiveScrollRef.current = new LocomotiveScroll.default({
        el: dataScrollContainer ?? undefined,
        ...options,
      });

      setIsReady(true);

      // console.log('locomotive starting here -----', LocomotiveScrollRef.current.name);
    });

    return () => {
      LocomotiveScrollRef.current?.destroy();
      // console.log('locomotive DYING here -----', LocomotiveScrollRef.current?.name);
      LocomotiveScrollRef.current = null;

      // cursor.current?.destroy();

      setIsReady(false);
    };
  }, []);

  useEffect(() => {
    if (!LocomotiveScrollRef.current) {
      return;
    }

    LocomotiveScrollRef?.current?.update();
    yLimit.set(LocomotiveScrollRef.current?.scroll?.instance.limit.y);
    xLimit.set(LocomotiveScrollRef.current?.scroll?.instance.limit.x);

    if (onUpdate) {
      onUpdate(LocomotiveScrollRef.current);
    }
  }, [pathname, searchParams, height]);

  useEffect(() => {
    if (LocomotiveScrollRef.current === null || !location) {
      return;
    }

    // console.log('location change ---- -- - - - -');

    LocomotiveScrollRef.current.update();
    cursor.current?.removeText();
    cursor.current?.removeState('opaque');

    if (onLocationChange) {
      onLocationChange(LocomotiveScrollRef.current);
    }
  }, [location, onLocationChange, pathname, searchParams]);

  useEffect(() => {
    if (isReady && LocomotiveScrollRef.current) {
      LocomotiveScrollRef.current.on('scroll', (arg: any) => {
        // console.log('scrolled: ', arg);
        x.set(arg?.delta?.x || arg.scroll.x);
        y.set(arg?.delta?.y || arg.scroll.y);
        scrollDirection.set(arg.direction);
      });
    }
  }, [isReady]);

  return (
    <LocomotiveScrollContext.Provider
      value={{
        cursor,
        scroll: LocomotiveScrollRef.current,
        isReady,
        scale,
        scrollDirection,
        yProgress,
        y,
      }}>
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
