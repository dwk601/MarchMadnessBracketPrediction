'use client';

import { Fragment } from "react";

interface BracketDisplayProps {
  year: string | null;
  isLoading: boolean;
}

export default function BracketDisplay({ year, isLoading }: BracketDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-foreground"></div>
      </div>
    );
  }
  
  if (!year) {
    return <EmptyBracketState />;
  }
  
  return (
    <div className="w-full mx-auto">
      <div className="p-4 sm:p-6 bg-transparent">
        <h2 className="text-xl font-medium mb-6 text-center">NCAA Tournament {year}</h2>
        
        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 gap-4 min-w-[800px]">
            {/* Region Headers */}
            <div className="col-span-3 grid grid-cols-3">
              <div className="text-center font-medium text-sm text-gray-600 dark:text-gray-400">East Region</div>
              <div className="text-center font-medium text-sm text-gray-600 dark:text-gray-400">Midwest Region</div>
              <div className="text-center font-medium text-sm text-gray-600 dark:text-gray-400">South Region</div>
            </div>
            <div className="col-span-3 grid grid-cols-3">
              <div className="text-center font-medium text-sm text-gray-600 dark:text-gray-400">West Region</div>
              <div className="col-span-2 text-center font-medium text-sm text-gray-600 dark:text-gray-400">Final Four</div>
            </div>
            
            {/* Bracket Structure */}
            <div className="col-span-6 grid grid-cols-6 gap-4">
              {/* Round of 64 */}
              {Array(6).fill(0).map((_, i) => (
                <Fragment key={`region-${i}`}>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-medium text-center mb-1 text-gray-500 dark:text-gray-400">
                      {i < 4 ? "FIRST ROUND" : i === 4 ? "FINAL FOUR" : "CHAMPIONSHIP"}
                    </h3>
                    {Array(i < 4 ? 8 : i === 4 ? 2 : 1).fill(0).map((_, j) => (
                      <div 
                        key={`team-${i}-${j}`} 
                        className="border border-black/10 dark:border-white/10 rounded p-2 h-16 flex flex-col justify-between bg-white/30 dark:bg-black/30"
                      >
                        <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-3/4 animate-pulse"></div>
                        {i < 5 && <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-3/4 animate-pulse"></div>}
                      </div>
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyBracketState() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] max-w-md mx-auto text-center">
      <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-5 mb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-gray-500 dark:text-gray-400"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      </div>
      <h2 className="text-xl font-semibold mb-3">No Bracket Selected</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Select a tournament year to view and fill out your March Madness bracket.
      </p>
      <button
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        Learn More About Brackets
      </button>
    </div>
  );
}
