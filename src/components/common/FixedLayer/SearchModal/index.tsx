import React from 'react';
import s from './searchmodal.module.scss';
import { Avatar, FormControl, Input, InputAdornment } from '@mui/material';
import { CloseMenuButton } from '@fixedLayer/NavMenu/closeMenuButton';
import { MotionChild, MotionParent } from '@/components/common/MotionItems';
import { useUI } from '@/context/ui/context';
import { Search } from '@mui/icons-material';
import { blurBgVariants } from '@fixedLayer/NavMenu';
import { motion, Transition, Variants } from 'framer-motion';
import { useFormik } from 'formik';
import { useAppInfo } from '@/context/MotionValuesContext';
import { useRouter } from 'next/router';

const containerVariant = {
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

const inputVariant = {
  initial: {
    y: '-100%',
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: '-100%',
    opacity: 0,
  },

  transition: {
    delay: 0.4,
    duration: 0.9,
    ease: [0.6, 0.01, 0, 0.9],
  },
};

const lineTransition: Variants & { transition: Transition } = {
  initial: {
    scaleX: 0,
  },
  animate: {
    scaleX: 1,
  },
  exit: {
    scaleX: 0,
  },

  transition: {
    delay: 0.6,
    duration: 0.9,
    ease: [0.6, 0.01, 0, 0.9],
    originX: -1,
  },
};

const transition = {
  duration: 0.9,
  ease: [0.6, 0.01, 0, 0.9],
};

const SearchModal = () => {
  const { closeSearchModal } = useUI();
  const router = useRouter();
  const { toolTipsData } = useAppInfo();

  const formic = useFormik({
    initialValues: {
      searchKey: '',
    },
    onSubmit(value) {
      if (!value.searchKey) {
        formic.setErrors({ searchKey: 'need search key' });
        return;
      }

      toolTipsData.set({
        text: 'Initiating Stock Search ...',
        closable: false,
      });

      setTimeout(() => {
        router.push('/collection/all-products').then(() => {
          toolTipsData.set({
            text: '',
          });
          closeSearchModal();
        });
      }, 3000);
    },
  });

  return (
    <MotionParent className={s.container} variants={containerVariant} transition={transition}>
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

        <motion.form
          onSubmit={formic.handleSubmit}
          className={s.field}
          variants={inputVariant}
          transition={inputVariant.transition}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <motion.div
              className="line"
              variants={lineTransition}
              transition={lineTransition.transition}
            />

            <Input
              name="searchKey"
              onChange={formic.handleChange}
              value={formic.values.searchKey}
              id="standard-adornment-amount"
              sx={{ fontSize: '5rem' }}
              color="primary"
              placeholder="type & hit enter"
              endAdornment={
                <InputAdornment position="start">
                  <Search color="primary" fontSize="large" />
                </InputAdornment>
              }
            />
          </FormControl>
        </motion.form>
      </div>
    </MotionParent>
  );
};

export default SearchModal;
