import { Button, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import s from './checkoutpage.module.scss';

export const FancyInput = ({
  size = 'medium',
  btnText = 'apply',
  label = '',
  disabled = false,
}: any) => {
  return (
    <div className={s.input}>
      <TextField
        fullWidth
        type="text"
        size={size}
        variant="outlined"
        color="primary"
        label={label}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" size="large" disabled={disabled}>
                {btnText}
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
