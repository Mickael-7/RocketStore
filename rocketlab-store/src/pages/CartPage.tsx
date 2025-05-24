import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItemCard from '../components/cart/CartItemCard';
import { CreditCard, PackageCheck } from 'lucide-react';
import type { Product } from '../types';

interface CartPageProps {
  products: Product[]; 
  updateProductStock: (productId: string, quantitySold: number) => void; 
}

const CartPage: React.FC<CartPageProps> = ({ products}) => { 
  const { cartItems, getCartTotal, getItemCount } = useCart(); 
  const navigate = useNavigate();
  const total = getCartTotal();
  const itemCount = getItemCount();


  const handleNavigateToCheckout = () => {
    if (itemCount === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }


    let canProceed = true;
    for (const item of cartItems) {
      const productInStock = products.find(p => p.id === item.id);
      if (!productInStock || productInStock.stock < item.quantity) {
        alert(`Desculpe, o produto "${item.name}" não possui estoque suficiente (${item.quantity} pedido(s), ${productInStock?.stock || 0} em estoque). Remova ou ajuste a quantidade.`);
        canProceed = false;
        break;
      }
    }

    if (!canProceed) {
      return; 
    }


    navigate('/checkout');
  };


  const emptyCartContainerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '3rem',
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const emptyCartIconStyle: React.CSSProperties = {
    marginBottom: '1rem',
    color: 'var(--cart-empty-icon-color, #95a5a6)',
    transition: 'color 0.3s ease',
  };

  const emptyCartTextStyle: React.CSSProperties = {
    marginBottom: '1rem',
    color: 'var(--cart-empty-text-color, var(--app-text-color))',
    transition: 'color 0.3s ease',
  };

  const emptyCartButtonStyle: React.CSSProperties = {
    backgroundColor: 'var(--cart-button-secondary-bg)',
    color: 'var(--cart-button-secondary-text, white)',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  const cartPageContainerStyle: React.CSSProperties = {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: 'var(--cart-page-bg, var(--product-card-bg))',
    borderRadius: '8px',
    boxShadow: 'var(--product-card-shadow)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  };

  const cartTitleStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '2rem',
    color: 'var(--cart-title-color, var(--products-title-color))',
    transition: 'color 0.3s ease',
    fontSize: '2rem', 
  };

  const summarySectionStyle: React.CSSProperties = {
    borderTop: '2px solid var(--cart-summary-border-color, var(--footer-border-color))',
    paddingTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'border-color 0.3s ease',
  };

  const totalTextStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    color: 'var(--cart-total-text-color, var(--app-text-color))',
    transition: 'color 0.3s ease',
  };

  const totalAmountStyle: React.CSSProperties = {
    fontWeight: 'bold',
    color: 'var(--cart-total-amount-color, var(--product-card-price-color))',
    transition: 'color 0.3s ease',
  };

  const checkoutButtonStyle: React.CSSProperties = {
    backgroundColor: 'var(--cart-button-primary-bg)',
    color: 'var(--cart-button-primary-text, white)',
    border: 'none',
    padding: '1rem 1.8rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '600', 
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };



  if (itemCount === 0) {
    return (
      <div style={emptyCartContainerStyle}>
        <PackageCheck size={60} style={emptyCartIconStyle} />
        <h2 style={{...emptyCartTextStyle, fontSize: '1.5rem'}}>Seu carrinho está vazio!</h2> {}
        <p style={{ ...emptyCartTextStyle, marginBottom: '1.5rem' }}>Adicione produtos para vê-los aqui.</p>
        <button
          onClick={() => navigate('/')}
          style={emptyCartButtonStyle}
        >
          Ver Produtos
        </button>
      </div>
    );
  }

  return (
    <div style={cartPageContainerStyle}>
      <h1 style={cartTitleStyle}>Seu Carrinho</h1>
      <div style={{ marginBottom: '2rem' }}>
        {cartItems.map(item => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>
      <div style={summarySectionStyle}>
        <h3 style={totalTextStyle}>
          Total: <span style={totalAmountStyle}>R$ {total.toFixed(2)}</span>
        </h3>
        <button
          onClick={handleNavigateToCheckout} 
          style={checkoutButtonStyle}
        >
          <CreditCard size={20} style={{ marginRight: '0.7rem' }} />
          Ir para Pagamento {}
        </button>
      </div>
    </div>
  );
};

export default CartPage;