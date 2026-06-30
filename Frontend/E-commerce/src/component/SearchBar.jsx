import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const { showSearch, setShowSearch, searchText, setSearchText } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection") || location.pathname === "/") {
      setVisible(true);
      setShowSearch(true);
    } else {
      setVisible(false);
      setShowSearch(false);
    }
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <div className="bg-white border-b border-slate-100 py-3 px-4 animate-slideDown">
      <div className="max-w-2xl mx-auto flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-200">
          {/* Search Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 5.5 5.5a7.5 7.5 0 0 0 10.65 10.65z" />
          </svg>
          <input
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search products, categories…"
            autoFocus
          />
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {/* Close */}
        <button
          onClick={() => setShowSearch(false)}
          className="text-slate-500 hover:text-slate-800 text-sm font-medium px-4 py-2.5 rounded-full hover:bg-slate-100 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
