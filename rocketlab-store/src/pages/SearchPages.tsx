import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Product, SearchPageFilters } from '../types'; 
import { initialProducts } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import SearchFiltersComponent from '../components/search/SearchFilters';
import { Search as SearchIcon, X as XIcon } from 'lucide-react';
import { clientSideSearchProducts, formatCurrency } from '../types';

interface SearchPageProps {

}

const SearchPage: React.FC<SearchPageProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams(); 
  const navigate = useNavigate(); 

  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false); 

  const [searchQueryInPage, setSearchQueryInPage] = useState(searchParams.get("q") || "");

  const [filters, setFilters] = useState<SearchPageFilters>({
    query: searchParams.get("q") || "",
    minPrice: Number(searchParams.get("precoMin")) || 0,
    maxPrice: Number(searchParams.get("precoMax")) || 10000,
    sortBy: searchParams.get("ordenar") || "relevancia",
  });

  useEffect(() => {
    setFilters({
      query: searchParams.get("q") || "",
      minPrice: Number(searchParams.get("precoMin")) || 0,
      maxPrice: Number(searchParams.get("precoMax")) || 10000,
      sortBy: searchParams.get("ordenar") || "relevancia",
    });
    setSearchQueryInPage(searchParams.get("q") || "");
  }, [searchParams]);


  const filteredAndSortedProducts = useMemo(() => {
    setLoading(true);
    let filtered = clientSideSearchProducts(allProducts, filters);

    switch (filters.sortBy) {
      case "preco-menor":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "preco-maior":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "nome":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: 
        break;
    }

    setLoading(false);
    return filtered;
  }, [allProducts, filters]);

  const updateURLWithFilters = (newFilters: SearchPageFilters) => {
    const params = new URLSearchParams();
    if (newFilters.query) params.set("q", newFilters.query);
    if (newFilters.minPrice > 0) params.set("precoMin", newFilters.minPrice.toString());
    if (newFilters.maxPrice < 10000 && newFilters.maxPrice > 0) params.set("precoMax", newFilters.maxPrice.toString());
    if (newFilters.sortBy && newFilters.sortBy !== "relevancia") params.set("ordenar", newFilters.sortBy);

    setSearchParams(params);
  };


  const handleInPageSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters = { ...filters, query: searchQueryInPage.trim() };
    setFilters(newFilters);
    updateURLWithFilters(newFilters);
  };

  const handleFiltersChange = (changedFilterValues: Partial<SearchPageFilters>) => {
    const newFilters = { ...filters, ...changedFilterValues };
    setFilters(newFilters);
    updateURLWithFilters(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters: SearchPageFilters = {
      query: "",
      minPrice: 0,
      maxPrice: 10000,
      sortBy: "relevancia",
    };
    setFilters(defaultFilters);
    setSearchQueryInPage("");
    updateURLWithFilters(defaultFilters);
  };

  const hasActiveFilters = useMemo(() => (
    filters.query ||
    filters.minPrice > 0 ||
    (filters.maxPrice < 10000 && filters.maxPrice > 0) || 
    filters.sortBy !== "relevancia"
  ), [filters]);

  const pageContainerStyle: React.CSSProperties = {
    padding: '1rem', 
    paddingTop: `calc(${'70px'} + 1rem)`, 
    maxWidth: '1300px',
    margin: '0 auto',
    color: 'var(--app-text-color)',
  };
  const topSectionStyle: React.CSSProperties = {
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };
  const pageTitleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'var(--search-page-title-color)',
  };
  const searchFormStyle: React.CSSProperties = { 
    display: 'flex',
    gap: '0.5rem',
  };
   const inputWrapperStyle: React.CSSProperties = { 
    position: 'relative',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  };
  const searchIconInsideInputStyle: React.CSSProperties = {
    position: 'absolute',
    left: '0.75rem',
    color: 'var(--search-input-icon-color)',
    pointerEvents: 'none',
  };
  const inputStyle: React.CSSProperties = { 
    backgroundColor: 'var(--search-input-bg)',
    color: 'var(--search-input-text-color)',
    border: '1px solid var(--search-input-border-color)',
    borderRadius: '6px',
    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
  };
  const searchButtonStyle: React.CSSProperties = {
    backgroundColor: 'var(--search-button-bg)',
    color: 'var(--search-button-text-color)',
    border: 'none',
    padding: '0.75rem 1.25rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  };

  const activeFiltersContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
    padding: '0.5rem 0',
  };
  const activeFilterTagStyle: React.CSSProperties = {
    backgroundColor: 'var(--active-filter-bg)',
    color: 'var(--active-filter-text-color)',
    padding: '0.25rem 0.6rem',
    borderRadius: '1rem',
    fontSize: '0.8rem',
  };
  const clearFiltersButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'var(--search-clear-button-text-color)',
    cursor: 'pointer',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0.25rem',
  };

  const mainGridStyle: React.CSSProperties = {
    display: 'grid',
    gap: '5px',
  };
  const [isDesktop, setIsDesktopView] = useState(window.matchMedia("(min-width: 1024px)").matches);
   useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)"); 
    const handler = () => setIsDesktopView(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const responsiveMainGridStyle: React.CSSProperties = {
      ...mainGridStyle,
      gridTemplateColumns: isDesktop ? '300px 1fr' : '1fr',
  };


  const loadingStyle: React.CSSProperties = {};
  const noResultsCardStyle: React.CSSProperties = {};
  const resultsGridStyle: React.CSSProperties = {
    display: 'grid',
    gap: '5px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    alignItems: 'start',
  };


  return (
    <div style={pageContainerStyle}>
      <div style={topSectionStyle}>
        <h1 style={pageTitleStyle}>Pesquisar Produtos</h1>
        <form onSubmit={handleInPageSearchSubmit} style={searchFormStyle}>
          <div style={inputWrapperStyle}>
            <SearchIcon size={16} style={searchIconInsideInputStyle} />
            <input
              type="text"
              placeholder="Buscar em todos os produtos..."
              value={searchQueryInPage}
              onChange={(e) => setSearchQueryInPage(e.target.value)}
              style={inputStyle}
            />
          </div>
          <button type="submit" style={searchButtonStyle}>Buscar</button>
        </form>

        {hasActiveFilters && (
          <div style={activeFiltersContainerStyle}>
            <span style={{ fontSize: '0.9rem', color: 'var(--muted-text-color)' }}>Filtros ativos:</span>
            {filters.query && <span style={activeFilterTagStyle}>"{filters.query}"</span>}
            {(filters.minPrice > 0 || (filters.maxPrice < 10000 && filters.maxPrice > 0 )) && (
              <span style={activeFilterTagStyle}>
                {formatCurrency(filters.minPrice)} - {formatCurrency(filters.maxPrice === 10000 && filters.minPrice > 0 ? Infinity : filters.maxPrice)}
              </span>
            )}
            {filters.sortBy !== "relevancia" && <span style={activeFilterTagStyle}>Ordenado por: {filters.sortBy.replace('-', ' ')}</span>}
            <button onClick={clearAllFilters} style={clearFiltersButtonStyle} title="Limpar todos os filtros">
              <XIcon size={16} style={{ marginRight: '0.25rem' }} /> Limpar filtros
            </button>
          </div>
        )}
      </div>

      <div style={responsiveMainGridStyle}>
        <aside> {}
          <SearchFiltersComponent currentFilters={filters} onFiltersChange={handleFiltersChange} />
        </aside>

        <main> {}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-text-color)'}}>
              {}
              Carregando produtos...
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted-text-color)'}}>
                  {filteredAndSortedProducts.length} produto{filteredAndSortedProducts.length !== 1 ? "s" : ""} encontrado{filteredAndSortedProducts.length !== 1 ? "s" : ""}
                </p>
                {}
              </div>

              {filteredAndSortedProducts.length === 0 ? (
                <div style={{
                    backgroundColor: 'var(--filter-card-bg)',
                    border: '1px solid var(--filter-card-border-color)',
                    borderRadius: '8px', padding: '2rem', textAlign: 'center'
                }}>
                  <SearchIcon size={48} style={{ color: 'var(--muted-text-color)', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--app-text-color)', marginBottom: '0.5rem' }}>
                    Nenhum produto encontrado
                  </h3>
                  <p style={{ color: 'var(--muted-text-color)', marginBottom: '1rem' }}>
                    Tente ajustar seus filtros ou termos de pesquisa.
                  </p>
                  <button onClick={clearAllFilters} style={{...searchButtonStyle, width: 'auto', backgroundColor: 'var(--searchbar-button-bg)', color: 'var(--searchbar-button-icon-color)', border: '1px solid var(--searchbar-button-border-color)'}}>
                    Limpar filtros
                  </button>
                </div>
              ) : (
                <div style={resultsGridStyle}>
                  {filteredAndSortedProducts.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;