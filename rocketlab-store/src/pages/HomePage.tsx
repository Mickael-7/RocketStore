// src/pages/HomePage.tsx
import React from 'react';
import ProductList from '../components/product/ProductList';
import type { Product } from '../types';

interface HomePageProps {
  products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  const heroSectionStyle: React.CSSProperties = {
    backgroundColor: 'var(--hero-bg-color)', // USA VARIÁVEL
    padding: '3rem 1.5rem',
    textAlign: 'center',
    marginBottom: '3rem',
    borderRadius: '8px',
    boxShadow: 'var(--product-card-shadow)', // Pode usar uma variável de sombra também
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  };

  const storeNameStyle: React.CSSProperties = {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    color: 'var(--hero-storename-color)', // USA VARIÁVEL
    marginBottom: '1rem',
    transition: 'color 0.3s ease',
  };

  const taglineStyle: React.CSSProperties = {
    fontSize: '1.3rem',
    color: 'var(--hero-tagline-color)', // USA VARIÁVEL
    marginBottom: '1.5rem',
    maxWidth: '650px',
    margin: '0 auto 1.5rem auto',
    lineHeight: '1.7',
    transition: 'color 0.3s ease',
  };

  const descriptionParagraphStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: 'var(--hero-description-color)', // USA VARIÁVEL
    maxWidth: '650px',
    margin: '0 auto',
    lineHeight: '1.6',
    transition: 'color 0.3s ease',
  };

  const productsTitleStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '2.2rem',
    color: 'var(--products-title-color)', // USA VARIÁVEL
    margin: '3rem 0 1.5rem 0',
    paddingBottom: '0.5rem',
    transition: 'color 0.3s ease',
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '2rem 1rem',
    marginTop: '4rem',
    color: 'var(--footer-text-color)', // USA VARIÁVEL
    fontSize: '0.9rem',
    borderTop: '1px solid var(--footer-border-color)', // USA VARIÁVEL
    transition: 'color 0.3s ease, border-color 0.3s ease',
  };

  return (
    <div>
      <section style={heroSectionStyle}>
        <h1 style={storeNameStyle}>Bem-vindo à RocketStore! 🚀</h1>
        <p style={taglineStyle}>
          Sua jornada para o futuro começa aqui! Descubra a inovação em cada clique.
        </p>
        <p style={descriptionParagraphStyle}>
          Na RocketStore, somos apaixonados por tecnologia de ponta. Oferecemos uma curadoria
          exclusiva dos mais recentes gadgets e eletrônicos...
        </p>
      </section>

      <h2 style={productsTitleStyle}>
        Nossos Produtos Mais Quentes 🔥
      </h2>
      <ProductList products={products} /> {/* ProductList também precisará ser refatorado internamente */}

      <footer style={footerStyle}>
        <p style={{ margin: 0 }}>
          © 2025 RocketShop. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;