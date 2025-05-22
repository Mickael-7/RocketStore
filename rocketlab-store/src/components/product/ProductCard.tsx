// src/components/product/ProductCard.tsx
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

  const cardStyle: React.CSSProperties = {
    border: '1px solid var(--footer-border-color)', // Reutilizando ou criando nova var (--card-border-color)
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem',
    width: '250px',
    textAlign: 'center',
    boxShadow: 'var(--product-card-shadow)',
    backgroundColor: product.stock === 0 ? 'var(--product-card-unavailable-bg)' : 'var(--product-card-bg)',
    transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    marginBottom: '1rem',
    opacity: product.stock === 0 ? 0.5 : 1,
    transition: 'opacity 0.3s ease',
  };

  const nameStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: 'var(--product-card-name-color)',
    transition: 'color 0.3s ease',
  };

  const unavailableTextStyle: React.CSSProperties = {
    color: 'var(--product-card-unavailable-text-color)',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.3s ease',
  };

  const stockTextStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    color: 'var(--product-card-stock-text-color)',
    marginBottom: '0.5rem',
    transition: 'color 0.3s ease',
  };

  const priceStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'var(--product-card-price-color)',
    marginBottom: '0.5rem',
    transition: 'color 0.3s ease',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: (product.stock > 0 && availableStockForAdding > 0)
      ? 'var(--product-card-button-bg)'
      : 'var(--product-card-button-disabled-bg)',
    color: (product.stock > 0 && availableStockForAdding > 0)
      ? 'var(--product-card-button-text-color)'
      : 'var(--product-card-button-disabled-text-color)',
    border: 'none',
    padding: '0.7rem 1rem',
    borderRadius: '5px',
    cursor: (product.stock > 0 && availableStockForAdding > 0) ? 'pointer' : 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    opacity: (product.stock > 0 && availableStockForAdding > 0) ? 1 : 0.7,
    marginTop: '0.5rem',
    transition: 'background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease',
  };

  return (
    <div style={cardStyle}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={product.imageUrl} alt={product.name} style={imageStyle} />
        <h3 style={nameStyle}>{product.name}</h3>
        {product.stock === 0 ? (
          <div style={unavailableTextStyle}>
            <AlertTriangle size={16} style={{ marginRight: '0.3rem' }} />
            Indisponível
          </div>
        ) : (
          <p style={stockTextStyle}>Estoque: {product.stock}</p>
        )}
        <p style={priceStyle}>R$ {product.price.toFixed(2)}</p>
      </Link>
      <button
        onClick={() => addToCart(product)}
        style={buttonStyle}
        disabled={product.stock === 0 || availableStockForAdding <= 0}
      >
        <PlusCircle size={18} style={{ marginRight: '0.5rem' }} />
        {(product.stock > 0 && availableStockForAdding > 0) ? "Adicionar" : "Indisponível"}
      </button>
      {/* ... (mensagem de 'Todo o estoque no carrinho') ... */}
    </div>
  );
};

export default ProductCard;