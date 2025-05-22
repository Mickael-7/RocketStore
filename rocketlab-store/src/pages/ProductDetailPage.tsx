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
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Produto não encontrado!</div>;
  }

  const itemInCart = cartItems.find(item => item.id === product.id);
  const availableStock = product.stock - (itemInCart?.quantity || 0);

  const containerStyle: React.CSSProperties = {};
  const contentWrapperBaseStyle: React.CSSProperties = {};
  const imageBaseStyle: React.CSSProperties = {};
  const contentWrapperResponsiveStyle: React.CSSProperties = {
    ...contentWrapperBaseStyle,
    flexDirection: isDesktop ? 'row' : 'column',
  };
  const imageResponsiveStyle: React.CSSProperties = {
    ...imageBaseStyle,
    marginBottom: isDesktop ? '0' : '2rem',
    marginRight: isDesktop ? '2rem' : '0',
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <div style={contentWrapperResponsiveStyle}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={imageResponsiveStyle}
        />
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.name}</h1>
          {product.stock === 0 ? (
            <div style={{ color: 'red', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <AlertTriangle size={20} style={{ marginRight: '0.5rem' }} />
              Produto Indisponível
            </div>
          ) : (
            <p style={{ fontSize: '1rem', color: '#777', marginBottom: '0.5rem' }}>
              Em estoque: {product.stock} unidades
            </p>
          )}
          <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '1.5rem' }}>{product.description}</p>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#27ae60', marginBottom: '1.5rem' }}>
            R$ {product.price.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(product as Product)}
            style={{
              backgroundColor: product.stock > 0 && availableStock > 0 ? '#e67e22' : '#cccccc',
              color: 'white',
              border: 'none',
              padding: '1rem 1.5rem',
              borderRadius: '5px',
              cursor: product.stock > 0 && availableStock > 0 ? 'pointer' : 'not-allowed',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              opacity: product.stock > 0 && availableStock > 0 ? 1 : 0.7,
            }}
            disabled={product.stock === 0 || availableStock <= 0}
          >
            <ShoppingBag size={22} style={{ marginRight: '0.7rem' }} />
            {product.stock > 0 && availableStock > 0 ? "Adicionar ao Carrinho" : "Produto Indisponível"}
          </button>
           {availableStock <= 0 && product.stock > 0 && (
             <p style={{ color: 'orange', fontSize: '0.9rem', marginTop: '0.5rem' }}>
               Você já adicionou todo o estoque disponível ao carrinho.
             </p>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;