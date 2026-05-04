import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

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
  addTool: (tool: Omit<Tool, 'id' | 'dateAdded'>) => Promise<void>;
  updateTool: (id: string, tool: Partial<Tool>) => Promise<void>;
  deleteTool: (id: string) => Promise<void>;
  
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export const ToolProvider = ({ children }: { children: ReactNode }) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchTools = async () => {
    try {
      const res = await fetch('/api/tools');
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          setTools(data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch tools', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          setCategories(data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  useEffect(() => {
    fetchTools();
    fetchCategories();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const addTool = async (tool: Omit<Tool, 'id' | 'dateAdded'>) => {
    const res = await fetch('/api/tools', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(tool)
    });
    if (res.ok) {
      const newTool = await res.json();
      setTools(prev => [newTool, ...prev]);
    } else {
      const err = await res.text();
      console.error('Failed to add tool:', err);
      throw new Error(err || 'Failed to add tool');
    }
  };

  const updateTool = async (id: string, updatedFields: Partial<Tool>) => {
    const res = await fetch(`/api/tools/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedFields)
    });
    if (res.ok) {
      setTools(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
    } else {
      const err = await res.text();
      console.error('Failed to update tool:', err);
      throw new Error(err || 'Failed to update tool');
    }
  };

  const deleteTool = async (id: string) => {
    const res = await fetch(`/api/tools/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      setTools(prev => prev.filter(t => t.id !== id));
    } else {
      const err = await res.text();
      console.error('Failed to delete tool:', err);
      throw new Error(err || 'Failed to delete tool');
    }
  };

  const addCategory = async (category: Omit<Category, 'id'>) => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(category)
    });
    if (res.ok) {
      const newCategory = await res.json();
      setCategories(prev => [...prev, newCategory]);
    } else {
      const err = await res.text();
      console.error('Failed to add category:', err);
      throw new Error(err || 'Failed to add category');
    }
  };

  const updateCategory = async (id: string, updatedFields: Partial<Category>) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedFields)
    });
    if (res.ok) {
      setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
    } else {
      const err = await res.text();
      console.error('Failed to update category:', err);
      throw new Error(err || 'Failed to update category');
    }
  };

  const deleteCategory = async (id: string) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      setCategories(prev => prev.filter(c => c.id !== id));
    } else {
      const err = await res.text();
      console.error('Failed to delete category:', err);
      throw new Error(err || 'Failed to delete category');
    }
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
