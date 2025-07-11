import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative group">
          {icon && (
            <div className="input-icon absolute left-5 top-1/2 -translate-y-1/2 text-gray-400/70 transition-colors duration-200 group-hover:text-primary/70 group-focus-within:text-primary">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              peer w-full h-14 pl-12 pr-5
              bg-white/60 backdrop-blur-lg
              border-[1.5px] border-gray-200/60
              rounded-xl
              text-base font-normal text-gray-700 
              placeholder:text-gray-400/80 placeholder:font-light
              shadow-sm shadow-gray-200/20
              transition-all duration-200
              hover:border-gray-300/80 hover:bg-white/80
              focus:outline-none focus:border-primary/60 focus:bg-white/90
              focus:ring-[3px] focus:ring-primary/10
              ${error ? 'border-red-500/60 focus:ring-red-500/10 focus:border-red-500/60' : ''}
              ${className}
            `}
            {...props}
          />
          <div className="absolute inset-0 rounded-xl transition-opacity duration-200 opacity-0 group-hover:opacity-100 pointer-events-none">
            <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5" />
          </div>
        </div>
        {error && (
          <div className="flex items-start mt-2">
            <svg className="w-4 h-4 text-red-500/90 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="ml-2 text-[13px] text-red-500/90 font-medium">{error}</p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 