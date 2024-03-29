import React, { useState } from 'react';
import s from './shippingmethod.module.scss';
import { Radio } from '@mui/material';
import Image from 'next/image';
import ShipmentProtection from '@/public/truck.png';
import NoShip from './no-home-delivery-svgrepo-com.svg';
import { CheckoutFormStepComponent } from '@/scenes/CheckoutPage';

const methods = [
  { name: 'UPS@ Ground', days: '2 days', price: '$18.33' },
  {
    name: 'UPS@ Air',
    days: '3 business day',
    price: '$20.44',
  },
  { name: 'Pickup', days: '0 days', price: '$0' },
];

const ShippingMethod: CheckoutFormStepComponent = ({ controller, formikProps }) => {
  const [selected, setSelected] = useState<number>(5);

  return (
    <div className={s.container}>
      {methods.map(({ name, days, price }, idx) => (
        <div className="methods" key={idx}>
          <Radio color="primary" checked={selected == idx || name == formikProps.values.shipment} />

          <div
            className="protect"
            onClick={() => {
              formikProps.setFieldValue('shipment', name);
              setSelected(idx);
            }}>
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
  );
};

export default ShippingMethod;
