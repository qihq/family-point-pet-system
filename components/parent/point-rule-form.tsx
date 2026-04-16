"use client";

import { useEffect, useState } from "react";
import { Frequency, PointsType } from "@prisma/client";
import TargetChildrenSelect from "./target-children-select";

export interface PointRuleFormData {
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
  name: "",
  description: "",
  category: "self_care",
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
  { value: "self_care", label: "自理" },
  { value: "chores", label: "家务" },
  { value: "study", label: "学习" },
  { value: "other", label: "其他" },
];

const frequencies = [
  { value: Frequency.daily, label: "每天" },
  { value: Frequency.weekly, label: "每周" },
  { value: Frequency.monthly, label: "每月" },
  { value: Frequency.once, label: "一次" },
  { value: Frequency.unlimited, label: "不限次数" },
];

export default function PointRuleForm({ initialData, onSubmit, onCancel, isEdit = false }: PointRuleFormProps) {
  const [formData, setFormData] = useState<PointRuleFormData>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!initialData) {
      setFormData(defaultFormData);
      return;
    }
    setFormData({
      ...defaultFormData,
      ...initialData,
      description: initialData.description ?? "",
      targetChildIds: initialData.targetChildIds ?? [],
      applyToAll: initialData.applyToAll ?? false,
    });
  }, [initialData]);

  function updateField<K extends keyof PointRuleFormData>(field: K, value: PointRuleFormData[K]) {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function validate() {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) nextErrors.name = "请输入规则名称";
    if (formData.pointsType === PointsType.fixed) {
      if (formData.points < 0) nextErrors.points = "积分不能为负数";
    } else {
      if (formData.pointsMin == null || formData.pointsMax == null) {
        nextErrors.pointsRange = "请填写范围积分的最小值和最大值";
      } else if (formData.pointsMin > formData.pointsMax) {
        nextErrors.pointsRange = "最小值不能大于最大值";
      }
    }
    if (!formData.applyToAll && formData.targetChildIds.length === 0) {
      nextErrors.targetChildren = "请选择至少一个孩子";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validate()) onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{isEdit ? "编辑规则" : "新建规则"}</h2>
        <p className="mt-1 text-sm text-gray-500">把规则、频率、审核方式和适用孩子一起配置好。</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            规则名称 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
            placeholder="例如：完成作业、整理书桌"
          />
          {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">描述</label>
          <textarea
            value={formData.description}
            onChange={(event) => updateField("description", event.target.value)}
            className="min-h-[92px] w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
            placeholder="可选：补充说明孩子完成这个任务的标准"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">分类</label>
          <select
            value={formData.category}
            onChange={(event) => updateField("category", event.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">频率</label>
          <select
            value={formData.frequency}
            onChange={(event) => updateField("frequency", event.target.value as Frequency)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
          >
            {frequencies.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">“一次”表示每个孩子只可完成一次；具体日期请放到学习计划里。</p>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">积分类型</label>
          <div className="flex flex-wrap gap-6">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                checked={formData.pointsType === PointsType.fixed}
                onChange={() => updateField("pointsType", PointsType.fixed)}
              />
              固定积分
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                checked={formData.pointsType === PointsType.range}
                onChange={() => updateField("pointsType", PointsType.range)}
              />
              范围积分
            </label>
          </div>
        </div>

        {formData.pointsType === PointsType.fixed ? (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">积分</label>
            <input
              type="number"
              value={formData.points}
              onChange={(event) => updateField("points", Number(event.target.value || 0))}
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
            />
            {errors.points ? <p className="mt-1 text-sm text-red-600">{errors.points}</p> : null}
          </div>
        ) : (
          <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">最小积分</label>
              <input
                type="number"
                min={0}
                value={formData.pointsMin ?? ""}
                onChange={(event) => updateField("pointsMin", event.target.value ? Number(event.target.value) : undefined)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">最大积分</label>
              <input
                type="number"
                min={0}
                value={formData.pointsMax ?? ""}
                onChange={(event) => updateField("pointsMax", event.target.value ? Number(event.target.value) : undefined)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
              />
            </div>
            {errors.pointsRange ? <p className="md:col-span-2 text-sm text-red-600">{errors.pointsRange}</p> : null}
          </div>
        )}

        {formData.frequency !== Frequency.unlimited ? (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">周期内最大次数</label>
            <input
              type="number"
              min={1}
              value={formData.maxTimes ?? ""}
              onChange={(event) => updateField("maxTimes", event.target.value ? Number(event.target.value) : undefined)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
              placeholder="留空表示不限制"
            />
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700">
          <input type="checkbox" checked={formData.needApproval} onChange={(event) => updateField("needApproval", event.target.checked)} />
          需要家长审核后再入账
        </label>
        <label className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700">
          <input type="checkbox" checked={formData.enabled} onChange={(event) => updateField("enabled", event.target.checked)} />
          规则创建后立即启用
        </label>
      </div>

      <div className="space-y-3 rounded-2xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            适用孩子 <span className="text-red-500">*</span>
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" checked={!!formData.applyToAll} onChange={(event) => updateField("applyToAll", event.target.checked)} />
            适用于全体孩子
          </label>
        </div>
        {!formData.applyToAll ? <TargetChildrenSelect selectedIds={formData.targetChildIds} onChange={(ids) => updateField("targetChildIds", ids)} /> : null}
        {!formData.applyToAll && errors.targetChildren ? <p className="text-sm text-red-600">{errors.targetChildren}</p> : null}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700">
          {isEdit ? "保存修改" : "创建规则"}
        </button>
        <button type="button" onClick={onCancel} className="flex-1 rounded-xl bg-gray-100 px-4 py-2.5 font-medium text-gray-800 hover:bg-gray-200">
          取消
        </button>
      </div>
    </form>
  );
}
