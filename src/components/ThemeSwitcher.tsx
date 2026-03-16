import React, { useState, useEffect } from 'react';

type Theme = 'blue' | 'orange' | 'sakura';

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      if (savedTheme !== 'blue') {
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    }
  }, []);

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('app-theme', theme);
    if (theme === 'blue') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col gap-2 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-premium border border-slate-100 dark:border-slate-700 animate-fade-in-up origin-bottom-right">
          <button
            onClick={() => changeTheme('blue')}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer ${currentTheme === 'blue' ? 'bg-slate-50 dark:bg-slate-700' : ''}`}
          >
            <div className="w-5 h-5 rounded-full bg-[#165DFF] shadow-sm"></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">科技蓝</span>
          </button>
          <button
            onClick={() => changeTheme('orange')}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer ${currentTheme === 'orange' ? 'bg-slate-50 dark:bg-slate-700' : ''}`}
          >
            <div className="w-5 h-5 rounded-full bg-[#f97316] shadow-sm"></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">橘红色</span>
          </button>
          <button
            onClick={() => changeTheme('sakura')}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer ${currentTheme === 'sakura' ? 'bg-slate-50 dark:bg-slate-700' : ''}`}
          >
            <div className="w-5 h-5 rounded-full bg-[#ec4899] shadow-sm"></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">樱花粉</span>
          </button>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-brand-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
        title="切换主题"
      >
        <span className="material-symbols-outlined">{isOpen ? 'close' : 'palette'}</span>
      </button>
    </div>
  );
}
