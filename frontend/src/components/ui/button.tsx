import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 ${className}`} {...props}>
      {children}
    </button>
  );
}