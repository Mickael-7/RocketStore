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

const CartPage: React.FC<CartPageProps> = ({ products, updateProductStock }) => {
  const { cartItems, getCartTotal, clearCart, getItemCount } = useCart();
  const navigate = useNavigate();
  const total = getCartTotal();
  const itemCount = getItemCount();

  const handleCheckout = () => {
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

    cartItems.forEach(item => {
      updateProductStock(item.id, item.quantity);
    });

    alert('Compra finalizada com sucesso! (Simulação)');
    clearCart(); 
    navigate('/'); 
  };

  if (itemCount === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', minHeight: 'calc(100vh - 200px)' }}>
        <PackageCheck size={60} color="#95a5a6" style={{ marginBottom: '1rem' }} />
        <h2 style={{ marginBottom: '1rem' }}>Seu carrinho está vazio!</h2>
        <p style={{ marginBottom: '1.5rem' }}>Adicione produtos para vê-los aqui.</p>
        <button
            onClick={() => navigate('/')}
            style={{
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem'
            }}
        >
            Ver Produtos
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>Seu Carrinho</h1>
      <div style={{ marginBottom: '2rem' }}>
        {cartItems.map(item => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>
      <div style={{
        borderTop: '2px solid #eee',
        paddingTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ fontSize: '1.5rem', color: '#333' }}>
          Total: <span style={{ fontWeight: 'bold', color: '#27ae60' }}>R$ {total.toFixed(2)}</span>
        </h3>
        <button
          onClick={handleCheckout}
          style={{
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            padding: '1rem 1.8rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <CreditCard size={20} style={{ marginRight: '0.7rem' }} />
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default CartPage;