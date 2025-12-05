/**
 * ProgressRing Component
 * Circular progress indicator for diagnosis results
 */

import { motion } from 'framer-motion'

const ProgressRing = ({
  percentage = 0,
  size = 120,
  strokeWidth = 8,
  color = 'primary',
  showPercentage = true,
  label,
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  const colors = {
    primary: {
      stroke: '#f59e0b',
      gradient: ['#fbbf24', '#f59e0b', '#d97706'],
    },
    success: {
      stroke: '#22c55e',
      gradient: ['#4ade80', '#22c55e', '#16a34a'],
    },
    warning: {
      stroke: '#eab308',
      gradient: ['#facc15', '#eab308', '#ca8a04'],
    },
    danger: {
      stroke: '#ef4444',
      gradient: ['#f87171', '#ef4444', '#dc2626'],
    },
  }

  const selectedColor = colors[color] || colors.primary
  const gradientId = `progress-gradient-${Math.random().toString(36).substr(2, 9)}`

  // Determine color based on percentage
  const getAutoColor = () => {
    if (percentage >= 70) return colors.danger
    if (percentage >= 50) return colors.warning
    if (percentage >= 30) return colors.primary
    return colors.success
  }

  const finalColor = color === 'auto' ? getAutoColor() : selectedColor

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={finalColor.gradient[0]} />
            <stop offset="50%" stopColor={finalColor.gradient[1]} />
            <stop offset="100%" stopColor={finalColor.gradient[2]} />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="none"
          className="text-dark-700"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={`url(#${gradientId})`}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <motion.span
            className="text-2xl md:text-3xl font-bold"
            style={{ color: finalColor.stroke }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {percentage.toFixed(1)}%
          </motion.span>
        )}
        {label && (
          <span className="text-xs text-dark-400 mt-1">{label}</span>
        )}
      </div>
    </div>
  )
}

// Mini Progress Ring
export const MiniProgressRing = ({
  percentage = 0,
  size = 40,
  strokeWidth = 3,
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  const getColor = () => {
    if (percentage >= 70) return '#ef4444'
    if (percentage >= 50) return '#eab308'
    if (percentage >= 30) return '#f59e0b'
    return '#22c55e'
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="none"
          className="text-dark-700"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={getColor()}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <span 
        className="absolute text-xs font-semibold"
        style={{ color: getColor() }}
      >
        {Math.round(percentage)}
      </span>
    </div>
  )
}

export default ProgressRing
