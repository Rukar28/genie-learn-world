import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Bell, Clock, Volume2, Moon, Globe, User } from 'lucide-react';
import { GamingButton } from '@/components/ui/gaming-button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { useSettingsStore } from '@/stores/settings';
import { useAuthStore } from '@/stores/auth';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    notifications,
    study,
    updateNotifications,
    updateStudySettings,
    resetToDefaults
  } = useSettingsStore();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <GamingButton
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
        </GamingButton>
        
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-glow-cyan">Settings</h1>
        </div>
      </header>

      <div className="max-w-4xl space-y-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="game-panel p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="h-5 w-5 text-secondary" />
            <h2 className="text-lg font-semibold text-glow-emerald">Profile</h2>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl">
              🧑‍🎓
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-primary">Level {user.level} • {user.xp.toLocaleString()} XP</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <div className="font-semibold text-primary">{user.streak}</div>
              <div className="text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center p-3 bg-secondary/10 rounded-lg">
              <div className="font-semibold text-secondary">{user.class}</div>
              <div className="text-muted-foreground">Class</div>
            </div>
            <div className="text-center p-3 bg-reward/10 rounded-lg">
              <div className="font-semibold text-reward">{user.age}</div>
              <div className="text-muted-foreground">Age</div>
            </div>
            <div className="text-center p-3 bg-magic/10 rounded-lg">
              <div className="font-semibold text-magic">{user.phone}</div>
              <div className="text-muted-foreground">Phone</div>
            </div>
          </div>
        </motion.div>

        {/* Language Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="game-panel p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-glow-cyan">Language</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Interface Language</Label>
              <p className="text-sm text-muted-foreground">
                Choose your preferred language for the interface
              </p>
            </div>
            <LanguageSwitcher />
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="game-panel p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-reward" />
            <h2 className="text-lg font-semibold text-glow-reward">Notifications</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Daily Reminder</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminded to study every day
                </p>
              </div>
              <Switch
                checked={notifications.dailyReminder}
                onCheckedChange={(checked) => 
                  updateNotifications({ dailyReminder: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Achievement Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when you unlock achievements
                </p>
              </div>
              <Switch
                checked={notifications.achievementNotifications}
                onCheckedChange={(checked) => 
                  updateNotifications({ achievementNotifications: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Streak Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Don't break your streak! Get reminder notifications
                </p>
              </div>
              <Switch
                checked={notifications.streakReminders}
                onCheckedChange={(checked) => 
                  updateNotifications({ streakReminders: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Quest Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about new quests and completions
                </p>
              </div>
              <Switch
                checked={notifications.questUpdates}
                onCheckedChange={(checked) => 
                  updateNotifications({ questUpdates: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) => 
                  updateNotifications({ emailNotifications: checked })
                }
              />
            </div>
          </div>
        </motion.div>

        {/* Study Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="game-panel p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="h-5 w-5 text-secondary" />
            <h2 className="text-lg font-semibold text-glow-emerald">Study Settings</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-2 block">
                Pomodoro Length: {study.pomodoroLength} minutes
              </Label>
              <Slider
                value={[study.pomodoroLength]}
                onValueChange={([value]) => 
                  updateStudySettings({ pomodoroLength: value })
                }
                max={60}
                min={5}
                step={5}
                className="w-full"
              />
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-base font-medium mb-2 block">
                Short Break: {study.shortBreakLength} minutes
              </Label>
              <Slider
                value={[study.shortBreakLength]}
                onValueChange={([value]) => 
                  updateStudySettings({ shortBreakLength: value })
                }
                max={15}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-base font-medium mb-2 block">
                Long Break: {study.longBreakLength} minutes
              </Label>
              <Slider
                value={[study.longBreakLength]}
                onValueChange={([value]) => 
                  updateStudySettings({ longBreakLength: value })
                }
                max={30}
                min={5}
                step={5}
                className="w-full"
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Auto-start Breaks</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically start break timers
                </p>
              </div>
              <Switch
                checked={study.autoStartBreaks}
                onCheckedChange={(checked) => 
                  updateStudySettings({ autoStartBreaks: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Sound Effects</Label>
                <p className="text-sm text-muted-foreground">
                  Play sounds for notifications and interactions
                </p>
              </div>
              <Switch
                checked={study.soundEffects}
                onCheckedChange={(checked) => 
                  updateStudySettings({ soundEffects: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Focus Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Hide distracting elements during study sessions
                </p>
              </div>
              <Switch
                checked={study.focusMode}
                onCheckedChange={(checked) => 
                  updateStudySettings({ focusMode: checked })
                }
              />
            </div>
          </div>
        </motion.div>

        {/* Reset Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="game-panel p-6 border-destructive/20"
        >
          <h2 className="text-lg font-semibold text-destructive mb-4">Reset Settings</h2>
          <p className="text-sm text-muted-foreground mb-4">
            This will reset all your settings to their default values. This action cannot be undone.
          </p>
          <GamingButton
            variant="destructive"
            onClick={resetToDefaults}
          >
            Reset to Defaults
          </GamingButton>
        </motion.div>
      </div>
    </div>
  );
};