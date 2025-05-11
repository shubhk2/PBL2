import React from "react";


// import React from "react";

interface CalendarProps {
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({ className = "" }) => {
  return <div className={`calendar-component ${className}`}>/* Calendar content */</div>;
};