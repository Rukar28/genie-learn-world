import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
  category: string;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  size = 'md',
  showTooltip = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl'
  };

  const borderClasses = achievement.isUnlocked
    ? 'border-2 border-reward shadow-glow-reward bg-gradient-to-br from-reward/20 to-reward/5'
    : 'border-2 border-muted bg-muted/10';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: achievement.isUnlocked ? 1.05 : 1 }}
      className={`
        relative rounded-xl flex items-center justify-center transition-all duration-300
        ${sizeClasses[size]} ${borderClasses} ${className}
        ${achievement.isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}
      `}
      title={showTooltip ? `${achievement.title}: ${achievement.description}` : undefined}
    >
      {achievement.isUnlocked ? (
        <motion.span
          animate={{ 
            rotate: [0, -5, 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="filter drop-shadow-lg"
          role="img"
          aria-label={achievement.title}
        >
          {achievement.icon}
        </motion.span>
      ) : (
        <div className="relative">
          <span className="opacity-30 grayscale" role="img" aria-label="locked achievement">
            {achievement.icon}
          </span>
          <Lock className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {achievement.isUnlocked && achievement.unlockedAt && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full shadow-glow-emerald flex items-center justify-center"
        >
          <span className="text-xs">✨</span>
        </motion.div>
      )}
    </motion.div>
  );
};