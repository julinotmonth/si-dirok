/**
 * Select Component
 * Custom select dropdown with styling
 */

import { forwardRef } from 'react'
import { ChevronDown, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Select = forwardRef(({
  label,
  options = [],
  placeholder = 'Pilih opsi',
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-dark-200">
          {label}
          {required && <span className="text-primary-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          disabled={disabled}
          className={`
            w-full bg-dark-800/50 backdrop-blur-sm
            border rounded-xl
            px-4 py-3 pr-10
            text-dark-100
            transition-all duration-300
            focus:outline-none focus:ring-2
            disabled:opacity-50 disabled:cursor-not-allowed
            appearance-none cursor-pointer
            ${error 
              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
              : 'border-dark-600/50 focus:border-primary-500/50 focus:ring-primary-500/20'
            }
            ${className}
          `}
          {...props}
        >
          <option value="" disabled className="bg-dark-800 text-dark-400">
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-dark-800 text-dark-100"
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-dark-400">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
      
      <AnimatePresence>
        {(error || helperText) && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-sm flex items-center gap-1 ${
              error ? 'text-red-400' : 'text-dark-400'
            }`}
          >
            {error && <AlertCircle className="w-4 h-4" />}
            {error || helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
})

Select.displayName = 'Select'

export default Select
