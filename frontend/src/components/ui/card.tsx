import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
    if (onClick) {
        return (
        <div onClick={onClick} className={`bg-gray-800 text-white p-4 rounded-xl shadow-lg ${className}`}>
            {children}
        </div>
        );
    }
  return (
    <div className={`bg-gray-800 text-white p-4 rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="p-2">{children}</div>;
}