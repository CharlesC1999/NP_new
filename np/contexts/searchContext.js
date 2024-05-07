import { createContext, useContext, useState } from "react";

const SearchResultsContext = createContext(null);

export function useSearchResults() {
  return useContext(SearchResultsContext);
}

export function SearchResultsProvider({ children }) {
  const [results, setResults] = useState(null);

  return (
    <SearchResultsContext.Provider value={{ results, setResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
}
