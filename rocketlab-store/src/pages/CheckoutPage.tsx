import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import type { Product } from '../types'; 

const formatCurrency = (amount: number) => {
  return `R$ ${amount.toFixed(2).replace('.', ',')}`;
};

interface CheckoutPageProps {
  products: Product[]; 
  updateProductStock: (productId: string, quantitySold: number) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ products, updateProductStock }) => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = getCartTotal();

  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) { 
      navigate('/cart');
    }
  }, [cartItems, navigate, isSubmitting]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    for (const item of cartItems) {
      const productInStock = products.find(p => p.id === item.id);
      if (!productInStock || productInStock.stock < item.quantity) {
        alert(`Desculpe, o produto "${item.name}" não tem estoque suficiente. Por favor, revise seu carrinho.`);
        setIsSubmitting(false);
        navigate('/cart');
        return;
      }
    }


    console.log("Processando pagamento...");


    setTimeout(() => {

      cartItems.forEach(item => {
        updateProductStock(item.id, item.quantity);
      });


      clearCart();


      alert('Pedido realizado com sucesso! Seu pedido foi processado e será enviado em breve.');
      navigate('/checkout/sucesso');

      setIsSubmitting(false);
    }, 2000); 
  };

  const pageContainerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '2rem',

  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap: '2rem',
  };

  const formSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '1.5rem', 
    fontWeight: '600',
    color: 'var(--checkout-section-title-color)',
    borderBottom: '1px solid var(--checkout-separator-color)',
    paddingBottom: '0.75rem',
    marginBottom: '0.5rem',
  };

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  };

  const inputRowStyle: React.CSSProperties = { 
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: 'var(--checkout-label-color)',
  };

  const inputStyle: React.CSSProperties = {
    padding: '0.75rem',
    border: '1px solid var(--checkout-input-border-color)',
    borderRadius: '6px',
    backgroundColor: 'var(--checkout-input-bg)',
    color: 'var(--checkout-input-text-color)',
    fontSize: '1rem',
    width: '100%', 
    boxSizing: 'border-box', 
  };

  const separatorStyle: React.CSSProperties = {
    border: 'none',
    borderTop: '1px solid var(--checkout-separator-color)',
    margin: '1.5rem 0',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.9rem 1.5rem',
    backgroundColor: isSubmitting ? 'var(--checkout-button-disabled-bg)' : 'var(--checkout-button-primary-bg)',
    color: 'var(--checkout-button-primary-text)',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  };


  const summaryCardStyle: React.CSSProperties = {
    backgroundColor: 'var(--checkout-summary-card-bg)',
    border: '1px solid var(--checkout-summary-card-border-color)',
    borderRadius: '8px',
    padding: '1.5rem',
    height: 'fit-content',
  };

  const summaryTitleStyle: React.CSSProperties = {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: 'var(--checkout-summary-title-color)',
    marginBottom: '1.5rem',
  };

  const summaryItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.95rem',
    color: 'var(--checkout-summary-text-color)',
    marginBottom: '0.75rem',
  };

  const summaryMutedTextStyle: React.CSSProperties = {
    color: 'var(--checkout-summary-muted-text-color)',
    fontSize: '0.85rem',
  };

  const summaryTotalStyle: React.CSSProperties = {
    ...summaryItemStyle,
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--checkout-separator-color)',
  };

  const [isDesktop, setIsDesktop] = useState(window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handler = () => setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const responsiveGridStyle: React.CSSProperties = {
    ...gridStyle,
    gridTemplateColumns: isDesktop ? '2fr 1fr' : '1fr',
  };


  if (cartItems.length === 0 && !isSubmitting) {
    return <div style={{textAlign: 'center', padding: '2rem', color: 'var(--app-text-color)'}}>Seu carrinho está vazio. Redirecionando...</div>;
  }

  return (
    <div style={pageContainerStyle}>
      <div style={responsiveGridStyle}>
        {}
        <div>
          <form onSubmit={handleSubmit} style={formSectionStyle}>
            {}
            <section>
              <h2 style={sectionTitleStyle}>Informações Pessoais</h2>
              <div style={inputRowStyle}>
                <div style={inputGroupStyle}>
                  <label htmlFor="firstName" style={labelStyle}>Nome</label>
                  <input id="firstName" style={inputStyle} required />
                </div>
                <div style={inputGroupStyle}>
                  <label htmlFor="lastName" style={labelStyle}>Sobrenome</label>
                  <input id="lastName" style={inputStyle} required />
                </div>
              </div>
              <div style={inputGroupStyle}>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input id="email" type="email" style={inputStyle} required />
              </div>
              <div style={inputGroupStyle}>
                <label htmlFor="phone" style={labelStyle}>Telefone</label>
                <input id="phone" type="tel" style={inputStyle} required />
              </div>
            </section>

            <hr style={separatorStyle} />

            {}
            <section>
              <h2 style={sectionTitleStyle}>Endereço de Entrega</h2>
              <div style={inputGroupStyle}>
                <label htmlFor="address" style={labelStyle}>Endereço</label>
                <input id="address" style={inputStyle} required />
              </div>
              <div style={inputRowStyle}>
                <div style={inputGroupStyle}>
                  <label htmlFor="city" style={labelStyle}>Cidade</label>
                  <input id="city" style={inputStyle} required />
                </div>
                <div style={inputGroupStyle}>
                  <label htmlFor="state" style={labelStyle}>Estado</label>
                  <input id="state" style={inputStyle} required />
                </div>
              </div>
              <div style={inputRowStyle}>
                <div style={inputGroupStyle}>
                  <label htmlFor="zipCode" style={labelStyle}>CEP</label>
                  <input id="zipCode" style={inputStyle} required />
                </div>
                <div style={inputGroupStyle}>
                  <label htmlFor="country" style={labelStyle}>País</label>
                  <input id="country" defaultValue="Brasil" style={inputStyle} required />
                </div>
              </div>
            </section>

            <hr style={separatorStyle} />

            {}
            <section>
              <h2 style={sectionTitleStyle}>Informações de Pagamento</h2>
              <div style={inputGroupStyle}>
                <label htmlFor="cardName" style={labelStyle}>Nome no Cartão</label>
                <input id="cardName" style={inputStyle} required />
              </div>
              <div style={inputGroupStyle}>
                <label htmlFor="cardNumber" style={labelStyle}>Número do Cartão</label>
                <input id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" style={inputStyle} required />
              </div>
              <div style={inputRowStyle}>
                <div style={inputGroupStyle}>
                  <label htmlFor="expDate" style={labelStyle}>Data de Expiração</label>
                  <input id="expDate" placeholder="MM/AA" style={inputStyle} required />
                </div>
                <div style={inputGroupStyle}>
                  <label htmlFor="cvv" style={labelStyle}>CVV</label>
                  <input id="cvv" placeholder="XXX" style={inputStyle} required />
                </div>
              </div>
            </section>

            <button type="submit" style={buttonStyle} disabled={isSubmitting}>
              {isSubmitting ? "Processando..." : "Finalizar Pedido"}
            </button>
          </form>
        </div>

        {}
        <div style={summaryCardStyle}>
          <h3 style={summaryTitleStyle}>Resumo do Pedido</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={summaryItemStyle}>
                <span>
                  {item.name} <span style={summaryMutedTextStyle}>x{item.quantity}</span>
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            <hr style={{...separatorStyle, margin: '0.5rem 0'}} />
            <div style={summaryItemStyle}>
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div style={summaryItemStyle}>
              <span>Frete</span>
              <span style={{color: 'var(--product-card-price-color)'}}>Grátis</span>
            </div>
            <hr style={{...separatorStyle, margin: '0.5rem 0'}} />
            <div style={summaryTotalStyle}>
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;