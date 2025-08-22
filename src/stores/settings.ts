import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'hi' | 'mr';
type Theme = 'dark' | 'light' | 'auto';

interface NotificationSettings {
  dailyReminder: boolean;
  achievementNotifications: boolean;
  streakReminders: boolean;
  questUpdates: boolean;
  emailNotifications: boolean;
}

interface StudySettings {
  pomodoroLength: number;
  shortBreakLength: number;
  longBreakLength: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  soundEffects: boolean;
  backgroundMusic: boolean;
  focusMode: boolean;
}

interface SettingsState {
  language: Language;
  theme: Theme;
  notifications: NotificationSettings;
  study: StudySettings;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  updateNotifications: (notifications: Partial<NotificationSettings>) => void;
  updateStudySettings: (settings: Partial<StudySettings>) => void;
  resetToDefaults: () => void;
}

const defaultNotifications: NotificationSettings = {
  dailyReminder: true,
  achievementNotifications: true,
  streakReminders: true,
  questUpdates: true,
  emailNotifications: false
};

const defaultStudySettings: StudySettings = {
  pomodoroLength: 25,
  shortBreakLength: 5,
  longBreakLength: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundEffects: true,
  backgroundMusic: false,
  focusMode: false
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'dark',
      notifications: defaultNotifications,
      study: defaultStudySettings,

      setLanguage: (language) => set({ language }),
      
      setTheme: (theme) => set({ theme }),

      updateNotifications: (notifications) =>
        set((state) => ({
          notifications: { ...state.notifications, ...notifications }
        })),

      updateStudySettings: (settings) =>
        set((state) => ({
          study: { ...state.study, ...settings }
        })),

      resetToDefaults: () =>
        set({
          language: 'en',
          theme: 'dark',
          notifications: defaultNotifications,
          study: defaultStudySettings
        })
    }),
    {
      name: 'settings-storage'
    }
  )
);