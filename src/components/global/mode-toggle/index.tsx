'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      checked={theme === 'light'}
      onCheckedChange={() => setTheme(theme ==='dark' ? 'light' : 'dark')}
      className="h-10 w-20 pl-1 data-[state=checked]:bg-primary-80"
      aria-label="Toggle dark mode"
    />
  );
};

export default ThemeSwitcher;