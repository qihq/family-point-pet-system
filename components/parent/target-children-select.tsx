'use client';

import { useState, useEffect } from 'react';

interface Child {
  id: string;
  name: string;
}

interface TargetChildrenSelectProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function TargetChildrenSelect({
  selectedIds,
  onChange,
}: TargetChildrenSelectProps) {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const response = await fetch('/api/family/children', { cache: 'no-store', credentials: 'include' });
      const data = await response.json();

      if (data.success) {
        setChildren(data.data);
      }
    } catch (err) {
      console.error('获取孩子列表失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (childId: string) => {
    if (selectedIds.includes(childId)) {
      onChange(selectedIds.filter((id) => id !== childId));
    } else {
      onChange([...selectedIds, childId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === children.length) {
      onChange([]);
    } else {
      onChange(children.map((child) => child.id));
    }
  };

  if (loading) {
    return (
      <div className="text-sm text-gray-500">加载中...</div>
    );
  }

  if (children.length === 0) {
    return (
      <div className="text-sm text-gray-500">暂无孩子</div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          已选择 {selectedIds.length} 人
        </span>
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {selectedIds.length === children.length ? '取消全选' : '全选'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {children.map((child) => (
          <label
            key={child.id}
            className={`inline-flex items-center px-3 py-2 rounded-md border cursor-pointer transition-colors ${
              selectedIds.includes(child.id)
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(child.id)}
              onChange={() => handleToggle(child.id)}
              className="sr-only"
            />
            <span className="text-sm font-medium">{child.name}</span>
            {selectedIds.includes(child.id) && (
              <svg
                className="ml-2 w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </label>
        ))}
      </div>

      {selectedIds.length === 0 && (
        <p className="text-sm text-amber-600">
          请选择至少一个孩子
        </p>
      )}
    </div>
  );
}

