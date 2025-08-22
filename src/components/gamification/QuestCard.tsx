import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Gift, Target } from 'lucide-react';
import { GamingButton } from '@/components/ui/gaming-button';
import { Progress } from '@/components/ui/progress';
import { useDashboardStore } from '@/stores/dashboard';
import { useAuthStore } from '@/stores/auth';

interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  type: 'daily' | 'weekly';
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  isClaimable: boolean;
}

interface QuestCardProps {
  quest: Quest;
  className?: string;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, className = '' }) => {
  const { claimQuestReward } = useDashboardStore();
  const { updateUser, user } = useAuthStore();

  const handleClaimReward = () => {
    if (quest.isClaimable) {
      claimQuestReward(quest.id);
      if (user) {
        updateUser({ xp: user.xp + quest.reward });
      }
    }
  };

  const progressPercentage = (quest.progress / quest.maxProgress) * 100;

  const getTypeColor = (type: 'daily' | 'weekly') => {
    return type === 'daily' ? 'text-primary' : 'text-secondary';
  };

  const getTypeIcon = (type: 'daily' | 'weekly') => {
    return type === 'daily' ? Clock : Target;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`game-panel p-4 hover:game-panel-glow transition-all duration-300 ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {React.createElement(getTypeIcon(quest.type), { 
            className: `h-4 w-4 ${getTypeColor(quest.type)}` 
          })}
          <span className={`text-xs font-medium ${getTypeColor(quest.type)} capitalize`}>
            {quest.type}
          </span>
        </div>
        
        {quest.isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <CheckCircle className="h-5 w-5 text-secondary" />
          </motion.div>
        )}
      </div>

      <h3 className="font-semibold text-foreground mb-1">{quest.title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{quest.description}</p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium">
            {quest.progress}/{quest.maxProgress}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift className="h-4 w-4 text-reward" />
          <span className="text-reward font-semibold text-glow-reward">
            {quest.reward} XP
          </span>
        </div>

        {quest.isClaimable ? (
          <GamingButton
            variant="reward"
            size="sm"
            onClick={handleClaimReward}
            className="animate-bounce-pulse"
          >
            Claim Reward
          </GamingButton>
        ) : quest.isCompleted ? (
          <span className="text-sm text-secondary font-medium">Claimed</span>
        ) : (
          <span className="text-sm text-muted-foreground">In Progress</span>
        )}
      </div>
    </motion.div>
  );
};