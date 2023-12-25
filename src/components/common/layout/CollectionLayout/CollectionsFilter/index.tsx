import React, { useContext, useEffect, useRef, useState } from 'react';
import s from './collectionsfilter.module.scss';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Popover,
  Select,
  SelectChangeEvent,
  Slider,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDropDown } from '@mui/icons-material';
import { Theme, useTheme } from '@mui/material/styles';
import { MotionParent } from '@/components/common/MotionItems';
import { CollectionsContext } from '@/context/CollectionPageContext';

import Img from './media/img-removebg-preview.png';
import Img2 from './media/img_1-removebg-preview.png';
import Img3 from './media/img_2-removebg-preview.png';
import Img4 from './media/img_3-removebg-preview.png';
import Img5 from './media/img_4-removebg-preview.png';
import Img6 from './media/img_5-removebg-preview.png';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

function valuetext(value: number) {
  return `${value}°C`;
}

const list = [Img, Img2, Img3, Img4, Img5, Img6];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    className: s.menu_popup,
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      borderRadius: '10px',
    },
  },
};

const names = [
  'Featured',
  'Best Selling',
  'A-Z',
  'Z-A',
  'Price, Low to High',
  'Date, Old to New',
  'Price, New to Old',
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function SortBySelect() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(' , ') : value,
    );
  };

  return (
    <div>
      <FormControl className={s.form_control} size="small" color="primary">
        <InputLabel id="demo-multiple-name-label">Sort By</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          variant="outlined"
          color="primary"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Sort By" />}
          MenuProps={MenuProps}>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              className={s.menu_item}
              style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const titleVariants = {
  initial: {
    y: '100%',
    opacity: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: '-100%',
  },

  transition: { duration: 1, easing: [0.6, 0.01, 0, 0.9] },
};

const CollectionsFilter = ({ title }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState<number[]>([320, 1037]);
  const [show, setShow] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const { setSortInfo } = useContext(CollectionsContext);
  const pathname =  usePathname();


  const handlePopperClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSortInfo({
      priceRange: value,
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  useEffect(() => {
    show && containerRef.current?.focus();
  }, [show]);

  return (<MotionParent className={s.container}>

    <div className={s.wrapper}>
      <AnimatePresence mode='wait'>
        <MotionParent key={title}>
          <motion.h1
            className={s.title}
            variants={titleVariants as any}
            transition={titleVariants.transition}>
            {pathname?.split('/')?.pop() ?? '-'}
          </motion.h1>
        </MotionParent>
      </AnimatePresence>

      <div className={s.filter}>
        <Button
          variant="outlined"
          size="medium"
          aria-describedby={id}
          endIcon={<ArrowDropDown />}
          onClick={handlePopperClick}>
          Price
        </Button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          PaperProps={{
            elevation: 5, className: s.popup,
          }}
          transformOrigin={{
            vertical: 'top', horizontal: 'right',
          }}
          anchorOrigin={{
            vertical: 'bottom', horizontal: 'right',
          }}>
          <>
            <div className={s.price_popup} ref={containerRef}>
              <p>Price Range</p>
              <div className={s.meta}>
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
              <div className={s.hor}>
                <Button variant="text" size="small" disabled>
                  ${value[0]}
                </Button>
                -
                <Button variant="text" size="small" disabled>
                  ${value[1]}
                </Button>
              </div>
              <Button
                aria-selected={true}
                variant="outlined"
                size="small"
                fullWidth
                onClick={() => handleClose()}>
                Apply Filter
              </Button>
            </div>
          </>
        </Popover>

        <SortBySelect />
      </div>
    </div>

    <div className={s.mobile_pro_list}>
      {list.map((img, idx) => (<div className={s.pro_list_item} key={img.src}>
        <Image src={img} alt="product list navigation item" />
      </div>))}
    </div>


  </MotionParent>);
};

export default CollectionsFilter;
