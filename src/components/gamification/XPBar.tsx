import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';

interface XPBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  className?: string;
}

export const XPBar: React.FC<XPBarProps> = ({
  currentXP,
  nextLevelXP,
  level,
  className = ''
}) => {
  const { t } = useTranslation();
  const progress = (currentXP / nextLevelXP) * 100;
  const remainingXP = nextLevelXP - currentXP;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`game-panel p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          {t('xpProgress')}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary text-glow-cyan">
            Level {level}
          </span>
        </div>
      </div>
      
      <div className="relative">
        <Progress 
          value={progress} 
          className="h-3 bg-muted/20 border border-primary/20"
        />
        <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-full" />
      </div>
      
      <div className="flex items-center justify-between mt-2 text-sm">
        <span className="text-primary text-glow-cyan font-medium">
          {currentXP.toLocaleString()} XP
        </span>
        <span className="text-muted-foreground">
          {remainingXP.toLocaleString()} to next level
        </span>
      </div>
    </motion.div>
  );
};