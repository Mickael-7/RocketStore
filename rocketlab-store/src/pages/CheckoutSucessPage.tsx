import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccessPage: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 140px)',
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'var(--app-bg-color)',
  };

  const iconStyle: React.CSSProperties = {
    color: 'var(--cart-button-primary-bg, green)',
    marginBottom: '1.5rem',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    color: 'var(--checkout-section-title-color)',
    marginBottom: '1rem',
  };

  const messageStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    color: 'var(--app-text-color)',
    marginBottom: '2rem',
    maxWidth: '500px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.8rem 2rem',
    backgroundColor: 'var(--checkout-button-primary-bg)',
    color: 'var(--checkout-button-primary-text)',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.2s ease-in-out',
  };

  return (
    <div style={containerStyle}>
      <CheckCircle size={72} style={iconStyle} />
      <h1 style={titleStyle}>Pedido Realizado com Sucesso!</h1>
      <p style={messageStyle}>
        Obrigado pela sua compra! Seu pedido foi processado e um email de confirmação foi enviado.
        Você pode acompanhar o status do seu pedido na sua conta.
      </p>
      <Link to="/" style={buttonStyle}>
        Voltar à Loja
      </Link>
    </div>
  );
};

export default CheckoutSuccessPage;