import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StreakCounterProps {
  streak: number;
  className?: string;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({
  streak,
  className = ''
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`game-panel p-4 hover:game-panel-glow cursor-pointer ${className}`}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="relative"
        >
          <Flame 
            className={`h-8 w-8 ${
              streak > 0 
                ? 'text-reward fill-reward/20 drop-shadow-[0_0_8px_hsl(var(--reward))]' 
                : 'text-muted-foreground'
            }`}
          />
          {streak > 7 && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-reward rounded-full shadow-glow-reward"
            />
          )}
        </motion.div>
        
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">
            {t('currentStreak')}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-reward text-glow-reward">
              {streak}
            </span>
            <span className="text-sm text-muted-foreground">
              {t('days')}
            </span>
          </div>
        </div>
      </div>
      
      {streak > 0 && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-3 h-1 bg-gradient-reward rounded-full shadow-glow-reward"
        />
      )}
    </motion.div>
  );
};