import React, { useState } from 'react';
import { useTools, Category } from '../context/ToolContext';
import CategoryModal from './CategoryModal';

export default function AdminCategories() {
  const { tools, categories, deleteCategory } = useTools();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingCategory(undefined);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`确定要删除分类 "${name}" 吗？`)) {
      deleteCategory(id);
    }
  };

  const getToolCount = (categoryName: string) => {
    return tools.filter(t => t.category === categoryName).length;
  };

  const getColorClasses = (colorClass: string) => {
    // Map color classes to text and bg classes for the icon container
    const colorMap: Record<string, { bg: string, text: string }> = {
      'bg-brand-500': { bg: 'bg-brand-500/10', text: 'text-brand-500' },
      'bg-blue-500': { bg: 'bg-blue-500/10', text: 'text-blue-500' },
      'bg-purple-500': { bg: 'bg-purple-500/10', text: 'text-purple-500' },
      'bg-emerald-500': { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
      'bg-amber-500': { bg: 'bg-amber-500/10', text: 'text-amber-500' },
      'bg-rose-500': { bg: 'bg-rose-500/10', text: 'text-rose-500' },
      'bg-sky-500': { bg: 'bg-sky-500/10', text: 'text-sky-500' },
    };
    return colorMap[colorClass] || colorMap['bg-brand-500'];
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">所有分类</h3>
          <p className="text-slate-500 dark:text-slate-400">管理和组织套件中的应用程序组。</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 cursor-pointer">
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button className="p-2 text-slate-400 cursor-pointer">
            <span className="material-symbols-outlined">format_list_bulleted</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => {
          const colors = getColorClasses(category.color);
          const toolCount = getToolCount(category.name);
          
          return (
            <div key={category.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow group flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 ${colors.bg} ${colors.text} rounded-2xl flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-3xl">{category.icon}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${category.status === '活跃' ? 'bg-brand-500/10 text-brand-500' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                  {category.status}
                </span>
              </div>
              <h4 className="text-lg font-bold mb-1 text-slate-900 dark:text-white">{category.name}</h4>
              <p className="text-primary-orange font-semibold text-sm mb-3">{toolCount} 个关联应用</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">{category.description}</p>
              <div className="flex items-center gap-2 pt-4 border-t border-slate-50 dark:border-slate-700 mt-auto">
                <button 
                  onClick={() => handleEdit(category)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-xl text-sm font-medium transition-colors text-slate-900 dark:text-white cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">edit</span> 编辑
                </button>
                <button 
                  onClick={() => handleDelete(category.id, category.name)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          );
        })}

        <div 
          onClick={handleCreate}
          className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center p-8 hover:bg-white dark:hover:bg-slate-800 hover:border-brand-500 transition-all cursor-pointer group min-h-[280px]"
        >
          <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-brand-500/10 group-hover:text-brand-500 transition-colors mb-4">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
          <span className="font-bold text-slate-400 group-hover:text-brand-500">创建新分类</span>
        </div>
      </div>

      {isModalOpen && (
        <CategoryModal 
          category={editingCategory} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}
