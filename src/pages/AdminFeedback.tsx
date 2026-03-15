import React from 'react';

export default function AdminFeedback() {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">用户反馈</h3>
          <p className="text-slate-500 dark:text-slate-400">查看并回复用户建议和错误报告。</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input type="text" placeholder="搜索反馈..." className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 dark:text-white w-64" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">filter_list</span> 筛选
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-brand-500/30 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold">JD</div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">John Doe</h4>
                  <p className="text-xs text-slate-500">john.doe@example.com</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500 rounded-lg text-xs font-bold">功能请求</span>
            </div>
            <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-brand-500 transition-colors">与 Slack 集成</h5>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">如果 DataCrunch Analytics 工具能够将自动每日摘要直接发送到指定的 Slack 频道，那将非常有帮助。这将为我们的团队节省大量手动检查仪表盘的时间。</p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 2 小时前</span>
              <div className="flex gap-2">
                <button className="hover:text-brand-500 transition-colors cursor-pointer">回复</button>
                <span>•</span>
                <button className="hover:text-emerald-500 transition-colors cursor-pointer">标为已读</button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-brand-500/30 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold">AS</div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Alice Smith</h4>
                  <p className="text-xs text-slate-500">alice.smith@example.com</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-500 rounded-lg text-xs font-bold">错误报告</span>
            </div>
            <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-brand-500 transition-colors">导出 PDF 时出错</h5>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">当我尝试从 AI Image Studio 将我的项目导出为 PDF 时，应用程序崩溃并显示 500 内部服务器错误。这在 Chrome 119 版本上一直发生。</p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 5 小时前</span>
              <div className="flex gap-2">
                <button className="hover:text-brand-500 transition-colors cursor-pointer">回复</button>
                <span>•</span>
                <button className="hover:text-emerald-500 transition-colors cursor-pointer">标为已读</button>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 cursor-pointer group opacity-75">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold">MJ</div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Mike Johnson</h4>
                  <p className="text-xs text-slate-500">mike.j@example.com</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-500 rounded-lg text-xs font-bold">常规反馈</span>
            </div>
            <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-brand-500 transition-colors">很棒的 UI 更新！</h5>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">我只想说新的仪表盘布局非常棒。现在找到我需要的工具容易多了。继续保持！</p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 1 天前</span>
              <div className="flex gap-2">
                <span className="text-emerald-500 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> 已读</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">反馈统计</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">功能请求</span>
                  <span className="font-bold text-slate-900 dark:text-white">45%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[45%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">错误报告</span>
                  <span className="font-bold text-slate-900 dark:text-white">30%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[30%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">常规反馈</span>
                  <span className="font-bold text-slate-900 dark:text-white">25%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[25%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-500/5 dark:bg-brand-500/10 p-6 rounded-2xl border border-brand-500/20">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-brand-500">auto_awesome</span>
              <h4 className="font-bold text-brand-700 dark:text-brand-400">AI 情感分析</h4>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">本周整体用户情绪为 <strong className="text-emerald-600 dark:text-emerald-400">积极 (78%)</strong>。最受好评的功能：“新的仪表盘 UI”。报告最多的问题：“PDF 导出失败”。</p>
            <button className="w-full py-2 bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 rounded-xl text-sm font-bold shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">生成完整报告</button>
          </div>
        </div>
      </div>
    </>
  );
}
