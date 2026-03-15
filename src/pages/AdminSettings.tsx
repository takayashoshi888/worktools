import React from 'react';

export default function AdminSettings() {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">平台设置</h3>
          <p className="text-slate-500 dark:text-slate-400">配置全局应用程序设置和首选项。</p>
        </div>
        <button className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold shadow-sm transition-colors cursor-pointer">
          保存更改
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-3 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-xl font-bold flex items-center gap-3 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">settings</span> 常规
          </button>
          <button className="w-full text-left px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium flex items-center gap-3 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">palette</span> 外观
          </button>
          <button className="w-full text-left px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium flex items-center gap-3 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">notifications</span> 通知
          </button>
          <button className="w-full text-left px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium flex items-center gap-3 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">api</span> API 密钥
          </button>
          <button className="w-full text-left px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium flex items-center gap-3 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">shield_person</span> 安全
          </button>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">站点信息</h4>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-white">站点名称</label>
                  <input type="text" defaultValue="Worktools Pro" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-white">支持邮箱</label>
                  <input type="email" defaultValue="support@worktools.io" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-900 dark:text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-white">站点描述</label>
                <textarea rows={3} defaultValue="现代团队的终极生产力套件。" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all resize-none text-slate-900 dark:text-white"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">维护模式</h4>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">启用维护模式</h5>
                <p className="text-xs text-slate-500 mt-1">启用后，只有管理员才能访问该平台。</p>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">危险区域</h4>
            <div className="p-4 bg-rose-50 dark:bg-rose-500/5 rounded-xl border border-rose-100 dark:border-rose-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-rose-700 dark:text-rose-500 text-sm">清除缓存</h5>
                  <p className="text-xs text-rose-600/70 dark:text-rose-400/70 mt-1">清除所有应用程序缓存并强制重新加载资产。</p>
                </div>
                <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-500 rounded-lg text-sm font-bold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer">清除缓存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
