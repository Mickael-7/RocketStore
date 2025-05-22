import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const Navbar: React.FC = () => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#333',
      color: 'white'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
        RocketStore
      </Link>
      <Link to="/cart" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <ShoppingCart size={24} />
        {itemCount > 0 && (
          <span style={{
            marginLeft: '0.5rem',
            backgroundColor: 'red',
            borderRadius: '50%',
            padding: '0.2rem 0.5rem',
            fontSize: '0.8rem'
          }}>
            {itemCount}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;