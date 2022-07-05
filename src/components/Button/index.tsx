import React from 'react';
import s from './button.module.scss';
import clsx from 'clsx';

type ButtonProps = {
  text?: string;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ text = 'button', className, ...props }) => {
  return (
    <button className={clsx([s.container, className])} {...props}>
      {text}
    </button>
  );
};

export default Button;
