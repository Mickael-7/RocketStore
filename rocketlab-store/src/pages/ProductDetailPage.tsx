import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import type { Product } from '../types';
import { ShoppingBag, AlertTriangle } from 'lucide-react';

interface ProductDetailPageProps {
  products: Product[];
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products }) => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart, cartItems } = useCart();
  const product = products.find(p => p.id === productId);

  const [isDesktop, setIsDesktop] = useState(window.matchMedia("(min-width: 768px)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handler = () => setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!product) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--app-text-color)' }}>Produto não encontrado!</div>;
  }

  const itemInCart = cartItems.find(item => item.id === product.id);
  const availableStock = product.stock - (itemInCart?.quantity || 0);

  const contentWrapperBaseStyle: React.CSSProperties = {
    display: 'flex', 
    alignItems: 'flex-start', 
  };
  const imageBaseStyle: React.CSSProperties = { 
    width: '100%',
    maxWidth: '350px',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '8px',
  };

  const contentWrapperResponsiveStyle: React.CSSProperties = {
    ...contentWrapperBaseStyle,
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: isDesktop ? 'flex-start' : 'center',
  };
  const imageResponsiveStyle: React.CSSProperties = {
    ...imageBaseStyle,
    marginBottom: isDesktop ? '0' : '2rem',
    marginRight: isDesktop ? '2rem' : '0',
  };

  const pageContainerStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    boxShadow: 'var(--product-card-shadow)', 
    borderRadius: '8px',
    backgroundColor: 'var(--product-detail-bg)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  };

  const productNameStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: 'var(--product-detail-name-color)',
    transition: 'color 0.3s ease',
  };

  const unavailableMessageStyle: React.CSSProperties = {
    color: 'var(--product-card-unavailable-text-color)', 
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  };

  const stockTextStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: 'var(--product-detail-stock-color)',
    marginBottom: '0.5rem',
    transition: 'color 0.3s ease',
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    color: 'var(--product-detail-description-color)',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
    transition: 'color 0.3s ease',
  };

  const priceStyle: React.CSSProperties = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: 'var(--product-detail-price-color)',
    marginBottom: '1.5rem',
    transition: 'color 0.3s ease',
  };

  const addButtonStyle: React.CSSProperties = {
    backgroundColor: (product.stock > 0 && availableStock > 0)
      ? 'var(--product-detail-button-bg)'
      : 'var(--product-detail-button-disabled-bg)',
    color: (product.stock > 0 && availableStock > 0)
      ? 'var(--product-detail-button-text-color)'
      : 'var(--product-card-button-disabled-text-color)',
    border: 'none',
    padding: '1rem 1.5rem',
    borderRadius: '5px',
    cursor: (product.stock > 0 && availableStock > 0) ? 'pointer' : 'not-allowed',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    opacity: (product.stock > 0 && availableStock > 0) ? 1 : 0.7,
    transition: 'background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease',
  };

  const warningTextStyle: React.CSSProperties = {
    color: 'var(--warning-text-color, orange)',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    transition: 'color 0.3s ease',
  };

  return (
    <div style={pageContainerStyle}>
      <div style={contentWrapperResponsiveStyle}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={imageResponsiveStyle}
        />
        <div>
          <h1 style={productNameStyle}>{product.name}</h1>
          {product.stock === 0 ? (
            <div style={unavailableMessageStyle}>
              <AlertTriangle size={20} style={{ marginRight: '0.5rem' }} />
              Produto Indisponível
            </div>
          ) : (
            <p style={stockTextStyle}>
              Em estoque: {product.stock} unidades
            </p>
          )}
          <p style={descriptionStyle}>{product.description}</p>
          <p style={priceStyle}>
            R$ {product.price.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(product as Product)}
            style={addButtonStyle}
            disabled={product.stock === 0 || availableStock <= 0}
          >
            <ShoppingBag size={22} style={{ marginRight: '0.7rem' }} />
            {product.stock > 0 && availableStock > 0 ? "Adicionar ao Carrinho" : "Produto Indisponível"}
          </button>
          {availableStock <= 0 && product.stock > 0 && (
            <p style={warningTextStyle}>
              Você já adicionou todo o estoque disponível ao carrinho.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;