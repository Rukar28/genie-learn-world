import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Palette, Shirt, Crown, Sparkles } from 'lucide-react';
import { GamingButton } from '@/components/ui/gaming-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/auth';

interface AvatarItem {
  id: string;
  name: string;
  category: 'skin' | 'hair' | 'outfit' | 'accessory';
  icon: string;
  isUnlocked: boolean;
  price?: number;
  description: string;
}

const avatarItems: AvatarItem[] = [
  // Skin tones
  { id: 'skin1', name: 'Light', category: 'skin', icon: '👶🏻', isUnlocked: true, description: 'Light skin tone' },
  { id: 'skin2', name: 'Medium', category: 'skin', icon: '👶🏽', isUnlocked: true, description: 'Medium skin tone' },
  { id: 'skin3', name: 'Dark', category: 'skin', icon: '👶🏿', isUnlocked: true, description: 'Dark skin tone' },
  
  // Hair styles
  { id: 'hair1', name: 'Short', category: 'hair', icon: '💇‍♂️', isUnlocked: true, description: 'Classic short hair' },
  { id: 'hair2', name: 'Long', category: 'hair', icon: '💇‍♀️', isUnlocked: true, description: 'Flowing long hair' },
  { id: 'hair3', name: 'Curly', category: 'hair', icon: '🦱', isUnlocked: false, price: 100, description: 'Bouncy curly hair' },
  { id: 'hair4', name: 'Punk', category: 'hair', icon: '🤘', isUnlocked: false, price: 200, description: 'Edgy punk style' },
  
  // Outfits
  { id: 'outfit1', name: 'Casual', category: 'outfit', icon: '👕', isUnlocked: true, description: 'Comfortable casual wear' },
  { id: 'outfit2', name: 'Formal', category: 'outfit', icon: '👔', isUnlocked: false, price: 150, description: 'Professional formal attire' },
  { id: 'outfit3', name: 'Wizard', category: 'outfit', icon: '🧙‍♂️', isUnlocked: false, price: 300, description: 'Magical wizard robes' },
  { id: 'outfit4', name: 'Superhero', category: 'outfit', icon: '🦸‍♂️', isUnlocked: false, price: 250, description: 'Heroic cape and mask' },
  
  // Accessories
  { id: 'acc1', name: 'Glasses', category: 'accessory', icon: '👓', isUnlocked: false, price: 75, description: 'Smart reading glasses' },
  { id: 'acc2', name: 'Crown', category: 'accessory', icon: '👑', isUnlocked: false, price: 500, description: 'Royal golden crown' },
  { id: 'acc3', name: 'Headphones', category: 'accessory', icon: '🎧', isUnlocked: false, price: 120, description: 'Cool gaming headphones' },
  { id: 'acc4', name: 'Hat', category: 'accessory', icon: '🎩', isUnlocked: false, price: 80, description: 'Stylish top hat' }
];

export const AvatarPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [selectedItems, setSelectedItems] = useState({
    skin: 'skin1',
    hair: 'hair1',
    outfit: 'outfit1',
    accessory: ''
  });

  if (!user) return null;

  const getItemsByCategory = (category: string) => {
    return avatarItems.filter(item => item.category === category);
  };

  const handleItemSelect = (item: AvatarItem) => {
    if (!item.isUnlocked && item.price && user.xp < item.price) {
      return; // Can't afford
    }

    setSelectedItems(prev => ({
      ...prev,
      [item.category]: item.id
    }));
  };

  const handlePurchase = (item: AvatarItem) => {
    if (item.price && user.xp >= item.price) {
      // Deduct XP and unlock item
      updateUser({ xp: user.xp - item.price });
      // In a real app, you'd update the item's unlock status in the database
    }
  };

  const getCurrentAvatar = () => {
    const skin = avatarItems.find(i => i.id === selectedItems.skin);
    const hair = avatarItems.find(i => i.id === selectedItems.hair);
    const outfit = avatarItems.find(i => i.id === selectedItems.outfit);
    const accessory = avatarItems.find(i => i.id === selectedItems.accessory);

    return {
      skin: skin?.icon || '👶',
      hair: hair?.icon || '💇‍♂️',
      outfit: outfit?.icon || '👕',
      accessory: accessory?.icon || ''
    };
  };

  const avatar = getCurrentAvatar();

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
          <Sparkles className="h-6 w-6 text-secondary" />
          <h1 className="text-2xl font-bold text-glow-emerald">Avatar Customization</h1>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground">XP:</span>
          <span className="text-primary font-bold text-glow-cyan">
            {user.xp.toLocaleString()}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Avatar Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="game-panel p-8 text-center"
        >
          <h2 className="text-xl font-semibold text-glow-cyan mb-6">Your Avatar</h2>
          
          <motion.div
            animate={{ 
              rotate: [0, -5, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="relative inline-block mb-6"
          >
            <div className="text-8xl relative">
              <span className="absolute inset-0 filter drop-shadow-lg">
                {avatar.skin}
              </span>
              <span className="absolute top-2 left-2">
                {avatar.hair}
              </span>
              <span className="absolute top-8 left-4">
                {avatar.outfit}
              </span>
              {avatar.accessory && (
                <span className="absolute -top-2 left-6">
                  {avatar.accessory}
                </span>
              )}
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-xl rounded-full" />
          </motion.div>
          
          <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
          <p className="text-muted-foreground">Level {user.level} Scholar</p>
          
          <GamingButton
            variant="glow"
            size="lg"
            className="mt-6"
            onClick={() => {
              // Save avatar configuration
              updateUser({ avatar: JSON.stringify(selectedItems) });
            }}
          >
            Save Avatar
          </GamingButton>
        </motion.div>

        {/* Customization Options */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="game-panel p-6"
        >
          <h2 className="text-xl font-semibold text-glow-cyan mb-6">Customize</h2>
          
          <Tabs defaultValue="skin" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-muted/20">
              <TabsTrigger value="skin" className="data-[state=active]:bg-primary/20">
                <Palette className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="hair" className="data-[state=active]:bg-secondary/20">
                ✂️
              </TabsTrigger>
              <TabsTrigger value="outfit" className="data-[state=active]:bg-reward/20">
                <Shirt className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="accessory" className="data-[state=active]:bg-magic/20">
                <Crown className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>

            {['skin', 'hair', 'outfit', 'accessory'].map((category) => (
              <TabsContent key={category} value={category} className="space-y-3">
                <h3 className="font-medium capitalize mb-4">{category} Options</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {getItemsByCategory(category).map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${selectedItems[category as keyof typeof selectedItems] === item.id
                          ? 'border-primary bg-primary/10 shadow-glow-cyan'
                          : item.isUnlocked
                          ? 'border-card-border bg-card/50 hover:border-primary/50'
                          : 'border-muted bg-muted/20 opacity-75'
                        }
                      `}
                      onClick={() => handleItemSelect(item)}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        
                        {!item.isUnlocked && item.price && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-reward font-medium">
                              {item.price} XP
                            </span>
                            <GamingButton
                              variant="reward"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePurchase(item);
                              }}
                              disabled={user.xp < item.price}
                              className="text-xs px-2 py-1"
                            >
                              {user.xp >= item.price ? 'Buy' : 'Locked'}
                            </GamingButton>
                          </div>
                        )}
                        
                        {item.isUnlocked && (
                          <div className="text-xs text-secondary font-medium">
                            Owned
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};