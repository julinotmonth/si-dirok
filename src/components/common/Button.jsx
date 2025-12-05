/**
 * Button Component
 * Reusable button with multiple variants and states
 */

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-dark-950 hover:shadow-glow',
  secondary: 'bg-dark-700 text-dark-100 hover:bg-dark-600',
  outline: 'border-2 border-primary-500/50 text-primary-400 hover:bg-primary-500/10 hover:border-primary-400',
  ghost: 'text-dark-300 hover:text-primary-400 hover:bg-dark-800/50',
  danger: 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30',
  success: 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
}

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 
    font-semibold rounded-xl 
    transition-all duration-300 
    focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-dark-900
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Memproses...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="w-5 h-5">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="w-5 h-5">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button
