import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      navigate(`/pesquisa?q=${encodeURIComponent(trimmedQuery)}`);
    } else {
      console.log("Query de pesquisa vazia, não navegando.");
    }
    setQuery(""); 
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem', 
    maxWidth: '400px',
    flexGrow: 1, 
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
    color: 'var(--searchbar-icon-color)',
    pointerEvents: 'none',
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'var(--searchbar-input-bg)',
    color: 'var(--searchbar-input-text-color)',
    border: '1px solid var(--searchbar-input-border-color)',
    borderRadius: '6px',
    padding: '0.5rem 0.75rem 0.5rem 2.5rem',
    fontSize: '0.9rem',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, background-color 0.3s ease, color 0.3s ease',
  };

  const submitButtonStyle: React.CSSProperties = {
    backgroundColor: isButtonHovered ? 'var(--searchbar-button-hover-bg)' : 'var(--searchbar-button-bg)',
    border: '1px solid var(--searchbar-button-border-color)',
    color: isButtonHovered ? 'var(--searchbar-button-hover-icon-color)' : 'var(--searchbar-button-icon-color)',
    padding: '0.5rem',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
  };


  const srOnlyStyle: React.CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputWrapperStyle}>
        <SearchIcon size={16} style={searchIconInsideInputStyle} />
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
        />
      </div>
      <button
        type="submit"
        style={submitButtonStyle}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        aria-label="Buscar"
      >
        <SearchIcon size={16} />
        {}
      </button>
    </form>
  );
};

export default SearchBar;