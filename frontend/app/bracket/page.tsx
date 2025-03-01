'use client';

import { useState } from "react";
import BracketDisplay from "@/components/bracket/bracket-display";
import YearSelector from "@/components/bracket/year-selector";

export default function BracketPage() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleYearChange = (year: string) => {
    setIsLoading(true);
    // Simulate API fetch delay
    setTimeout(() => {
      setSelectedYear(year);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <div className="max-w-7xl mx-auto flex flex-col min-h-screen p-8 sm:p-12 font-[family-name:var(--font-geist-sans)]">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Tournament Bracket
          </h1>
          <YearSelector onSelect={handleYearChange} />
        </header>
        
        <main className="flex-1 bg-white/5 dark:bg-black/5 backdrop-blur-sm rounded-lg border border-black/5 dark:border-white/5 p-6">
          <BracketDisplay year={selectedYear} isLoading={isLoading} />
        </main>

        <footer className="mt-auto pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Select a tournament year to view the complete bracket</p>
        </footer>
      </div>
    </div>
  );
}
