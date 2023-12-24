import s from './fixed.module.scss';
import NavMenuWrapper from '@fixedLayer/NavMenu';
import RegistrationModalWrapper from '@fixedLayer/RegistrationModal';
import SearchModalWrapper from '@fixedLayer/SearchModal';
import ScrollTopBottle from '@fixedLayer/ScrollTopBottle';
import dynamic from 'next/dynamic';
import NavBar from '@fixedLayer/NavBar';
import NavLinks from '@fixedLayer/NavBar/nav-links';
import CartButtonContainer from '@fixedLayer/NavBar/cart-button-container';
import LoadingModalWrapper from '@fixedLayer/LoadingModal';
// import AppToolTip from '@fixedLayer/AppToolTip';

const AppToolTip = dynamic(() => import('@fixedLayer/AppToolTip'), {
  // suspense: false,
  ssr: false,
});

const FixedLayer = () => {
  return (
    <div className={s.container}>
      <LoadingModalWrapper />

      <NavBar LinkItems={<NavLinks />} CartButton={<CartButtonContainer />} />

      <NavMenuWrapper />
      <RegistrationModalWrapper />
      <SearchModalWrapper />
      <ScrollTopBottle />

      <AppToolTip />
    </div>
  );
};

export default FixedLayer;
