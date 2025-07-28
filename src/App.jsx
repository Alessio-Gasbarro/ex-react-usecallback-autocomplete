import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- Funzione API ---
  const fetchSuggestions = async (searchTerm) => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:3333/products?search=${searchTerm}`
      );
      setSuggestions(res.data);
    } catch (err) {
      console.error("Errore nel fetch dei suggerimenti:", err);
    }
  };

  // --- Debounce tramite useCallback ---
  const debouncedFetch = useCallback(
    (() => {
      let timeoutId;
      return (value) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          fetchSuggestions(value);
        }, 300);
      };
    })(),
    []
  );

  // --- Effetto: parte quando cambia query ---
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    debouncedFetch(query.trim());
  }, [query, debouncedFetch]);

  // --- Dettagli prodotto ---
  const loadProductDetails = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3333/products/${id}`);
      setSelectedProduct(res.data);
      setSuggestions([]);
    } catch (err) {
      console.error("Errore nel fetch dettagli:", err);
    }
  };

  return (
    <div className="app">
      <h2>Campo di Ricerca Prodotti</h2>
      <input
        type="text"
        placeholder="Cerca prodotto..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedProduct(null);
        }}
      />

      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((item) => (
            <div
              key={item.id}
              className="suggestion-item"
              onClick={() => {
                setQuery(item.name);
                loadProductDetails(item.id);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="product-details">
          <h3>{selectedProduct.name}</h3>
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          <p>{selectedProduct.description}</p>
          <strong>Prezzo: €{selectedProduct.price}</strong>
        </div>
      )}
    </div>
  );
}

export default App;