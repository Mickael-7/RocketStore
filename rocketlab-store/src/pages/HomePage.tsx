
import React from 'react';
import ProductList from '../components/product/ProductList';
import type { Product } from '../types';

interface HomePageProps {
  products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Nossos Produtos</h1>
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;