import React, { useState } from 'react';
import s from './shippingmethod.module.scss';
import { Button, Radio } from '@mui/material';
import Image from 'next/image';
import ShipmentProtection from '@/scenes/CartPage/PaymentGateways/img.png';
import NoShip from './no-home-delivery-svgrepo-com.svg';
import { CheckoutFormStepComponent, StepScaffold } from '@/scenes/CheckoutPage';

const methods = [
  { name: 'UPS@ Ground', days: '2 days', price: '$18.33' },
  { name: 'UPS@ Air', days: '3 business day', price: '$20.44' },
  { name: 'Pickup', days: '0 days', price: '$0' },
];

const ShippingMethod: CheckoutFormStepComponent = ({ controller }) => {
  const [selected, setSelected] = useState<number>(5);

  return (
    <StepScaffold prevStep={controller.prevStep}>
      <div className={s.container}>
        <header>
          <Button variant="contained">3</Button>
          <h3>Shipping method</h3>
        </header>

        {methods.map(({ name, days, price }, idx) => (
          <div className="methods" key={idx}>
            <Radio color="primary" checked={selected == idx} />

            <div className="protect" onClick={() => setSelected(idx)}>
              <div className="shipment_img">
                <Image src={idx == 2 ? NoShip : ShipmentProtection} alt="shipment-icon" />
              </div>
              <div className="ver">
                <h4>
                  {name} {idx == 2 && <small>(no shipment)</small>}{' '}
                </h4>
                {idx != 2 && <small>Expected delivery: </small>}
                <small> {days} </small>
              </div>
              <small>{price}</small>
            </div>
          </div>
        ))}
      </div>
    </StepScaffold>
  );
};

export default ShippingMethod;
