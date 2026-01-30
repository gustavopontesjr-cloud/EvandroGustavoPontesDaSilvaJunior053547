import type { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'danger' | 'outline';
}

export function Button({ 
  children, 
  isLoading, 
  variant = 'primary', 
  className, 
  ...props 
}: ButtonProps) {
  
  const variants = {
    primary: "bg-primary text-black font-bold hover:bg-primary-hover focus:ring-primary",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline: "border border-gray-700 text-text-main hover:bg-surface focus:ring-gray-500"
  };

  return (
    <button 
      className={`
        flex items-center justify-center px-4 py-3 rounded-lg font-bold tracking-wide
        transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background
        ${variants[variant]} 
        ${className || ''}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}