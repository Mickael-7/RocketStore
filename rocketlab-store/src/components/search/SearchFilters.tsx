import React, { useEffect, useState } from 'react';
import type { SearchPageFilters } from '../../types'; 
import {formatCurrency } from '../../types'; 

interface SearchFiltersProps {
  currentFilters: SearchPageFilters;
  onFiltersChange: (newFilters: Partial<SearchPageFilters>) => void;
}

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({ currentFilters, onFiltersChange }) => {
  const [minPrice, setMinPrice] = useState<string>(currentFilters.minPrice.toString());
  const [maxPrice, setMaxPrice] = useState<string>(currentFilters.maxPrice.toString());


  useEffect(() => {
    setMinPrice(currentFilters.minPrice.toString());
    setMaxPrice(currentFilters.maxPrice.toString());
  }, [currentFilters.minPrice, currentFilters.maxPrice]);

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = e.target.value;
    if (type === 'min') setMinPrice(value);
    if (type === 'max') setMaxPrice(value);
  };

  const applyPriceFilter = () => {
    let newMin = parseFloat(minPrice) || 0;
    let newMax = parseFloat(maxPrice) || 10000;
    if (newMin < 0) newMin = 0;
    if (newMax < 0 || newMax < newMin) newMax = 10000;

    onFiltersChange({ minPrice: newMin, maxPrice: newMax });
  }


  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ sortBy: e.target.value });
  };


  const filterGroupCardStyle: React.CSSProperties = {
    backgroundColor: 'var(--filter-card-bg)',
    border: '1px solid var(--filter-card-border-color)',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1.5rem',
  };
  const filterTitleStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--filter-title-color)',
    marginBottom: '0.75rem',
  };
  const labelStyle: React.CSSProperties = { 
    fontSize: '0.9rem',
    color: 'var(--filter-label-color)',
    marginBottom: '0.25rem',
  };
  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '6px',
    border: '1px solid var(--filter-select-border-color)',
    backgroundColor: 'var(--filter-select-bg)',
    color: 'var(--filter-select-text-color)',
    fontSize: '0.9rem',
  };
  const inputStyle: React.CSSProperties = { 
    width: '100%',
    padding: '0.6rem',
    borderRadius: '6px',
    border: '1px solid var(--filter-select-border-color)',
    backgroundColor: 'var(--filter-select-bg)',
    color: 'var(--filter-select-text-color)',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
  };
   const priceRangeTextStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    color: 'var(--muted-text-color)',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.5rem'
  };
  const applyPriceButtonStyle: React.CSSProperties = {
    backgroundColor: 'var(--search-button-bg)',
    color: 'var(--search-button-text-color)',
    border: 'none',
    padding: '0.5rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    marginTop: '0.75rem',
    width: '100%'
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {}
      <div style={filterGroupCardStyle}>
        <h3 style={filterTitleStyle}>Faixa de Preço</h3>
        <div style={{ marginBottom: '0.75rem'}}>
          <label htmlFor="minPrice" style={labelStyle}>Mínimo (R$)</label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => handlePriceInputChange(e, 'min')}
            placeholder="0"
            style={inputStyle}
            min="0"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" style={labelStyle}>Máximo (R$)</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => handlePriceInputChange(e, 'max')}
            placeholder="10000"
            style={inputStyle}
            min="0"
          />
        </div>
        <div style={priceRangeTextStyle}>
            <span>{formatCurrency(Number(minPrice) || 0)}</span>
            <span>{formatCurrency(Number(maxPrice) || 10000)}</span>
        </div>
        <button onClick={applyPriceFilter} style={applyPriceButtonStyle}>Aplicar Preço</button>
      </div>

      {}
      <div style={filterGroupCardStyle}>
        <h3 style={filterTitleStyle}>Ordenar por</h3>
        <select value={currentFilters.sortBy} onChange={handleSortChange} style={selectStyle}>
          <option value="relevancia">Relevância</option>
          <option value="preco-menor">Menor Preço</option>
          <option value="preco-maior">Maior Preço</option>
          <option value="nome">Nome (A-Z)</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFiltersComponent;