import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { PlusCircle, AlertTriangle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cartItems } = useCart();

  const itemInCart = cartItems.find(item => item.id === product.id);
  const availableStockForAdding = product.stock - (itemInCart?.quantity || 0);


  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem',
      width: '250px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      backgroundColor: product.stock === 0 ? '#f9f9f9' : 'white'
    }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: '100%', height: '180px', objectFit: 'cover', marginBottom: '1rem', opacity: product.stock === 0 ? 0.5 : 1 }}
        />
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h3>
         {product.stock === 0 ? (
          <div style={{ color: 'red', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={16} style={{ marginRight: '0.3rem' }} />
            Indisponível
          </div>
        ) : (
          <p style={{ fontSize: '0.9rem', color: '#777', marginBottom: '0.5rem' }}>
            Estoque: {product.stock}
          </p>
        )}
        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#27ae60', marginBottom: '0.5rem' }}>
          R$ {product.price.toFixed(2)}
        </p>
        <p style={{ fontSize: '0.9rem', color: '#777', marginBottom: '1rem', height: '40px', overflow: 'hidden' }}>
          {product.description.substring(0, 50)}...
        </p>
      </Link>
      <button
        onClick={() => addToCart(product)}
        style={{
          backgroundColor: product.stock > 0 && availableStockForAdding > 0 ? '#3498db' : '#cccccc',
          color: 'white',
          border: 'none',
          padding: '0.7rem 1rem',
          borderRadius: '5px',
          cursor: product.stock > 0 && availableStockForAdding > 0 ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          opacity: product.stock > 0 && availableStockForAdding > 0 ? 1 : 0.7,
          marginTop: '0.5rem'
        }}
        disabled={product.stock === 0 || availableStockForAdding <= 0}
      >
        <PlusCircle size={18} style={{ marginRight: '0.5rem' }} />
        {product.stock > 0 && availableStockForAdding > 0 ? "Adicionar" : "Indisponível"}
      </button>
      {availableStockForAdding <= 0 && product.stock > 0 && (
        <p style={{ color: 'orange', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            Todo o estoque no carrinho.
        </p>
      )}
    </div>
  );
};

export default ProductCard;