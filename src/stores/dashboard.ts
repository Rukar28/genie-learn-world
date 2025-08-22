import { create } from 'zustand';

interface Subject {
  id: string;
  name: string;
  icon: string;
  progress: number;
  isUnlocked: boolean;
  totalLessons: number;
  completedLessons: number;
  color: string;
}

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

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
  category: string;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  level: number;
  rank: number;
  avatar?: string;
}

interface DashboardState {
  subjects: Subject[];
  quests: Quest[];
  achievements: Achievement[];
  leaderboard: {
    global: LeaderboardEntry[];
    friends: LeaderboardEntry[];
    weekly: LeaderboardEntry[];
  };
  studyStreak: number;
  todayXP: number;
  weeklyXP: number;
  completeQuest: (questId: string) => void;
  claimQuestReward: (questId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  updateSubjectProgress: (subjectId: string, progress: number) => void;
  addXP: (amount: number) => void;
}

const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    icon: '🔢',
    progress: 65,
    isUnlocked: true,
    totalLessons: 50,
    completedLessons: 32,
    color: 'primary'
  },
  {
    id: '2',
    name: 'Physics',
    icon: '⚛️',
    progress: 45,
    isUnlocked: true,
    totalLessons: 40,
    completedLessons: 18,
    color: 'secondary'
  },
  {
    id: '3',
    name: 'Chemistry',
    icon: '🧪',
    progress: 30,
    isUnlocked: true,
    totalLessons: 35,
    completedLessons: 10,
    color: 'magic'
  },
  {
    id: '4',
    name: 'Biology',
    icon: '🧬',
    progress: 0,
    isUnlocked: false,
    totalLessons: 45,
    completedLessons: 0,
    color: 'reward'
  }
];

const mockQuests: Quest[] = [
  {
    id: '1',
    title: 'Daily Streak',
    description: 'Complete 3 lessons today',
    reward: 50,
    type: 'daily',
    progress: 2,
    maxProgress: 3,
    isCompleted: false,
    isClaimable: false
  },
  {
    id: '2',
    title: 'Quiz Master',
    description: 'Score 90% or higher on 5 quizzes',
    reward: 100,
    type: 'weekly',
    progress: 3,
    maxProgress: 5,
    isCompleted: false,
    isClaimable: false
  },
  {
    id: '3',
    title: 'Math Wizard',
    description: 'Complete all algebra lessons',
    reward: 200,
    type: 'weekly',
    progress: 10,
    maxProgress: 10,
    isCompleted: true,
    isClaimable: true
  }
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '👶',
    isUnlocked: true,
    unlockedAt: new Date('2024-01-15'),
    category: 'beginner'
  },
  {
    id: '2',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '⚔️',
    isUnlocked: true,
    unlockedAt: new Date('2024-01-20'),
    category: 'streak'
  },
  {
    id: '3',
    title: 'XP Hunter',
    description: 'Earn 1000 XP in a single day',
    icon: '🏆',
    isUnlocked: false,
    category: 'xp'
  }
];

const mockLeaderboard = {
  global: [
    { id: '1', name: 'Alex Chen', xp: 15420, level: 12, rank: 1 },
    { id:  '2', name: 'Sarah Wilson', xp: 14880, level: 11, rank: 2 },
    { id: '3', name: 'Mike Johnson', xp: 13650, level: 10, rank: 3 },
    { id: '4', name: 'You', xp: 1250, level: 5, rank: 127 }
  ],
  friends: [
    { id: '1', name: 'Emma Davis', xp: 2340, level: 6, rank: 1 },
    { id: '2', name: 'You', xp: 1250, level: 5, rank: 2 },
    { id: '3', name: 'Tom Brown', xp: 980, level: 4, rank: 3 }
  ],
  weekly: [
    { id: '1', name: 'Lisa Park', xp: 850, level: 7, rank: 1 },
    { id: '2', name: 'You', xp: 420, level: 5, rank: 2 },
    { id: '3', name: 'John Smith', xp: 380, level: 6, rank: 3 }
  ]
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  subjects: mockSubjects,
  quests: mockQuests,
  achievements: mockAchievements,
  leaderboard: mockLeaderboard,
  studyStreak: 7,
  todayXP: 420,
  weeklyXP: 1650,

  completeQuest: (questId) => {
    set((state) => ({
      quests: state.quests.map(quest =>
        quest.id === questId
          ? { ...quest, isCompleted: true, isClaimable: true }
          : quest
      )
    }));
  },

  claimQuestReward: (questId) => {
    const quest = get().quests.find(q => q.id === questId);
    if (quest && quest.isClaimable) {
      set((state) => ({
        quests: state.quests.map(q =>
          q.id === questId
            ? { ...q, isClaimable: false }
            : q
        ),
        todayXP: state.todayXP + quest.reward
      }));
    }
  },

  unlockAchievement: (achievementId) => {
    set((state) => ({
      achievements: state.achievements.map(achievement =>
        achievement.id === achievementId
          ? { ...achievement, isUnlocked: true, unlockedAt: new Date() }
          : achievement
      )
    }));
  },

  updateSubjectProgress: (subjectId, progress) => {
    set((state) => ({
      subjects: state.subjects.map(subject =>
        subject.id === subjectId
          ? { ...subject, progress }
          : subject
      )
    }));
  },

  addXP: (amount) => {
    set((state) => ({
      todayXP: state.todayXP + amount,
      weeklyXP: state.weeklyXP + amount
    }));
  }
}));