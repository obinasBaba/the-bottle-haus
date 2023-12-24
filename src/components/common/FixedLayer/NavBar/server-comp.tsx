import NavLinks from '@fixedLayer/NavBar/nav-links';
import NavBar from '@fixedLayer/NavBar/index';

const ServerComp = async () => {
  return (
    <NavBar>
      <>
        <NavLinks />
      </>
    </NavBar>
  );
};

export default ServerComp;
