import Checkout from '@/scenes/CheckoutPage';
import { CartInfo } from '@/scenes/CheckoutPage/cartInfo';

const CheckOutPage = () => {
  return <Checkout CartInfo={<CartInfo/>} />;
};

export default CheckOutPage;
