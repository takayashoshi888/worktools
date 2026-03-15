import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Tool {
  id: string;
  name: string;
  category: string;
  url: string;
  description: string;
  isActive: boolean;
  icon: string; // URL or material symbol name
  color?: string; // For landing page styling
  version?: string;
  size?: string;
  dateAdded?: string;
  status?: '活跃' | '待审核' | '隐藏';
  users?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  status: '活跃' | '隐藏';
}

interface ToolContextType {
  tools: Tool[];
  addTool: (tool: Omit<Tool, 'id' | 'dateAdded'>) => void;
  updateTool: (id: string, tool: Partial<Tool>) => void;
  deleteTool: (id: string) => void;
  
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

const initialTools: Tool[] = [
  {
    id: '1',
    name: '超级文本格式化',
    category: '文本处理',
    url: '#',
    description: '提供一键去重、清洗、排版、大小写转换。纯前端处理，绝不上传您的任何私密数据，安全无忧。',
    isActive: true,
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOlVCP9lk4zzttDgyUZpcRPxPQuKfPEd1Ijp-HZOQIWRr-xmepKOygl2x-n2lG5mTmyLD3xCz9NZnZ21V-XV2sRIlZ3-ndR0f5CJzOl1wn_FS9KW0w3E3h3BTGePs9FmhYqwPgyP-rb_APu9JTgo3HurVu85cdMiUVmhYLAPx4x4AZrMyMR7amAuy6ltzPS4PzvaHGlcBxG-hCVMZh6W1dHVUXqqQfZTI8Zv3MgJh_O21ERwPzJW4chkcL04J_SIpQTmgWHcedmLA',
    color: 'bg-blue-500',
    users: '1.2k+ 人正在使用',
    dateAdded: '2023-10-12',
    status: '活跃',
    version: 'v2.4.0',
    size: '12.4 MB'
  },
  {
    id: '2',
    name: '极客 JSON 美化',
    category: '开发辅助',
    url: '#',
    description: '支持 JSON 校验、美化、压缩、转义。极致的渲染速度，支持处理数万行的超大型 JSON 文件。',
    isActive: true,
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACjAeDPtkOvNG6RynDdxxcvz5c1JQupwfqpSFHkdIgVSdTyMgtlZpl4au0xPaSu1PUgSCHqMj2ZI0ASs_s0_QBPS7uYBu3eYHRLwerK3E7NR7tbz3vM20FiEtOFs-QF6yHGTYzMfDe0p9MdG3DQy2Z6sjhnmG-UfARrqKDC2uFNw8oR0txO5xJqsVeZBrvaRsioGvSufRwXqt1TjmqXMXhVvY-ig9HZL6RG0Ih3j5V1oROdXHraz6laYJ0-uhNekJ9HrOQVSez7fI',
    color: 'bg-brand-500',
    users: '800+ 本周活跃',
    dateAdded: '2023-11-03',
    status: '活跃',
    version: 'v1.0.2',
    size: '8.1 MB'
  },
  {
    id: '3',
    name: '无损图片压缩',
    category: '图片优化',
    url: '#',
    description: '在保持画质的前提下，将图片体积缩小 70% 以上。支持批量上传，秒级完成转换。',
    isActive: true,
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ09OL-M_VLWujhWyst0b5GXIW6cigis2H8BI71MqBiOoIw1Y4jlQ88kSV1zy2EOnr6Ew9ndyIJuVzxfAWGcu6uPEQi1-_luTSXSXxZIT38h5YKQc6-rHdS6fJ6q0e-2dCoo2Ii_xuYxQtd2pQvaWTR1Jr8-EFkC5qn1R6cRvDnyMk6cAfbjjtghG8dKmTpQWCvw5atIIeDlLv8kDsJ60y-FU7e7B2T-8ywwQ29C7KtX49nooDBiPajh9JSBodSIDeVQIbJlQZ-LE',
    color: 'bg-emerald-500',
    users: '刚刚更新',
    dateAdded: '2023-10-28',
    status: '活跃',
    version: 'v3.1.5',
    size: '45.9 MB'
  }
];

const initialCategories: Category[] = [
  {
    id: '1',
    name: '文本处理',
    description: '提供一键去重、清洗、排版、大小写转换等功能。',
    icon: 'text_fields',
    color: 'bg-blue-500',
    status: '活跃'
  },
  {
    id: '2',
    name: '开发辅助',
    description: '支持 JSON 校验、美化、压缩、转义等开发常用功能。',
    icon: 'code',
    color: 'bg-brand-500',
    status: '活跃'
  },
  {
    id: '3',
    name: '数据转换',
    description: '提供各种数据格式之间的相互转换工具。',
    icon: 'transform',
    color: 'bg-purple-500',
    status: '活跃'
  },
  {
    id: '4',
    name: '实用工具',
    description: '日常工作和生活中经常用到的小工具集合。',
    icon: 'build',
    color: 'bg-emerald-500',
    status: '活跃'
  }
];

export const ToolProvider = ({ children }: { children: ReactNode }) => {
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const addTool = (tool: Omit<Tool, 'id' | 'dateAdded'>) => {
    const newTool: Tool = {
      ...tool,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString().split('T')[0],
      version: 'v1.0.0',
      size: '0 MB',
      status: tool.isActive ? '活跃' : '隐藏',
      users: '0 人正在使用'
    };
    setTools(prev => [newTool, ...prev]);
  };

  const updateTool = (id: string, updatedFields: Partial<Tool>) => {
    setTools(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
  };

  const deleteTool = (id: string) => {
    setTools(prev => prev.filter(t => t.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString()
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updatedFields: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return (
    <ToolContext.Provider value={{ 
      tools, addTool, updateTool, deleteTool,
      categories, addCategory, updateCategory, deleteCategory
    }}>
      {children}
    </ToolContext.Provider>
  );
};

export const useTools = () => {
  const context = useContext(ToolContext);
  if (!context) throw new Error('useTools must be used within ToolProvider');
  return context;
};
