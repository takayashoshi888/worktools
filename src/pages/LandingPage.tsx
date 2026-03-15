import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTools } from '../context/ToolContext';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { tools } = useTools();
  const { user, isAdmin, isAuthReady, login } = useAuth();
  const navigate = useNavigate();
  const activeTools = tools.filter(tool => tool.isActive);

  useEffect(() => {
    const header = document.getElementById('mainHeader');
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header?.querySelector('nav')?.classList.remove('py-3');
        header?.querySelector('nav')?.classList.add('py-1');
        header?.classList.add('shadow-lg');
      } else {
        header?.querySelector('nav')?.classList.remove('py-1');
        header?.querySelector('nav')?.classList.add('py-3');
        header?.classList.remove('shadow-lg');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Re-check admin status if user just logged in
  useEffect(() => {
    if (isAuthReady && user && window.location.hash === '#admin-login') {
      if (isAdmin) {
        navigate('/admin');
      } else {
        alert('您没有管理员权限。');
        window.location.hash = '';
      }
    }
  }, [user, isAdmin, isAuthReady, navigate]);

  const handleAdminClickWithHash = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        alert('您没有管理员权限。');
      }
    } else {
      try {
        window.location.hash = 'admin-login';
        await login();
      } catch (error) {
        console.error('Login failed', error);
        window.location.hash = '';
      }
    }
  };

  return (
    <div className="mesh-gradient font-sans text-surface-800 antialiased min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="mainHeader">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="glass-effect rounded-2xl px-6 py-3 flex items-center justify-between shadow-glass transition-all duration-300">
            <a className="flex items-center gap-3 group" href="#">
              <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-bolt-lightning text-lg"></i>
              </div>
              <span className="text-xl font-bold tracking-tight text-surface-900">work<span className="text-brand-500">tools</span></span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a className="text-sm font-semibold text-surface-800 hover:text-brand-500 transition-colors" href="#explore">浏览工具</a>
              <a className="text-sm font-semibold text-surface-800 hover:text-brand-500 transition-colors" href="#categories">分类</a>
              <div className="w-[1px] h-4 bg-surface-200"></div>
              <button onClick={handleAdminClickWithHash} className="text-sm font-semibold text-surface-500 hover:text-surface-900 transition-colors flex items-center gap-2 cursor-pointer">
                <i className="fa-solid fa-shield-halved"></i>
                管理
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-brand-500 hover:bg-brand-50 rounded-xl transition-all cursor-pointer">
                提交应用
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-brand-600 hover:shadow-brand-200 transition-all active:scale-95 cursor-pointer">
                <i className="fa-solid fa-plus"></i>
                快速开启
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              已收录 120+ 实用工具
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-surface-900 mb-6 leading-tight max-w-4xl mx-auto">
              精选实用 <span className="text-gradient">Web 工具</span><br/>一键开启高效办公
            </h1>
            <p className="text-lg text-surface-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              无需下载，无需安装。我们为你搜集了互联网上最干净、最好用的生产力工具，所有操作均在浏览器内完成。
            </p>
            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-400 to-emerald-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative glass-effect rounded-2xl flex items-center p-2 shadow-premium">
                <div className="pl-4 text-surface-400">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input className="w-full bg-transparent border-none focus:ring-0 text-surface-800 placeholder-surface-400 font-medium py-3 px-4 outline-none" placeholder="搜索你需要的工具，例如：图片压缩..." type="text"/>
                <div className="hidden sm:flex items-center gap-2 pr-2">
                  <kbd className="px-2 py-1 bg-surface-100 rounded text-[10px] font-bold text-surface-400 border border-surface-200">CTRL</kbd>
                  <kbd className="px-2 py-1 bg-surface-100 rounded text-[10px] font-bold text-surface-400 border border-surface-200">K</kbd>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="text-xs font-semibold text-surface-400">常用搜索:</span>
              <button className="text-xs font-bold text-surface-500 hover:text-brand-500 transition-colors cursor-pointer">JSON 格式化</button>
              <button className="text-xs font-bold text-surface-500 hover:text-brand-500 transition-colors cursor-pointer">PDF 转 Word</button>
              <button className="text-xs font-bold text-surface-500 hover:text-brand-500 transition-colors cursor-pointer">移除背景</button>
              <button className="text-xs font-bold text-surface-500 hover:text-brand-500 transition-colors cursor-pointer">代码高亮</button>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="explore">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-surface-900 mb-2">本周推荐</h2>
              <p className="text-surface-500 text-sm">这些工具最近被使用的最频繁</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl border border-surface-200 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-surface-400 hover:text-surface-900 cursor-pointer">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button className="w-10 h-10 rounded-xl border border-surface-200 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-surface-400 hover:text-surface-900 cursor-pointer">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTools.map(tool => (
              <a 
                key={tool.id} 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-white rounded-3xl p-6 border border-surface-100 shadow-premium transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover card-glow cursor-pointer block"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-6">
                  {tool.icon.startsWith('http') || tool.icon.startsWith('data:') ? (
                    <img alt={tool.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={tool.icon}/>
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${tool.color || 'bg-brand-500'} text-white transition-transform duration-700 group-hover:scale-110`}>
                      <span className="material-symbols-outlined text-6xl">{tool.icon}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full glass-effect text-[10px] font-bold text-surface-900 uppercase">{tool.category}</span>
                  </div>
                </div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-surface-900 group-hover:text-brand-500 transition-colors">{tool.name}</h3>
                  <div className="text-brand-500 text-lg opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </div>
                </div>
                <p className="text-surface-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {tool.description}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-surface-50">
                  {tool.users === '刚刚更新' ? (
                    <>
                      <span className="text-[11px] font-bold py-0.5 px-2 rounded bg-emerald-50 text-emerald-600">NEW</span>
                      <span className="text-[11px] font-semibold text-surface-400">{tool.users}</span>
                    </>
                  ) : (
                    <>
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-surface-200"></div>
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-surface-300"></div>
                      </div>
                      <span className="text-[11px] font-semibold text-surface-400">{tool.users}</span>
                    </>
                  )}
                </div>
              </a>
            ))}
          </div>
          <div className="mt-16 text-center">
            <button className="px-8 py-3 rounded-2xl border-2 border-surface-200 text-surface-900 font-bold hover:bg-surface-100 transition-all active:scale-95 cursor-pointer">
              查看更多工具
            </button>
          </div>
        </section>
      </main>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-surface-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-500 opacity-20 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500 opacity-10 blur-[100px] rounded-full"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">没有找到你想要的工具？</h2>
              <p className="text-surface-400 text-lg mb-8">我们的社区正在飞速增长，你可以提交需求，我们会尽快开发或收录你需要的工具。</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button className="px-8 py-3.5 bg-brand-500 text-white rounded-2xl font-bold shadow-lg hover:bg-brand-600 transition-all cursor-pointer">
                  提交我的需求
                </button>
                <button className="px-8 py-3.5 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all cursor-pointer">
                  加入开发者社群
                </button>
              </div>
            </div>
            <div className="flex items-center gap-6 animate-float">
              <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center text-4xl text-brand-400 rotate-12 backdrop-blur-sm border border-white/10">
                <i className="fa-solid fa-code"></i>
              </div>
              <div className="w-32 h-32 bg-white/10 rounded-3xl flex items-center justify-center text-6xl text-emerald-400 -rotate-12 backdrop-blur-md border border-white/20">
                <i className="fa-solid fa-rocket"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-surface-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <a className="flex items-center gap-3 mb-6" href="#">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white">
                  <i className="fa-solid fa-bolt-lightning"></i>
                </div>
                <span className="text-xl font-bold tracking-tight text-surface-900">work<span className="text-brand-500">tools</span></span>
              </a>
              <p className="text-surface-500 text-sm leading-relaxed max-w-sm">
                worktools 是一个专注于收集高质量、即开即用 Web 工具的导航平台。我们致力于提升互联网办公效率。
              </p>
              <div className="flex gap-4 mt-8">
                <a className="w-9 h-9 rounded-full bg-surface-50 flex items-center justify-center text-surface-400 hover:text-brand-500 hover:bg-brand-50 transition-all" href="#">
                  <i className="fa-brands fa-github"></i>
                </a>
                <a className="w-9 h-9 rounded-full bg-surface-50 flex items-center justify-center text-surface-400 hover:text-brand-500 hover:bg-brand-50 transition-all" href="#">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a className="w-9 h-9 rounded-full bg-surface-50 flex items-center justify-center text-surface-400 hover:text-brand-500 hover:bg-brand-50 transition-all" href="#">
                  <i className="fa-brands fa-discord"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-surface-900 font-bold mb-6">热门分类</h4>
              <ul className="space-y-4">
                <li><a className="text-surface-500 text-sm hover:text-brand-500 transition-colors" href="#">开发辅助</a></li>
                <li><a className="text-surface-500 text-sm hover:text-brand-500 transition-colors" href="#">图片处理</a></li>
                <li><a className="text-surface-500 text-sm hover:text-brand-500 transition-colors" href="#">文档转换</a></li>
                <li><a className="text-surface-500 text-sm hover:text-brand-500 transition-colors" href="#">日常工具</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-surface-900 font-bold mb-6">关于我们</h4>
              <ul className="space-y-4">
                <li><a className="text-surface-500 text-sm hover:text-brand-500 transition-colors" href="#">关于本站</a></li>
                <li><a className="text-surface-500 text-sm hover:text-brand-500 transition-colors" href="#">更新日志</a></li>
                <li><a className="text-surface-500 text-sm hover:text-brand-500 transition-colors" href="#">隐私政策</a></li>
                <li><a className="text-surface-500 text-sm hover:text-brand-500 transition-colors" href="#">服务条款</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-surface-900 font-bold mb-6">联系支持</h4>
              <ul className="space-y-4">
                <li><a className="text-surface-500 text-sm hover:text-brand-500 transition-colors" href="#">问题反馈</a></li>
                <li><a className="text-surface-500 text-sm hover:text-brand-500 transition-colors" href="#">商务合作</a></li>
                <li><a className="text-surface-500 text-sm hover:text-brand-500 transition-colors" href="#">赞助支持</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-surface-50 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-surface-400 text-xs">
              © 2026 worktools. All rights reserved. Designed for excellence.
            </p>
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2 text-surface-400 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                系统状态: 运行良好
              </span>
              <span className="text-surface-400 text-xs font-medium">版本: v2.4.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
