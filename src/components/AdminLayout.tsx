import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AddToolModal from '../pages/AddToolModal';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAddToolModalOpen, setIsAddToolModalOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const navItems = [
    { path: '/admin/dashboard', icon: 'dashboard', label: '仪表盘' },
    { path: '/admin/categories', icon: 'category', label: '分类管理' },
    { path: '/admin/feedback', icon: 'chat_bubble', label: '用户反馈', badge: '12' },
  ];

  const systemItems = [
    { path: '/admin/settings', icon: 'settings', label: '系统设置' },
    { path: '/admin/security', icon: 'verified_user', label: '安全中心' },
  ];

  return (
    <div className={`flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar Navigation */}
      <aside className="w-64 glass-sidebar border-r border-slate-200 dark:border-slate-800 flex flex-col z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
            <span className="material-symbols-outlined">construction</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">Worktools</h1>
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-500/80">管理控制台</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-brand-500/10 text-brand-500'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 pb-2 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">系统</div>
          
          {systemItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button onClick={() => setIsAddToolModalOpen(true)} className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>添加新工具</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
              <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-slate-400 outline-none" placeholder="搜索工具、分析数据、用户..." type="text"/>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative transition-all cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full border-2 border-white dark:border-surface-dark"></span>
            </button>
            <button onClick={toggleDarkMode} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer">
              <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:border-slate-800 mx-2"></div>
            <div className="flex items-center gap-3 pl-2 relative group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">{user?.displayName || 'Admin User'}</p>
                <p className="text-[10px] text-slate-500 font-medium">管理员</p>
              </div>
              <div className="size-10 rounded-full bg-brand-500/10 border-2 border-brand-500/20 bg-cover bg-center cursor-pointer" style={{backgroundImage: `url('${user?.photoURL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLsyx3fzdw4ZGAofWPM05LlOUQYa3q5bC2iaVpzdBEjwO-SwZ9XC07Lb17-hP15tGZAKIG0uarkgIYH-ggxURV8_b8819L-LCXVkbqwuUD-J8h6ImfST9Mey-jCAJZ-Dvp_xKviVGeRUafUOzJbwWB9IpNQpJ-BDddJWCUpsbsTo8iJRIjQD3NJpfDihTknEjtdogEnDl42ERV2PDI0lJ8c0JegeutHO5SZWdL9U1G6RmubTomH0HQalPZsNJy8LFfh79ATBM6z_8'}')`}}></div>
              
              {/* Logout Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    退出登录
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <Outlet />
        </div>
      </main>

      {isAddToolModalOpen && <AddToolModal onClose={() => setIsAddToolModalOpen(false)} />}
    </div>
  );
}
