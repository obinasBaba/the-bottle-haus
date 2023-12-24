'use client';

import s from './quantity.module.scss';
import { removeItem, updateItemQuantity } from '@lib/saleor/cart-actions';
import { useAppInfo } from '@/context/MotionValuesContext';
import { useRouter } from 'next/navigation';
// import { useAppInfo } from '@/context/MotionValuesContext';

const Quantity = ({ quantity, item, setLoading, lineId }: any) => {
  // const removeItem = useRemoveItem();
  // const updateItem = useUpdateItem();
  const router = useRouter();

  const { toolTipsData } = useAppInfo();

  return (
    <div className={s.container}>
      <button
        onClick={async () => {
          setLoading(item.id);
          toolTipsData.set({ show: true, text: 'Updating Cart', loading: true });

          updateItemQuantity({
            quantity: quantity - 1,
            variantId: item.variant.id,
            lineId: item.lineId,
          })
            .then((data) => {
              setLoading(false);
              if (data) {
                toolTipsData.set({
                  id: 'error',
                  show: true,
                  text: 'Error updating cart',
                  loading: true,
                });
                return;
              }

              toolTipsData.set({ show: false });
              router.refresh();
            })
            .catch((err) => {
              setLoading(false);

              toolTipsData.set({
                id: 'error',
                show: true,
                text: 'Error updating cart',
                loading: true,
              });
            });
        }}>
        -
      </button>
      <h3 className="value">{quantity}</h3>
      <button
        className="plus"
        onClick={() => {
          setLoading(item.id);
          toolTipsData.set({ show: true, text: 'Updating Cart', loading: true });

          updateItemQuantity({
            quantity: quantity + 1,
            variantId: item.variant.id,
            lineId: item.lineId,
          })
            .then((data) => {
              setLoading(false);
              if (data) {
                toolTipsData.set({
                  id: 'error',
                  show: true,
                  text: 'Error updating cart',
                  loading: true,
                });
                return;
              }

              toolTipsData.set({ show: false });
              router.refresh();
            })
            .catch((err) => {
              setLoading(false);

              toolTipsData.set({
                id: 'error',
                show: true,
                text: 'Error updating cart',
                loading: true,
              });
            });
        }}>
        +
      </button>
      <button
        className="delete"
        onClick={async () => {
          setLoading(item.id);
          toolTipsData.set({ show: true, text: 'Deleting Item ', loading: true });

          removeItem(item.lineId)
            .then((dat) => {
              setLoading(false);
              if (dat) {
                toolTipsData.set({
                  id: 'error',
                  show: true,
                  text: 'Error updating cart',
                  loading: true,
                });
                return;
              }

              toolTipsData.set({ show: false });
              router.refresh();
            })
            .catch((err) => {
              setLoading(false);
              toolTipsData.set({
                id: 'error',
                show: true,
                text: 'Error updating cart',
                loading: true,
              });
            });
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
