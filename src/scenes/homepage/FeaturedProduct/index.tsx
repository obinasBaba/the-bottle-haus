import React from 'react';
import s from './featuredproduct.module.scss';
import { ProductTypes } from '@/types/product';

const featuredProduct: Partial<ProductTypes['product']> = {
  name: 'Don Julio Primavera Tequila',
  description:
    'Introducing Tequila Don Julio Primavera – A Limited Edition. In his true innovative spirit, Don Julio González was a pioneer in creating ultra premium tequila and believed reposado tequila was tequila at its finest. Embracing the legacy of its founder’s innovative spirit, Tequila Don Julio Primavera features a deliciously smooth expression that takes the brand’s traditional Reposado and finishes it in orange wine casks, which previously held wine made from macerated orange peels, striking the balance of citrus and honey. This unique reposado tequila is made for moments spent outdoors, in the daytime, with friends.',
  price: {
    discount: 20,
    value: 169.99,
  },
};

const FeaturedProduct = () => {
  return <div className={s.container}></div>;
};

export default FeaturedProduct;
