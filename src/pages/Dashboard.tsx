import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { XPBar } from '@/components/gamification/XPBar';
import { StreakCounter } from '@/components/gamification/StreakCounter';
import { WorldMap } from '@/components/gamification/WorldMap';
import { QuestCard } from '@/components/gamification/QuestCard';
import { AchievementBadge } from '@/components/gamification/AchievementBadge';
import { SessionTimer } from '@/components/gamification/SessionTimer';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { GamingButton } from '@/components/ui/gaming-button';
import { Confetti } from '@/components/effects/Confetti';
import { useAuthStore } from '@/stores/auth';
import { useDashboardStore } from '@/stores/dashboard';
import { 
  Trophy, 
  Target, 
  Clock, 
  Users, 
  Settings, 
  User,
  LogOut,
  Crown,
  Medal,
  Calendar
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const { quests, achievements, leaderboard, studyStreak, todayXP, weeklyXP } = useDashboardStore();
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState('global');

  if (!user) return null;

  const nextLevelXP = Math.pow(user.level, 2) * 100; // Example XP calculation
  const dailyQuests = quests.filter(q => q.type === 'daily');
  const weeklyQuests = quests.filter(q => q.type === 'weekly');
  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const lockedAchievements = achievements.filter(a => !a.isUnlocked);

  const handleAchievementClick = (achievement: any) => {
    if (achievement.isUnlocked) {
      setShowConfetti(true);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <Confetti 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <span className="text-3xl">🧞‍♂️</span>
          <div>
            <h1 className="text-2xl font-bold text-glow-cyan">
              Welcome back, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground">Ready for another magical learning session?</p>
          </div>
        </motion.div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <GamingButton
            variant="ghost"
            onClick={logout}
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
          </GamingButton>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Progress & Streak */}
        <div className="space-y-6">
          <XPBar
            currentXP={user.xp}
            nextLevelXP={nextLevelXP}
            level={user.level}
          />
          
          <StreakCounter streak={studyStreak} />
          
          <SessionTimer />
          
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="game-panel p-4"
          >
            <h3 className="font-semibold text-glow-cyan mb-4">Today's Progress</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">XP Earned</span>
                <span className="text-primary font-medium text-glow-cyan">+{todayXP}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="text-secondary font-medium text-glow-emerald">+{weeklyXP}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Streak</span>
                <span className="text-reward font-medium text-glow-reward">{studyStreak} days</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center Column - Kingdom Map */}
        <div className="lg:col-span-1">
          <WorldMap />
        </div>

        {/* Right Column - Quests & Achievements */}
        <div className="space-y-6">
          {/* Quest Log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="game-panel p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-reward" />
              <h3 className="text-lg font-semibold text-glow-reward">Quest Log</h3>
            </div>

            <Tabs defaultValue="daily" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-muted/20">
                <TabsTrigger value="daily" className="data-[state=active]:bg-reward/20">
                  <Clock className="h-4 w-4 mr-2" />
                  Daily
                </TabsTrigger>
                <TabsTrigger value="weekly" className="data-[state=active]:bg-magic/20">
                  <Calendar className="h-4 w-4 mr-2" />
                  Weekly
                </TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="space-y-3">
                {dailyQuests.map(quest => (
                  <QuestCard key={quest.id} quest={quest} />
                ))}
              </TabsContent>

              <TabsContent value="weekly" className="space-y-3">
                {weeklyQuests.map(quest => (
                  <QuestCard key={quest.id} quest={quest} />
                ))}
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="game-panel p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-semibold text-glow-emerald">Achievements</h3>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {achievements.slice(0, 8).map((achievement) => (
                <div
                  key={achievement.id}
                  onClick={() => handleAchievementClick(achievement)}
                >
                  <AchievementBadge
                    achievement={achievement}
                    size="md"
                  />
                </div>
              ))}
            </div>

            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                {unlockedAchievements.length} of {achievements.length} unlocked
              </span>
            </div>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="game-panel p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Crown className="h-5 w-5 text-reward" />
              <h3 className="text-lg font-semibold text-glow-reward">Leaderboard</h3>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 bg-muted/20 text-xs">
                <TabsTrigger value="global" className="data-[state=active]:bg-primary/20">
                  Global
                </TabsTrigger>
                <TabsTrigger value="friends" className="data-[state=active]:bg-secondary/20">
                  Friends
                </TabsTrigger>
                <TabsTrigger value="weekly" className="data-[state=active]:bg-reward/20">
                  Weekly
                </TabsTrigger>
              </TabsList>

              {(['global', 'friends', 'weekly'] as const).map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-2">
                  {leaderboard[tab].slice(0, 5).map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg transition-colors
                        ${entry.name === 'You' 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'bg-muted/10 hover:bg-muted/20'
                        }
                      `}
                    >
                      <div className={`
                        flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                        ${index === 0 ? 'bg-reward text-reward-foreground' :
                          index === 1 ? 'bg-muted text-muted-foreground' :
                          index === 2 ? 'bg-reward/50 text-reward-foreground' :
                          'bg-muted/50 text-muted-foreground'
                        }
                      `}>
                        {entry.rank}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{entry.name}</p>
                        <p className="text-xs text-muted-foreground">Level {entry.level}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium text-primary text-glow-cyan">
                          {entry.xp.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">XP</p>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};