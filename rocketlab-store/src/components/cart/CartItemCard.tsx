import React from 'react';
import type { CartItem } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const cardStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--cart-item-border-color, var(--footer-border-color))',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: 'var(--cart-item-bg, var(--product-card-bg))',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  };

  const imageStyle: React.CSSProperties = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    marginRight: '1rem',
    borderRadius: '4px',
  };

  const infoContainerStyle: React.CSSProperties = {
    flexGrow: 1,
  };

  const itemNameStyle: React.CSSProperties = {
    margin: '0 0 0.5rem 0',
    color: 'var(--cart-item-name-color, var(--app-text-color))',
    fontSize: '1.1rem', 
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  };

const itemPriceStyle: React.CSSProperties = {
  margin: '0',
  color: 'var(--cart-item-price-text-color, var(--app-text-color))',
  fontSize: '0.9rem',
  transition: 'color 0.3s ease',
};
  const quantityControlsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1rem',
  };

  const quantityButtonStyle: React.CSSProperties = {
    background: 'none',
    border: '1px solid var(--cart-item-quantity-button-border-color, #ccc)', 
    color: 'var(--cart-item-quantity-button-icon-color, var(--app-text-color))', 
    cursor: 'pointer',
    padding: '0.3rem',
    borderRadius: '4px', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'border-color 0.3s ease, color 0.3s ease',
  };


  const quantityTextStyle: React.CSSProperties = {
    margin: '0 0.7rem',
    minWidth: '20px',
    textAlign: 'center',
    color: 'var(--cart-item-quantity-text-color, var(--app-text-color))',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  };

  const itemTotalPriceStyle: React.CSSProperties = {
    minWidth: '80px',
    textAlign: 'right',
    fontWeight: 'bold',
    marginRight: '1rem',
    color: 'var(--cart-item-total-price-text-color, var(--app-text-color))', 
    transition: 'color 0.3s ease',
  };

  const removeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--cart-item-remove-button-icon-color, red)', 
    padding: '0.25rem', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.3s ease',
  };


  return (
    <div style={cardStyle}>
      <img
        src={item.imageUrl}
        alt={item.name}
        style={imageStyle}
      />
      <div style={infoContainerStyle}>
        <h4 style={itemNameStyle}>{item.name}</h4>
        <p style={itemPriceStyle}>R$ {item.price.toFixed(2)}</p>
      </div>
      <div style={quantityControlsStyle}>
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          style={quantityButtonStyle}
          aria-label="Diminuir quantidade"
        >
          <Minus size={16} />
        </button>
        <span style={quantityTextStyle}>{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          disabled={item.quantity >= item.stock}
          style={quantityButtonStyle}
          aria-label="Aumentar quantidade"
        >
          <Plus size={16} />
        </button>
      </div>
      <p style={itemTotalPriceStyle}>
        R$ {(item.price * item.quantity).toFixed(2)}
      </p>      
      <button
        onClick={() => removeFromCart(item.id)}
        style={removeButtonStyle}
        aria-label="Remover item do carrinho"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default CartItemCard;