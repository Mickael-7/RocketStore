import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/layouts/Navbar';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { initialProducts } from './data/products';
import type { Product } from './types';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccessPage from './pages/CheckoutSucessPage';
import SearchPage from './pages/SearchPages';

const globalStyles: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  minHeight: '100vh'
};

const mainContentStyles: React.CSSProperties = {
  paddingTop: '60px',
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProductStock = (productId: string, quantitySold: number) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, stock: Math.max(0, p.stock - quantitySold) } : p
      )
    );
  };

  return (
    <CartProvider> {}
      <Router>
        <div style={globalStyles}>
          <Navbar />
          <main style={mainContentStyles}>
            <Routes>
              <Route path="/" element={<HomePage products={products} />} />
              <Route
                path="/product/:productId"
                element={<ProductDetailPage products={products} />}
              />
              <Route
                path="/cart"
                element={
                  <CartPage
                    products={products}
                    updateProductStock={updateProductStock}
                  />
                }
              />
              <Route 
                path="/checkout"
                element={
                  <CheckoutPage
                    products={products}
                    updateProductStock={updateProductStock}
                  />
                }
              />
              <Route
                path="/checkout/sucesso"
                element={<CheckoutSuccessPage />}
              />
              <Route path="/pesquisa" element={<SearchPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;