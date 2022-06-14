import React from 'react';
import s from './addcartbutton.module.scss';
import Image from 'next/image';
import CartSvg from '@/public//cart.svg';

type ButtonProps = {
  text?: string;
};

const Button: React.FC<ButtonProps> = ({ text = 'ADD TO CART' }) => {
  return (
    <button className={s.container}>
      <Image src={CartSvg} width={18} height={14} alt="cart image" />
      <span>{text}</span>
    </button>
  );
};

export default Button;
