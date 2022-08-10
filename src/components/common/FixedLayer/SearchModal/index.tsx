import React from 'react';
import s from './searchmodal.module.scss';
import { Avatar, FormControl, Input, InputAdornment } from '@mui/material';
import { CloseMenuButton } from '@fixedLayer/NavMenu/closeMenuButton';
import { MotionChild, MotionParent } from '@/components/common/MotionItems';
import { useUI } from '@/context/ui/context';
import { Search } from '@mui/icons-material';
import { blurBgVariants } from '@fixedLayer/NavMenu';

const variants = {
  initial: {
    y: '-100%',
  },
  animate: {
    y: 0,
  },
  exit: {
    y: '-100%',
  },
};

const transition = {
  duration: 0.9,
  ease: [0.6, 0.01, 0, 0.9],
};

const SearchModal = () => {
  const { closeSearchModal } = useUI();

  return (
    <MotionParent className={s.container} variants={variants} transition={transition}>
      <MotionChild
        className={s.blur}
        onClick={() => closeSearchModal()}
        variants={blurBgVariants}
        transition={blurBgVariants.transition}
      />

      <div className={s.wrapper}>
        <nav>
          <Avatar className={s.logo}>L</Avatar>

          <CloseMenuButton onClick={() => closeSearchModal()} />
        </nav>

        <div className={s.field}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <Input
              id="standard-adornment-amount"
              sx={{ fontSize: '5rem' }}
              placeholder="type & hit enter"
              endAdornment={
                <InputAdornment position="start">
                  <Search color="primary" fontSize="large" />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
    </MotionParent>
  );
};

export default SearchModal;
