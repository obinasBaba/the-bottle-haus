import { AnimationControls, MotionValue, useAnimation, useMotionValue } from 'framer-motion';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LocomotiveScroll from 'locomotive-scroll';
import React, { createContext, useContext, useLayoutEffect } from 'react';

type ToolTipType = {
  text: string;
  show: boolean;
  timer: number[] | null;
};

type MotionValueContextType = {
  toolTipsData: MotionValue<any>;
  appBarScrollState: MotionValue<string>;
  PageAnimationEvent: MotionValue<string>;
  PageAnimationController: AnimationControls;

  mouse: {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
  };

  moScroll?: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    yProgress: MotionValue<number>;
    xProgress: MotionValue<number>;
    limit: MotionValue<number>;
    scrollDirection: MotionValue<string>;
  };
};

const MotionValueContext = createContext<MotionValueContextType>({} as MotionValueContextType);

export const MotionValueContextWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toolTipsData = useMotionValue({
    text: '',
    show: false,
    timer: null,
  });

  const PageAnimationEvent = useMotionValue<string>('');
  const PageAnimationController = useAnimation();

  //mouse_event motion_values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const appBarScrollState = useMotionValue('');

  useLayoutEffect(() => {
    const updateMouseMotionValue = (ev: MouseEvent) => {
      mouseX.set(ev.clientX);
      mouseY.set(ev.clientY);
    };

    window.addEventListener('mousemove', updateMouseMotionValue);

    return () => window.removeEventListener('mousemove', updateMouseMotionValue);
  }, []);

  return (
    <MotionValueContext.Provider
      value={{
        mouse: {
          mouseX,
          mouseY,
        },
        toolTipsData,
        appBarScrollState,
        PageAnimationEvent,
        PageAnimationController,
      }}>
      {children}
    </MotionValueContext.Provider>
  );
};

export function useAppInfo() {
  return useContext(MotionValueContext) as MotionValueContextType;
}
