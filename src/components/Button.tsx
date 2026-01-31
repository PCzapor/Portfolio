import { ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'px-6 py-3 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none'

  const variants = {
    primary:
      'bg-transparent border border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-[#111] hover:shadow-[0_0_20px_var(--accent-orange)]',
    secondary:
      'bg-[rgba(255,255,255,0.03)] border border-circuit text-text-main hover:border-accent-orange/50',
    outline:
      'bg-transparent border border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-[#111] hover:shadow-[0_0_20px_var(--accent-orange)]',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
