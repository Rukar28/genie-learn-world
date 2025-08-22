import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      library: 'Library',
      avatar: 'Avatar',
      settings: 'Settings',
      
      // Landing Page
      welcome: 'Welcome to Study Genie',
      subtitle: 'Your magical AI learning companion',
      getStarted: 'Start Your Journey',
      
      // Auth
      login: 'Login',
      signup: 'Sign Up',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      class: 'Class',
      age: 'Age',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      loginButton: 'Sign In',
      signupButton: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      
      // Dashboard
      xpProgress: 'XP Progress',
      currentStreak: 'Current Streak',
      days: 'days',
      kingdomMap: 'Kingdom Map',
      questLog: 'Quest Log',
      achievements: 'Achievements',
      leaderboard: 'Leaderboard',
      studySession: 'Study Session',
      startStudying: 'Start Studying',
      
      // Quests
      dailyQuests: 'Daily Quests',
      weeklyQuests: 'Weekly Quests',
      claimReward: 'Claim Reward',
      completed: 'Completed',
      inProgress: 'In Progress',
      
      // Study Session
      pomodoroTimer: 'Pomodoro Timer',
      focusTime: 'Focus Time',
      breakTime: 'Break Time',
      start: 'Start',
      pause: 'Pause',
      stop: 'Stop',
      
      // Settings
      language: 'Language',
      notifications: 'Notifications',
      studySettings: 'Study Settings',
      
      // Common
      save: 'Save',
      cancel: 'Cancel',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
    }
  },
  hi: {
    translation: {
      // Navigation
      dashboard: 'डैशबोर्ड',
      library: 'पुस्तकालय',
      avatar: 'अवतार',
      settings: 'सेटिंग्स',
      
      // Landing Page
      welcome: 'स्टडी जिनी में आपका स्वागत है',
      subtitle: 'आपका जादुई AI सीखने का साथी',
      getStarted: 'अपनी यात्रा शुरू करें',
      
      // Auth
      login: 'लॉगिन',
      signup: 'साइन अप',
      name: 'नाम',
      email: 'ईमेल',
      phone: 'फोन',
      class: 'कक्षा',
      age: 'आयु',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      loginButton: 'साइन इन',
      signupButton: 'खाता बनाएं',
      alreadyHaveAccount: 'पहले से खाता है?',
      dontHaveAccount: 'खाता नहीं है?',
      
      // Dashboard
      xpProgress: 'XP प्रगति',
      currentStreak: 'वर्तमान स्ट्रीक',
      days: 'दिन',
      kingdomMap: 'राज्य मानचित्र',
      questLog: 'क्वेस्ट लॉग',
      achievements: 'उपलब्धियां',
      leaderboard: 'लीडरबोर्ड',
      studySession: 'अध्ययन सत्र',
      startStudying: 'अध्ययन शुरू करें'
    }
  },
  mr: {
    translation: {
      // Navigation
      dashboard: 'डॅशबोर्ड',
      library: 'पुस्तकालय',
      avatar: 'अवतार',
      settings: 'सेटिंग्ज',
      
      // Landing Page
      welcome: 'स्टडी जिनीमध्ये आपले स्वागत आहे',
      subtitle: 'तुमचा जादुई AI शिकण्याचा साथीदार',
      getStarted: 'तुमचा प्रवास सुरू करा',
      
      // Auth
      login: 'लॉगिन',
      signup: 'साइन अप',
      name: 'नाव',
      email: 'ईमेल',
      phone: 'फोन',
      class: 'वर्ग',
      age: 'वय',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्डची पुष्टी करा',
      loginButton: 'साइन इन',
      signupButton: 'खाते तयार करा',
      alreadyHaveAccount: 'आधीच खाते आहे?',
      dontHaveAccount: 'खाते नाही?',
      
      // Dashboard
      xpProgress: 'XP प्रगती',
      currentStreak: 'सध्याची स्ट्रीक',
      days: 'दिवस',
      kingdomMap: 'राज्य नकाशा',
      questLog: 'क्वेस्ट लॉग',
      achievements: 'उपलब्धी',
      leaderboard: 'लीडरबोर्ड',
      studySession: 'अभ्यास सत्र',
      startStudying: 'अभ्यास सुरू करा'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;