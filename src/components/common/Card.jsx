/**
 * Card Component
 * Reusable card with glassmorphism effect
 */

import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const variants = {
  default: 'glass-card',
  hover: 'glass-card-hover',
  solid: 'bg-dark-800 border border-dark-700',
  transparent: 'bg-transparent',
  gradient: 'bg-gradient-to-br from-dark-800/80 to-dark-900/80 border border-dark-700/50 backdrop-blur-xl',
}

const Card = forwardRef(({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  animate = false,
  onClick,
  ...props
}, ref) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const Component = animate ? motion.div : 'div'
  
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 }
  } : {}

  return (
    <Component
      ref={ref}
      onClick={onClick}
      className={`
        ${variants[variant]}
        ${paddingStyles[padding]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  )
})

Card.displayName = 'Card'

// Card Header
export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
)

// Card Title
export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold text-dark-100 ${className}`}>
    {children}
  </h3>
)

// Card Description
export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-dark-400 text-sm mt-1 ${className}`}>
    {children}
  </p>
)

// Card Content
export const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
)

// Card Footer
export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-dark-700/50 ${className}`}>
    {children}
  </div>
)

export default Card
