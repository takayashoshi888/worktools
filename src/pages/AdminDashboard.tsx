import React, { useState } from 'react';
import EditAppModal from './EditAppModal';
import { useTools, Tool } from '../context/ToolContext';

export default function AdminDashboard() {
  const { tools, deleteTool } = useTools();
  const [editingTool, setEditingTool] = useState<Tool | null>(null);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case '活跃': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-500';
      case '待审核': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500';
      case '隐藏': return 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getIconColor = (category: string) => {
    switch (category) {
      case '文本处理': return 'bg-brand-500/10 text-brand-500';
      case '开发辅助': return 'bg-orange-100 text-orange-600';
      case '数据转换': return 'bg-purple-100 text-purple-600';
      case '实用工具': return 'bg-emerald-100 text-emerald-600';
      default: return 'bg-brand-500/10 text-brand-500';
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-brand-500/10 text-brand-500 rounded-lg">
              <span className="material-symbols-outlined">widgets</span>
            </div>
            <span className="text-emerald-500 text-xs font-bold flex items-center bg-emerald-50 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">应用总数</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">1,284</h3>
          <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 w-[65%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <span className="text-emerald-500 text-xs font-bold flex items-center bg-emerald-50 px-2 py-1 rounded-full">+5.2%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">今日新增</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">24</h3>
          <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[40%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <span className="text-rose-500 text-xs font-bold flex items-center bg-rose-50 px-2 py-1 rounded-full">-2.1%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">待审核</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">12</h3>
          <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 w-[80%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <span className="material-symbols-outlined">ads_click</span>
            </div>
            <span className="text-emerald-500 text-xs font-bold flex items-center bg-emerald-50 px-2 py-1 rounded-full">+18.3%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">总点击量</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">45.2k</h3>
          <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-[55%] rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">应用管理</h2>
            <p className="text-sm text-slate-500 font-medium">管理和监控平台所有工具</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              <button className="px-4 py-1.5 text-xs font-bold bg-white dark:bg-slate-700 shadow-sm rounded-lg text-slate-900 dark:text-white cursor-pointer">列表</button>
              <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer">网格</button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              <span>筛选</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>导出</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">工具详情</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">分类</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">状态</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">添加日期</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {tools.map(tool => (
                <tr key={tool.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-xl flex items-center justify-center overflow-hidden ${getIconColor(tool.category)}`}>
                        {tool.icon.startsWith('http') || tool.icon.startsWith('data:') ? (
                          <img src={tool.icon} alt={tool.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined">{tool.icon}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{tool.name}</p>
                        <p className="text-[11px] text-slate-500">{tool.version || 'v1.0.0'} • {tool.size || '0 MB'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">{tool.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`status-pill ${getStatusColor(tool.status)}`}>{tool.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{tool.dateAdded}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setEditingTool(tool)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-brand-500 transition-colors cursor-pointer" title="编辑">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button onClick={() => deleteTool(tool.id)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-500 transition-colors cursor-pointer" title="删除">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-500">显示 1 到 4 条，共 1,284 条结果</p>
          <div className="flex items-center gap-2">
            <button className="size-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50 cursor-pointer" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="size-8 flex items-center justify-center bg-brand-500 text-white rounded-lg text-xs font-bold shadow-sm cursor-pointer">1</button>
            <button className="size-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">2</button>
            <button className="size-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">3</button>
            <button className="size-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px] bg-brand-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-lg font-bold mb-2">需要企业级支持？</h4>
            <p className="text-sm opacity-90 mb-4 max-w-md">我们的专属客户经理 24/7 全天候为您服务，协助您进行平台配置和自定义工具集成。</p>
            <button className="bg-white text-brand-500 px-5 py-2 rounded-xl text-sm font-bold shadow-lg cursor-pointer">联系支持</button>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <span className="material-symbols-outlined text-[200px]">support_agent</span>
          </div>
        </div>
        
        <div className="w-full lg:w-[320px] bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">快捷操作</h4>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group cursor-pointer">
              <div className="size-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-brand-500 transition-colors">
                <span className="material-symbols-outlined">backup</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900 dark:text-white">完整备份</p>
                <p className="text-[10px] text-slate-500">运行手动系统备份</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group cursor-pointer">
              <div className="size-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-brand-500 transition-colors">
                <span className="material-symbols-outlined">history</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900 dark:text-white">活动日志</p>
                <p className="text-[10px] text-slate-500">查看最近的管理操作</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {editingTool && <EditAppModal tool={editingTool} onClose={() => setEditingTool(null)} />}
    </>
  );
}
