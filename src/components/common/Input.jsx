/**
 * Input Component
 * Reusable input field with validation states
 */

import { forwardRef, useState } from 'react'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  error,
  success,
  helperText,
  leftIcon,
  rightIcon,
  disabled = false,
  required = false,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  const getStateStyles = () => {
    if (error) return 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
    if (success) return 'border-green-500/50 focus:border-green-500 focus:ring-green-500/20'
    return 'border-dark-600/50 focus:border-primary-500/50 focus:ring-primary-500/20'
  }

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-dark-200">
          {label}
          {required && <span className="text-primary-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full bg-dark-800/50 backdrop-blur-sm
            border rounded-xl
            px-4 py-3
            text-dark-100 placeholder-dark-400
            transition-all duration-300
            focus:outline-none focus:ring-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon || isPassword ? 'pr-10' : ''}
            ${getStateStyles()}
            ${className}
          `}
          {...props}
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        
        {!isPassword && rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400">
            {rightIcon}
          </div>
        )}
        
        {/* State indicators */}
        {error && !isPassword && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <AlertCircle className="w-5 h-5" />
          </div>
        )}
        
        {success && !isPassword && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            <CheckCircle className="w-5 h-5" />
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {(error || success || helperText) && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-sm ${
              error ? 'text-red-400' : 
              success ? 'text-green-400' : 
              'text-dark-400'
            }`}
          >
            {error || success || helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
})

Input.displayName = 'Input'

export default Input
