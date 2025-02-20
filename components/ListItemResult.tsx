import React, { useState } from "react";
import MinimizedListItemResult from "./MinimizedListItemResult";
import MaximizedListItemResult from "./MaximizedListItemResult";
import { FlightInfo } from "@/types/flight";
import MinimizedListItemResultMobile from "./MinimizedListItemResultMobile";

function ListItemResult({ flightInfo }: { flightInfo: FlightInfo }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Minimized Card (Collapses when expanded) */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isExpanded
            ? "opacity-0 scale-95 h-0 overflow-hidden"
            : "opacity-100 scale-100 h-auto"
        }`}
      >
        <div className="hidden sm:block">
          <MinimizedListItemResult
            flightInfo={flightInfo}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        </div>
        <div className="sm:hidden">
          <MinimizedListItemResultMobile
            flightInfo={flightInfo}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        </div>
      </div>

      {/* Maximized Card (Expands when clicked) */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isExpanded
            ? "opacity-100 scale-100 h-auto"
            : "opacity-0 scale-95 h-0 overflow-hidden"
        }`}
      >
        <div className="hidden sm:block">
          <MaximizedListItemResult
            flightInfo={flightInfo}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        </div>
      </div>
    </div>
  );
}

export default ListItemResult;
