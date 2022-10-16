import React from 'react';
import logoHeader from '../images/Vector-2.svg';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ loggedIn, userEmail, onSignOut }) => {
const location = useLocation();
  

return (
<header className="header">
    <img className="header__logo" src={logoHeader} alt="Логотип Место" />
    {location.pathname === '/signin' && (
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === '/signup' && (
        <Link to="/signin" className="header__link">
          Войти
        </Link>
      )}
      {loggedIn && (
        <nav className="header__nav">
          <span>{userEmail}</span>
          <button className="header__sign-out" onClick={() => onSignOut()}>
            Выйти
          </button>
        </nav>
      )}
</header>
)
}

export default Header;