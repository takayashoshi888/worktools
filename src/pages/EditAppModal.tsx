import React, { useState, useRef, useEffect } from 'react';
import { useTools, Tool } from '../context/ToolContext';

interface EditAppModalProps {
  tool: Tool;
  onClose: () => void;
}

export default function EditAppModal({ tool, onClose }: EditAppModalProps) {
  const { updateTool, categories } = useTools();
  const [isLoading, setIsLoading] = useState(false);
  const [iconPreview, setIconPreview] = useState<string | null>(tool.icon.startsWith('http') || tool.icon.startsWith('data:') ? tool.icon : null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: tool.name,
    category: tool.category,
    url: tool.url,
    description: tool.description,
    isActive: tool.isActive,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isActive: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('请上传图片文件');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.url) {
      alert('请填写必填字段：应用名称、所属分类和访问链接');
      return;
    }
    
    setIsLoading(true);
    try {
      await updateTool(tool.id, {
        name: formData.name,
        category: formData.category,
        url: formData.url,
        description: formData.description,
        isActive: formData.isActive,
        status: formData.isActive ? '活跃' : '隐藏',
        icon: iconPreview || tool.icon,
      });
      alert('应用更新成功！');
      onClose();
    } catch (error: any) {
      alert('应用更新失败: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-background-light dark:bg-background-dark w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-primary-orange/20">
        <header className="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-primary-orange/10">
          <div className="flex items-center gap-3">
            <div className="bg-primary-orange/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-primary-orange text-2xl">edit_square</span>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">编辑应用</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">更新应用的基本配置与显示信息</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-primary-orange/10 rounded-full transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-6">
          <form id="edit-app-form" onSubmit={handleSubmit} className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold block text-slate-900 dark:text-white">应用图标</label>
                <div>
                  <div className="relative group cursor-pointer" onClick={handleIconClick}>
                    <div className="w-full aspect-square rounded-xl bg-slate-100 dark:bg-primary-orange/5 border-2 border-dashed border-slate-300 dark:border-primary-orange/20 flex flex-col items-center justify-center gap-2 hover:border-primary-orange transition-colors overflow-hidden relative">
                      {iconPreview ? (
                        <>
                          <img src={iconPreview} alt="Icon preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-white text-3xl mb-1">edit</span>
                            <span className="text-xs text-white font-medium">更换图标</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-primary-orange text-4xl mb-2">cloud_upload</span>
                          <span className="text-xs text-slate-500">点击上传图标</span>
                        </>
                      )}
                    </div>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-primary-orange/5 p-4 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">状态控制</span>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input 
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleCheckboxChange}
                      className="sr-only peer" 
                      type="checkbox"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-orange"></div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">启用后，应用将在工作台中对授权用户可见。</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold block text-slate-900 dark:text-white">标签</label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary-orange/10 text-primary-orange text-xs font-medium rounded-full flex items-center gap-1">
                    生产力 <span className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
                  </span>
                  <span className="px-3 py-1 bg-primary-orange/10 text-primary-orange text-xs font-medium rounded-full flex items-center gap-1">
                    AI助手 <span className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
                  </span>
                  <button type="button" className="px-3 py-1 border border-dashed border-slate-300 dark:border-primary-orange/30 text-xs text-slate-500 rounded-full hover:border-primary-orange hover:text-primary-orange transition-colors flex items-center gap-1 cursor-pointer">
                    <span className="material-symbols-outlined text-[14px]">add</span> 添加
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-white">应用名称 <span className="text-red-500">*</span></label>
                <input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-primary-orange/20 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-orange/20 focus:border-primary-orange outline-none transition-all text-slate-900 dark:text-white" 
                  placeholder="输入应用名称" 
                  type="text" 
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-white">所属分类 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-primary-orange/20 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-orange/20 focus:border-primary-orange outline-none appearance-none transition-all text-slate-900 dark:text-white"
                    required
                  >
                    <option value="">选择分类</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">unfold_more</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-white">访问链接 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">link</span>
                  <input 
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-primary-orange/20 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-orange/20 focus:border-primary-orange outline-none transition-all text-slate-900 dark:text-white" 
                    placeholder="https://example.com" 
                    type="url" 
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-white">应用简介</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-primary-orange/20 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-orange/20 focus:border-primary-orange outline-none transition-all resize-none text-slate-900 dark:text-white" 
                  placeholder="描述应用的主要功能和用途..." 
                  rows={4}
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        <footer className="px-8 py-5 border-t border-slate-200 dark:border-primary-orange/10 bg-slate-50 dark:bg-primary-orange/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="material-symbols-outlined text-[16px]">info</span>
            最后更新于 2023-11-20 14:30
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-primary-orange/10 transition-colors cursor-pointer">
              取消
            </button>
            <button 
              type="submit" 
              form="edit-app-form"
              disabled={isLoading}
              className="px-8 py-2.5 rounded-xl font-semibold text-sm text-white bg-primary-orange hover:bg-primary-orange/90 shadow-lg shadow-primary-orange/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  <span>保存中...</span>
                </>
              ) : (
                '保存更改'
              )}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
