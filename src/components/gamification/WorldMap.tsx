import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Star, CheckCircle } from 'lucide-react';
import { GamingButton } from '@/components/ui/gaming-button';
import { Progress } from '@/components/ui/progress';
import { useDashboardStore } from '@/stores/dashboard';

interface WorldMapProps {
  className?: string;
}

export const WorldMap: React.FC<WorldMapProps> = ({ className = '' }) => {
  const { subjects } = useDashboardStore();

  const getSubjectIcon = (icon: string) => {
    return (
      <span className="text-3xl" role="img" aria-label="subject icon">
        {icon}
      </span>
    );
  };

  const getColorClasses = (color: string, isUnlocked: boolean) => {
    if (!isUnlocked) {
      return 'border-muted text-muted-foreground bg-muted/10';
    }
    
    switch (color) {
      case 'primary':
        return 'border-primary/50 text-primary bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-glow-cyan';
      case 'secondary':
        return 'border-secondary/50 text-secondary bg-gradient-to-br from-secondary/10 to-secondary/5 hover:shadow-glow-emerald';
      case 'magic':
        return 'border-magic/50 text-magic bg-gradient-to-br from-magic/10 to-magic/5 hover:shadow-glow-magic';
      case 'reward':
        return 'border-reward/50 text-reward bg-gradient-to-br from-reward/10 to-reward/5 hover:shadow-glow-reward';
      default:
        return 'border-primary/50 text-primary bg-gradient-to-br from-primary/10 to-primary/5';
    }
  };

  return (
    <div className={`game-panel p-6 ${className}`}>
      <h2 className="text-xl font-bold text-glow-cyan mb-6">Kingdom Map</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: subject.isUnlocked ? 1.02 : 1 }}
              className={`
                relative border-2 rounded-xl p-4 transition-all duration-300
                ${getColorClasses(subject.color, subject.isUnlocked)}
                ${subject.isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}
              `}
            >
              {/* Lock overlay for locked subjects */}
              {!subject.isUnlocked && (
                <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Lock className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <motion.div
                  animate={subject.isUnlocked ? { rotate: [0, -5, 5, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                  className="flex-shrink-0"
                >
                  {getSubjectIcon(subject.icon)}
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">{subject.name}</h3>
                  
                  {subject.isUnlocked && (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground">
                          {subject.completedLessons}/{subject.totalLessons} lessons
                        </span>
                        {subject.progress === 100 && (
                          <CheckCircle className="h-4 w-4 text-secondary" />
                        )}
                      </div>
                      
                      <Progress 
                        value={subject.progress} 
                        className="h-2 mb-3"
                      />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {subject.progress}% Complete
                        </span>
                        {subject.progress > 80 && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-reward fill-reward" />
                            <span className="text-xs text-reward font-medium">
                              Almost there!
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  
                  {!subject.isUnlocked && (
                    <p className="text-sm text-muted-foreground">
                      Complete previous subjects to unlock
                    </p>
                  )}
                </div>
              </div>
              
              {subject.isUnlocked && (
                <GamingButton
                  variant="glow"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => {
                    // Navigate to subject
                    console.log(`Navigate to ${subject.name}`);
                  }}
                >
                  Continue Learning
                </GamingButton>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};