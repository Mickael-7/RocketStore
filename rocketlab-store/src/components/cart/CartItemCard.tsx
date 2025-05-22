import React from 'react';
import type { CartItem } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #eee',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      backgroundColor: 'white'
    }}>
      <img
        src={item.imageUrl}
        alt={item.name}
        style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '1rem', borderRadius: '4px' }}
      />
      <div style={{ flexGrow: 1 }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h4>
        <p style={{ margin: '0', color: '#555' }}>R$ {item.price.toFixed(2)}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)} // [cite: 7]
          disabled={item.quantity <= 1}
          style={{ background: 'none', border: '1px solid #ccc', cursor: 'pointer', padding: '0.3rem' }}
        >
          <Minus size={16} />
        </button>
        <span style={{ margin: '0 0.7rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)} // [cite: 7]
          disabled={item.quantity >= item.stock}
          style={{ background: 'none', border: '1px solid #ccc', cursor: 'pointer', padding: '0.3rem' }}
        >
          <Plus size={16} />
        </button>
      </div>
      <p style={{ minWidth: '80px', textAlign: 'right', fontWeight: 'bold', marginRight: '1rem' }}>
        R$ {(item.price * item.quantity).toFixed(2)}
      </p>
      <button
        onClick={() => removeFromCart(item.id)} // [cite: 7]
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default CartItemCard;