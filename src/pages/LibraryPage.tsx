import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Play, Star, Clock, Users } from 'lucide-react';
import { GamingButton } from '@/components/ui/gaming-button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Course {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  rating: number;
  enrolled: number;
  thumbnail: string;
  tags: string[];
  isNew?: boolean;
  isPremium?: boolean;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Algebra Fundamentals',
    description: 'Master the basics of algebra with interactive lessons and practice problems.',
    subject: 'Mathematics',
    difficulty: 'Beginner',
    duration: '4 weeks',
    lessons: 24,
    rating: 4.8,
    enrolled: 1250,
    thumbnail: '📊',
    tags: ['equations', 'variables', 'functions'],
    isNew: true
  },
  {
    id: '2',
    title: 'Quantum Physics Basics',
    description: 'Explore the fascinating world of quantum mechanics and particle physics.',
    subject: 'Physics',
    difficulty: 'Advanced',
    duration: '8 weeks',
    lessons: 32,
    rating: 4.9,
    enrolled: 890,
    thumbnail: '⚛️',
    tags: ['quantum', 'particles', 'waves'],
    isPremium: true
  },
  {
    id: '3',
    title: 'Organic Chemistry',
    description: 'Learn about carbon compounds, reactions, and molecular structures.',
    subject: 'Chemistry',
    difficulty: 'Intermediate',
    duration: '6 weeks',
    lessons: 28,
    rating: 4.7,
    enrolled: 1100,
    thumbnail: '🧪',
    tags: ['organic', 'reactions', 'molecules']
  },
  {
    id: '4',
    title: 'Cell Biology',
    description: 'Dive deep into cellular structures and biological processes.',
    subject: 'Biology',
    difficulty: 'Intermediate',
    duration: '5 weeks',
    lessons: 20,
    rating: 4.6,
    enrolled: 950,
    thumbnail: '🔬',
    tags: ['cells', 'biology', 'life science']
  }
];

export const LibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSubject, setSelectedSubject] = React.useState<string>('all');

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
  
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSubject = selectedSubject === 'all' || course.subject === selectedSubject;
    
    return matchesSearch && matchesSubject;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-secondary border-secondary/50 bg-secondary/10';
      case 'Intermediate': return 'text-reward border-reward/50 bg-reward/10';
      case 'Advanced': return 'text-destructive border-destructive/50 bg-destructive/10';
      default: return 'text-muted-foreground border-muted/50 bg-muted/10';
    }
  };

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
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-glow-cyan">Course Library</h1>
        </div>
      </header>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-panel p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search courses, topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-input/50 border-card-border focus:border-primary"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {subjects.map((subject) => (
              <GamingButton
                key={subject}
                variant={selectedSubject === subject ? "glow" : "panel"}
                size="sm"
                onClick={() => setSelectedSubject(subject)}
                className="capitalize"
              >
                {subject}
              </GamingButton>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="game-panel hover:game-panel-glow p-6 cursor-pointer transition-all duration-300"
            onClick={() => navigate(`/learn/${course.id}`)}
          >
            {/* Course Thumbnail */}
            <div className="relative mb-4">
              <div className="w-full h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center text-4xl border border-card-border">
                {course.thumbnail}
              </div>
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-2">
                {course.isNew && (
                  <Badge className="bg-secondary text-secondary-foreground text-xs">
                    NEW
                  </Badge>
                )}
                {course.isPremium && (
                  <Badge className="bg-reward text-reward-foreground text-xs">
                    PREMIUM
                  </Badge>
                )}
              </div>
            </div>

            {/* Course Info */}
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg mb-1 text-foreground">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>
              </div>

              {/* Subject and Difficulty */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary font-medium">
                  {course.subject}
                </span>
                <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                  {course.difficulty}
                </Badge>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {course.lessons} lessons
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-reward fill-reward" />
                    {course.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {course.enrolled}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {course.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-muted/20 text-muted-foreground hover:bg-primary/20 hover:text-primary"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Start Button */}
              <GamingButton
                variant="glow"
                size="sm"
                className="w-full mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/learn/${course.id}`);
                }}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Learning
              </GamingButton>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            No courses found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </motion.div>
      )}
    </div>
  );
};