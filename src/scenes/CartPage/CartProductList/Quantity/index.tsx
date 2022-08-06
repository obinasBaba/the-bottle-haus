import React from 'react';
import s from './quantity.module.scss';
import { useRemoveItem, useUpdateItem } from '@/SWRHooksAPI';

const Quantity = ({ value, item, setLoading }: any) => {
  const removeItem = useRemoveItem();
  const updateItem = useUpdateItem();

  return (
    <div className={s.container}>
      <button
        onClick={() => {
          setLoading(item.id);
          updateItem({ quantity: value - 1, id: item.id, variantId: item.variant.id }).then((dat) =>
            setLoading(false),
          );
        }}>
        -
      </button>
      <h3 className="value">{value}</h3>
      <button
        className="plus"
        onClick={() => {
          setLoading(item.id);
          updateItem({ quantity: value + 1, id: item.id, variantId: item.variant.id }).then((dat) =>
            setLoading(false),
          );
        }}>
        +
      </button>
      <button
        className="delete"
        onClick={async () => {
          setLoading(item.id);
          const res = removeItem({ id: item.id }).then((r) => setLoading(false));
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="100%"
          height="100%"
          role="presentation"
          className="icon icon-remove">
          <path
            d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z"
            fill="currentColor"></path>
          <path
            d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z"
            fill="currentColor"></path>
        </svg>
      </button>
    </div>
  );
};

export default Quantity;
