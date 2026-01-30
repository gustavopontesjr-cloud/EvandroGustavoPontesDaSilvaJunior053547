import { forwardRef, type InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm font-bold text-white tracking-wide">
          {label}
        </label>
        
        <input
          ref={ref}
          className={twMerge(
            "px-4 py-3 rounded-lg bg-surface border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-400 font-medium">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';