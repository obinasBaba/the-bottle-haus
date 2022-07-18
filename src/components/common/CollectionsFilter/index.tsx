import React, { useEffect, useRef, useState } from 'react';
import s from './collectionsfilter.module.scss';
import { Button, Paper, Slider } from '@mui/material';
import { AnimatePresence, Variants } from 'framer-motion';
import { MotionParent } from '@/components/common/MotionItems';

function valuetext(value: number) {
  return `${value}°C`;
}

const popupVariants: Variants = {
  initial: {
    scale: 0.8,
    x: -20,
    y: -20,
    opacity: 0,
  },
  animate: {
    scale: 1,
    x: 0,
    y: 0,
    opacity: 1,
  },

  exit: {
    opacity: 0,
    scale: 0.7,
    x: -50,
    y: -50,
    transition: {
      opacity: {
        duration: 0.2,
      },
      default: {
        type: 'spring',
      },
    },
  },
};

const CollectionsFilter = ({ title }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState<number[]>([320, 1037]);
  const [show, setShow] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShow((prevState) => !prevState);
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  useEffect(() => {
    show && containerRef.current?.focus();
  }, [show]);

  return (
    <header className={s.container}>
      <h1 className="title">{title}</h1>
      <div className="filter">
        <Button variant="outlined" size="small" onClick={handleClick}>
          Price
        </Button>

        <AnimatePresence>
          {show && (
            <MotionParent
              variants={popupVariants}
              tabIndex={0}
              ref={containerRef}
              className="popup"
              onBlur={(e: FocusEvent) => {
                if (e.relatedTarget === null) setShow(false);
              }}>
              <Paper elevation={5} className="price_popup">
                <p>Price Range</p>
                <div className="meta">
                  <p>$34 - $15000</p>
                  <small>Maximum price: $15,000</small>
                </div>
                <Slider
                  getAriaLabel={() => 'Temperature range'}
                  value={value}
                  onChange={handleChange}
                  max={1500}
                  min={30}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
                <div className="hor">
                  <Button variant="text" size="small" disabled>
                    ${value[0]}
                  </Button>
                  -
                  <Button variant="text" size="small" disabled>
                    ${value[1]}
                  </Button>
                </div>
                <Button aria-selected={true} variant="outlined" size="large" fullWidth>
                  Apply Filter
                </Button>
              </Paper>
            </MotionParent>
          )}
        </AnimatePresence>

        <Button variant="outlined" size="small">
          Best Selling
        </Button>
        <Button variant="outlined" size="small">
          Sort by
        </Button>
      </div>
    </header>
  );
};

export default CollectionsFilter;
