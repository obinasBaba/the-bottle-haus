import React from 'react';
import s from './subscribeemailmodal.module.scss';
import { AnimatePresence } from 'framer-motion';

import Img from './img.png';
import Image from 'next/image';
import { Button, FormControlLabel, TextField } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import { CloseMenuButton } from '@fixedLayer/NavMenu/closeMenuButton';

const subscribeVariants = {};

const SubscribeEmailModal = () => {
  return (
    <AnimatePresence>
      <div className={s.container}>
        <div className={s.blur} />

        <div className={s.wrapper}>
          <div className={s.txt}>
            <div className={s.close}>
              <CloseMenuButton onClick={() => null} />
            </div>

            <div className={s.side_img}>
              <Image src={Img} alt="side image" objectFit="cover" />
            </div>

            <header>
              <small>Follow Up</small>
              <h1>Subscribe to the updates</h1>
            </header>

            <TextField fullWidth label="Email" type="email" variant="standard" />

            <FormControlLabel control={<CheckBox />} label="I agree the privacy policy" />

            <Button fullWidth variant="contained">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default SubscribeEmailModal;
