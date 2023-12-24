import { Badge, Button } from '@/components/ui/mui';
import Image from 'next/image';
import Link from 'next/link';
import { FancyInput } from '@/scenes/CheckoutPage/FancyInput';
import { cookies } from 'next/headers';
import { Cart } from '@lib/types';
import { getCart } from '@lib/saleor';

export async function CartInfo(props: any) {
  // const cart = useCart();

  const cartId = cookies().get('cartId')?.value;
  let cart: Cart | undefined;

  if (cartId) {
    cart = (await getCart(cartId)) ?? undefined;
  } else {
    cart = undefined;
  }

  return (
    <>
      <header className="hor">
        <h2> {cart?.lines.length || 0} item</h2>
        <Link href="/cart" aria-label="to cart">
          <Button data-cursor="-opaque">edit</Button>
        </Link>
      </header>

      <div className="cart_list_wrapper">
        <div className="cart_list_bottom_gradient" />

        <div className="cart_list" tabIndex={1}>
          {cart?.lines.map(
            (
              {
                id,
                quantity,
                merchandise: {
                  product: { images, title, price, variants },
                },
              },
              idx,
            ) => (
              <div className="item" key={id}>
                <div className="img">
                  <Badge invisible={quantity == 1} badgeContent={quantity} color="primary">
                    <div className="img_wrapper">
                      <Image
                        src={(images && images[0]?.url) || ''}
                        alt="bottle"
                        layout="fixed"
                        width={55}
                        height={55}
                      />
                    </div>
                  </Badge>
                </div>
                <div className="ver">
                  <p className="price">${price.value}</p>
                  <p className="name">{title}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="btns">
        <FancyInput
          size="small"
          label="Gift card or discount code"
          disabled={props.processingPayment}
        />
      </div>

      <div className="detail">
        <div className="item">
          <p>Subtotal</p>23.2
          <h4>${cart?.totalQuantity || '-'}</h4>
        </div>
        <div className="item">
          <p>Shipping</p>
          <h4>${cart?.lines?.length && cart?.lines?.length > 0 ? 15.2 : '-'}</h4>
        </div>
        <div className="item">
          <p>Taxes</p>
          <h4>$ -</h4>
        </div>

        <hr />

        <div className="item">
          <h4>Total to pay</h4>
          <h2>$ {cart?.cost.totalAmount.amount ? cart?.cost.totalAmount.amount + 15.2 : '-'} </h2>
        </div>
      </div>
    </>
  );
}
