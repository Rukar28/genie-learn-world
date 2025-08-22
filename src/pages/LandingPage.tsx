import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GamingButton } from '@/components/ui/gaming-button';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import heroImage from '@/assets/hero-genie.jpg';

const scriptedConversation = [
  {
    type: 'genie',
    text: "Welcome, young scholar! I am your Study Genie. What would you like to learn today?",
    delay: 1000
  },
  {
    type: 'student',
    text: "I want to master mathematics and science!",
    delay: 2500
  },
  {
    type: 'genie',
    text: "Excellent! I'll create a personalized learning journey just for you. With quests, achievements, and magical rewards, learning will become your greatest adventure!",
    delay: 4000
  },
  {
    type: 'cta',
    text: "Ready to begin your magical learning journey?",
    delay: 6000
  }
];

interface ChatBubbleProps {
  message: { type: string; text: string };
  index: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, index }) => {
  const isGenie = message.type === 'genie';
  const isStudent = message.type === 'student';
  const isCTA = message.type === 'cta';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className={`flex ${isStudent ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`
          max-w-sm p-4 rounded-2xl shadow-lg
          ${isGenie 
            ? 'bg-gradient-primary text-primary-foreground shadow-glow-cyan ml-0 mr-auto' 
            : isStudent
            ? 'bg-gradient-to-br from-secondary/80 to-secondary text-secondary-foreground shadow-glow-emerald ml-auto mr-0'
            : 'bg-gradient-reward text-reward-foreground shadow-glow-reward mx-auto'
          }
        `}
      >
        <p className={`text-sm ${isCTA ? 'text-center font-semibold' : ''}`}>
          {message.text}
        </p>
        
        {isGenie && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-right mt-2"
          >
            <span className="text-lg">🧞‍♂️</span>
          </motion.div>
        )}
        
        {isStudent && (
          <div className="text-left mt-2">
            <span className="text-lg">🧑‍🎓</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < scriptedConversation.length) {
        setCurrentStep(currentStep + 1);
        
        if (currentStep === scriptedConversation.length - 1) {
          setShowCTA(true);
        }
      }
    }, scriptedConversation[currentStep]?.delay || 2000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Study Genie magical learning realm"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <span className="text-3xl">🧞‍♂️</span>
            <h1 className="text-2xl font-bold text-glow-cyan">Study Genie</h1>
          </motion.div>
          
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-glow-cyan">
            Welcome to
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Study Genie</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Your magical AI learning companion that transforms education into an epic adventure
          </p>
        </motion.div>

        {/* Chat Conversation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-2xl mb-8"
        >
          <AnimatePresence>
            {scriptedConversation.slice(0, currentStep).map((message, index) => (
              <ChatBubble key={index} message={message} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Button */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="text-center"
            >
              <GamingButton
                variant="hero"
                size="xl"
                onClick={() => navigate('/auth')}
                className="animate-bounce-pulse text-xl px-12 py-6"
              >
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨ Start Your Journey ✨
                </motion.span>
              </GamingButton>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-muted-foreground mt-4"
              >
                Join thousands of students on their magical learning adventure
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 Study Genie. Making learning magical for everyone.
        </p>
      </footer>
    </div>
  );
};