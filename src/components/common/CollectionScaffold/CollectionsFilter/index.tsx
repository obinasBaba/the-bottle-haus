import React, { useEffect, useRef, useState } from 'react';
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
import { Variants } from 'framer-motion';
import { ArrowDropDown } from '@mui/icons-material';
import { Theme, useTheme } from '@mui/material/styles';

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
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
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

const CollectionsFilter = ({ title }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState<number[]>([320, 1037]);
  const [show, setShow] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handlePopperClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
            elevation: 5,
            className: s.popup,
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
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
              <Button aria-selected={true} variant="outlined" size="small" fullWidth>
                Apply Filter
              </Button>
            </div>
          </>
        </Popover>

        <SortBySelect />
      </div>
    </header>
  );
};

export default CollectionsFilter;
