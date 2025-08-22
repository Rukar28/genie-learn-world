import { create } from 'zustand';

interface StudySession {
  id: string;
  subjectId: string;
  startTime: Date;
  endTime?: Date;
  xpEarned: number;
  lessonsCompleted: number;
  quizzesCompleted: number;
  totalFocusTime: number; // in minutes
}

interface PomodoroSession {
  duration: number; // in minutes
  isActive: boolean;
  isBreak: boolean;
  timeLeft: number; // in seconds
  completedSessions: number;
}

interface SessionState {
  currentSession: StudySession | null;
  recentSessions: StudySession[];
  pomodoroSession: PomodoroSession;
  totalStudyTime: number; // in minutes
  weeklyStudyTime: number; // in minutes
  startSession: (subjectId: string) => void;
  endSession: () => void;
  addXPToSession: (xp: number) => void;
  incrementLessons: () => void;
  incrementQuizzes: () => void;
  startPomodoro: (duration: number) => void;
  pausePomodoro: () => void;
  stopPomodoro: () => void;
  updatePomodoroTime: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  currentSession: null,
  recentSessions: [],
  pomodoroSession: {
    duration: 25,
    isActive: false,
    isBreak: false,
    timeLeft: 25 * 60,
    completedSessions: 0
  },
  totalStudyTime: 480, // 8 hours in minutes
  weeklyStudyTime: 1200, // 20 hours in minutes

  startSession: (subjectId) => {
    const newSession: StudySession = {
      id: Date.now().toString(),
      subjectId,
      startTime: new Date(),
      xpEarned: 0,
      lessonsCompleted: 0,
      quizzesCompleted: 0,
      totalFocusTime: 0
    };

    set({ currentSession: newSession });
  },

  endSession: () => {
    const { currentSession } = get();
    if (currentSession) {
      const endedSession = {
        ...currentSession,
        endTime: new Date(),
        totalFocusTime: Math.floor((Date.now() - currentSession.startTime.getTime()) / 60000)
      };

      set((state) => ({
        currentSession: null,
        recentSessions: [endedSession, ...state.recentSessions.slice(0, 9)],
        totalStudyTime: state.totalStudyTime + endedSession.totalFocusTime,
        weeklyStudyTime: state.weeklyStudyTime + endedSession.totalFocusTime
      }));
    }
  },

  addXPToSession: (xp) => {
    set((state) => ({
      currentSession: state.currentSession
        ? { ...state.currentSession, xpEarned: state.currentSession.xpEarned + xp }
        : null
    }));
  },

  incrementLessons: () => {
    set((state) => ({
      currentSession: state.currentSession
        ? { ...state.currentSession, lessonsCompleted: state.currentSession.lessonsCompleted + 1 }
        : null
    }));
  },

  incrementQuizzes: () => {
    set((state) => ({
      currentSession: state.currentSession
        ? { ...state.currentSession, quizzesCompleted: state.currentSession.quizzesCompleted + 1 }
        : null
    }));
  },

  startPomodoro: (duration) => {
    set({
      pomodoroSession: {
        duration,
        isActive: true,
        isBreak: false,
        timeLeft: duration * 60,
        completedSessions: 0
      }
    });
  },

  pausePomodoro: () => {
    set((state) => ({
      pomodoroSession: {
        ...state.pomodoroSession,
        isActive: false
      }
    }));
  },

  stopPomodoro: () => {
    const { pomodoroSession } = get();
    set({
      pomodoroSession: {
        ...pomodoroSession,
        isActive: false,
        timeLeft: pomodoroSession.duration * 60
      }
    });
  },

  updatePomodoroTime: () => {
    const { pomodoroSession } = get();
    if (pomodoroSession.isActive && pomodoroSession.timeLeft > 0) {
      set((state) => ({
        pomodoroSession: {
          ...state.pomodoroSession,
          timeLeft: state.pomodoroSession.timeLeft - 1
        }
      }));
    } else if (pomodoroSession.timeLeft === 0) {
      // Session complete
      set((state) => ({
        pomodoroSession: {
          ...state.pomodoroSession,
          isActive: false,
          isBreak: !state.pomodoroSession.isBreak,
          timeLeft: state.pomodoroSession.isBreak ? 25 * 60 : 5 * 60,
          completedSessions: state.pomodoroSession.isBreak 
            ? state.pomodoroSession.completedSessions + 1 
            : state.pomodoroSession.completedSessions
        }
      }));
    }
  }
}));