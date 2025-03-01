'use client';

import { useState } from "react";

interface YearSelectorProps {
  onSelect: (year: string) => void;
}

export default function YearSelector({ onSelect }: YearSelectorProps) {
  const availableYears = ["2024", "2023", "2022", "2021", "2020", "2019"];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  
  const handleSelectYear = (year: string) => {
    setSelected(year);
    setIsOpen(false);
    onSelect(year);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-between gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 min-w-[160px]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{selected || "Select Year"}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-background border border-black/10 dark:border-white/10 rounded-lg shadow-lg w-full z-10 py-1">
          <ul role="listbox">
            {availableYears.map((year) => (
              <li key={year} role="option" aria-selected={selected === year}>
                <button 
                  className="w-full text-left px-4 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors"
                  onClick={() => handleSelectYear(year)}
                >
                  {year}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
