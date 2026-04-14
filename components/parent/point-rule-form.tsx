"use client";
import { useState, useEffect } from 'react';
import { PointsType, Frequency } from '@prisma/client';
import TargetChildrenSelect from './target-children-select';

interface PointRuleFormData {
  name: string;
  description: string;
  category: string;
  pointsType: PointsType;
  points: number;
  pointsMin?: number;
  pointsMax?: number;
  needApproval: boolean;
  frequency: Frequency;
  maxTimes?: number;
  enabled: boolean;
  targetChildIds: string[];
  applyToAll?: boolean;
}

interface PointRuleFormProps {
  initialData?: Partial<PointRuleFormData>;
  onSubmit: (data: PointRuleFormData) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const defaultFormData: PointRuleFormData = {
  name: '',
  description: '',
  category: 'self_care',
  pointsType: PointsType.fixed,
  points: 10,
  pointsMin: undefined,
  pointsMax: undefined,
  needApproval: false,
  frequency: Frequency.daily,
  maxTimes: undefined,
  enabled: true,
  targetChildIds: [],
  applyToAll: false,
};

const categories = [
  { value: 'self_care', label: '自理' },
  { value: 'chores', label: '家务' },
  { value: 'study', label: '学习' },
  { value: 'other', label: '其他' },
];

const frequencies = [
  { value: Frequency.daily, label: '每天' },
  { value: Frequency.weekly, label: '每周' },
  { value: Frequency.monthly, label: '每月' },
  { value: Frequency.once, label: '一次' },
  { value: Frequency.unlimited, label: '不限次数' },
];

export default function PointRuleForm({ initialData, onSubmit, onCancel, isEdit = false }: PointRuleFormProps) {
  const [formData, setFormData] = useState<PointRuleFormData>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) setFormData({ ...defaultFormData, ...initialData });
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = '请输入规则名称';
    if (formData.pointsType === PointsType.fixed) {
      if (formData.points < 0) newErrors.points = '积分不能为负数';
    } else {
      if (formData.pointsMin == null || formData.pointsMax == null) newErrors.pointsRange = '范围积分需设置最小和最大';
      else if (formData.pointsMin > formData.pointsMax) newErrors.pointsRange = '最小不能大于最大';
    }
    if (!formData.applyToAll && formData.targetChildIds.length === 0) newErrors.targetChildren = '请选择至少一个孩子，或勾选“适用于全体孩子”';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  const handleChange = (field: keyof PointRuleFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">{isEdit ? '编辑规则' : '新建规则'}</h2>
      </div>

      {/* 规则名称 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">规则名称 <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="例如：早晚刷牙、完成作业"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* 描述 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="可选：用于解释规则的详细信息"
        />
      </div>

      {/* 分类 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
        <select
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* 积分类型 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">积分类型</label>
        <div className="flex items-center gap-6">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="pointsType"
              checked={formData.pointsType === PointsType.fixed}
              onChange={() => handleChange('pointsType', PointsType.fixed)}
            />
            <span>固定积分</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="pointsType"
              checked={formData.pointsType === PointsType.range}
              onChange={() => handleChange('pointsType', PointsType.range)}
            />
            <span>范围积分</span>
          </label>
        </div>
      </div>

      {/* 积分设置 */}
      {formData.pointsType === PointsType.fixed ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">积分</label>
          <input
            type="number"
            value={formData.points}
            onChange={(e) => handleChange('points', parseInt(e.target.value || '0'))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.points && <p className="mt-1 text-sm text-red-600">{errors.points}</p>}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">最小积分</label>
            <input
              type="number"
              min={0}
              value={formData.pointsMin ?? ''}
              onChange={(e) => handleChange('pointsMin', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">最大积分</label>
            <input
              type="number"
              min={0}
              value={formData.pointsMax ?? ''}
              onChange={(e) => handleChange('pointsMax', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.pointsRange && <p className="col-span-2 text-sm text-red-600">{errors.pointsRange}</p>}
        </div>
      )}

      {/* 频率 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">频率</label>
        <select
          value={formData.frequency}
          onChange={(e) => handleChange('frequency', e.target.value as any)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {frequencies.map((freq) => (
            <option key={freq.value} value={freq.value}>{freq.label}</option>
          ))}
        </select>
      </div>`r`n      <p className="mt-1 text-xs text-gray-500">一次表示“每个孩子仅能完成一次”，不固定日期；如需指定日期/时间，请在“学习计划”中新建一次性计划。</p>

      {/* 周期内最大次数 */}
      {formData.frequency !== Frequency.unlimited && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">周期内最大次数</label>
          <input
            type="number"
            min={1}
            value={formData.maxTimes ?? ''}
            onChange={(e) => handleChange('maxTimes', e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="不填表示不限次数"
          />
        </div>
      )}

      {/* 是否需要家长审核 */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="needApproval"
          checked={formData.needApproval}
          onChange={(e) => handleChange('needApproval', e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="needApproval" className="text-sm text-gray-700">需要家长审核</label>
      </div>

      {/* 启用 */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="enabled"
          checked={formData.enabled}
          onChange={(e) => handleChange('enabled', e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="enabled" className="text-sm text-gray-700">启用规则</label>
      </div>

      {/* 目标孩子 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">选择孩子 <span className="text-red-500">*</span></label>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={!!formData.applyToAll} onChange={(e)=> handleChange('applyToAll', e.target.checked)} />
            适用于全体孩子
          </label>
        </div>
        {!formData.applyToAll && (
          <TargetChildrenSelect selectedIds={formData.targetChildIds} onChange={(ids) => handleChange('targetChildIds', ids)} />
        )}
        {!formData.applyToAll && errors.targetChildren && <p className="mt-1 text-sm text-red-600">{errors.targetChildren}</p>}
      </div>

      {/* 操作 */}
      <div className="flex gap-4 pt-4">
        <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {isEdit ? '保存修改' : '提交创建'}
        </button>
        <button type="button" onClick={onCancel} className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
          取消
        </button>
      </div>
    </form>
  );
}// codex-ok: 2026-04-14T12:05:00+08:00
