import React from 'react';
import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger' | 'warning';
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-[#4A90E2] hover:bg-[#357ABD] hover:shadow-lg hover:shadow-blue-200/40 text-white',
  success: 'bg-[#7ED321] hover:bg-[#6BB01C] hover:shadow-lg hover:shadow-green-200/40 text-white',
  danger: 'bg-[#D0021B] hover:bg-[#B0011B] hover:shadow-lg hover:shadow-red-200/40 text-white',
  warning: 'bg-[#F8E71C] hover:bg-[#E8D71C] hover:shadow-lg hover:shadow-yellow-200/40 text-black',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  fullWidth,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        rounded-lg font-medium transition-all duration-200
        active:transform active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:transform-none
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Carregando...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}