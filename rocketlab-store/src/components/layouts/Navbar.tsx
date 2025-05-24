import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import SearchBar from '../common/SearchBar';

const Navbar: React.FC = () => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const { theme, toggleTheme } = useTheme();

  const navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'var(--navbar-bg)',
    color: 'var(--navbar-text-color)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
    transition: 'background-color 0.3s ease, color 0.3s ease', 
  };

  const logoStyle: React.CSSProperties = {
    color: 'var(--navbar-logo-color)',
    textDecoration: 'none',
    fontSize: '1.7rem',
    fontWeight: 'bold',
  };

  const rightNavItemsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  };

  const themeToggleButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'var(--navbar-icon-color)',
    cursor: 'pointer',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const cartLinkStyle: React.CSSProperties = {
    color: 'var(--navbar-icon-color)', 
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  };

  const itemCountStyle: React.CSSProperties = {
    marginLeft: '0.5rem',
    backgroundColor: 'var(--navbar-item-count-bg)', 
    color: 'var(--navbar-item-count-text)',      
    borderRadius: '20%',
    padding: '0.2rem 0.6rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    minWidth: '20px',
    textAlign: 'center',
    lineHeight: '1',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        RocketStore
      </Link>
      <SearchBar />
      <div style={rightNavItemsStyle}> {}
        <button
          onClick={toggleTheme}
          style={themeToggleButtonStyle}
          aria-label={theme === 'light' ? "Ativar tema escuro" : "Ativar tema claro"}
        >
          {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
        </button>
        <Link to="/cart" style={cartLinkStyle}>
          <ShoppingCart size={26} />
          {itemCount > 0 && (
            <span style={itemCountStyle}>
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;