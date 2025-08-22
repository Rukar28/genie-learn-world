import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Square, Clock, Zap } from 'lucide-react';
import { GamingButton } from '@/components/ui/gaming-button';
import { Progress } from '@/components/ui/progress';
import { useSessionStore } from '@/stores/session';
import { useDashboardStore } from '@/stores/dashboard';

interface SessionTimerProps {
  className?: string;
}

export const SessionTimer: React.FC<SessionTimerProps> = ({ className = '' }) => {
  const {
    pomodoroSession,
    currentSession,
    startPomodoro,
    pausePomodoro,
    stopPomodoro,
    updatePomodoroTime,
    startSession,
    endSession
  } = useSessionStore();
  
  const { addXP } = useDashboardStore();

  // Update timer every second
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pomodoroSession.isActive) {
      interval = setInterval(() => {
        updatePomodoroTime();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pomodoroSession.isActive, updatePomodoroTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!currentSession) {
      startSession('1'); // Default subject ID
    }
    if (!pomodoroSession.isActive) {
      if (pomodoroSession.timeLeft === pomodoroSession.duration * 60) {
        startPomodoro(25); // 25 minute default
      } else {
        // Resume existing session
        useSessionStore.setState(state => ({
          pomodoroSession: { ...state.pomodoroSession, isActive: true }
        }));
      }
    }
  };

  const handlePause = () => {
    pausePomodoro();
  };

  const handleStop = () => {
    stopPomodoro();
    if (currentSession) {
      endSession();
      // Award XP for completed session
      addXP(Math.floor(Math.random() * 50) + 25); // 25-75 XP
    }
  };

  const progress = pomodoroSession.duration > 0 
    ? ((pomodoroSession.duration * 60 - pomodoroSession.timeLeft) / (pomodoroSession.duration * 60)) * 100
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`game-panel p-6 ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-glow-cyan">Study Session</h3>
      </div>

      <div className="text-center mb-6">
        <motion.div
          animate={pomodoroSession.isActive ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          className="relative inline-block"
        >
          <div className={`
            text-5xl font-bold mb-2 transition-colors duration-300
            ${pomodoroSession.isBreak 
              ? 'text-secondary text-glow-emerald' 
              : 'text-primary text-glow-cyan'
            }
          `}>
            {formatTime(pomodoroSession.timeLeft)}
          </div>
          
          {pomodoroSession.isActive && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <Zap className="h-6 w-6 text-reward" />
            </motion.div>
          )}
        </motion.div>

        <p className="text-sm text-muted-foreground mb-4">
          {pomodoroSession.isBreak ? 'Break Time' : 'Focus Time'}
        </p>

        <Progress 
          value={progress} 
          className="h-2 mb-6"
        />
      </div>

      <div className="flex gap-2 justify-center">
        {!pomodoroSession.isActive ? (
          <GamingButton
            variant="glow"
            size="lg"
            onClick={handleStart}
            className="flex-1"
          >
            <Play className="h-4 w-4" />
            Start
          </GamingButton>
        ) : (
          <GamingButton
            variant="panel"
            size="lg"
            onClick={handlePause}
            className="flex-1"
          >
            <Pause className="h-4 w-4" />
            Pause
          </GamingButton>
        )}
        
        <GamingButton
          variant="outline"
          size="lg"
          onClick={handleStop}
          disabled={!pomodoroSession.isActive && pomodoroSession.timeLeft === pomodoroSession.duration * 60}
        >
          <Square className="h-4 w-4" />
          Stop
        </GamingButton>
      </div>

      {currentSession && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Session XP:</span>
            <span className="text-primary font-semibold text-glow-cyan">
              +{currentSession.xpEarned} XP
            </span>
          </div>
        </motion.div>
      )}

      <div className="mt-4 text-center text-xs text-muted-foreground">
        Completed: {pomodoroSession.completedSessions} sessions today
      </div>
    </motion.div>
  );
};