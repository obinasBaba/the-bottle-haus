import React from 'react';
import s from './button.module.scss';

type ButtonProps = {
  text?: string;
};

const Button: React.FC<ButtonProps> = ({ text = 'button' }) => {
  return <button className={s.container}>{text}</button>;
};

export default Button;
