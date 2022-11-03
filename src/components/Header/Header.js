import { useLocation } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

import './Header.css';

function Header({ loggedIn }) {
  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname === '/' ? 'header_main' : ''}`}>
      <div className="header__wrapper">
        <Navigation loggedIn={loggedIn}></Navigation>
      </div>
    </header>
  );
}

export default Header;
