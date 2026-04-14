"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";

export type PointsDatum = { date: string; points: number };

export default function PointsChart({ data }: { data: PointsDatum[] }) {
  const fmtX = (d: string) => {
    const [y, m, dd] = d.split("-");
    return `${m}/${dd}`;
  };
  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <defs>
            <linearGradient id="ptsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFD93D" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#FFD93D" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tickFormatter={fmtX} stroke="#9B9A97" tick={{ fontSize: 12 }} interval={1} />
          <YAxis stroke="#9B9A97" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: "#fff", borderRadius: 8, border: "1px solid #eee" }}
            formatter={(v: any) => [ `⭐ +${v}`, "" ]}
            labelFormatter={(d: string) => {
              const [y, m, dd] = d.split("-");
              return `📅 ${Number(m)}月${Number(dd)}日`;
            }}
          />
          <Area type="monotone" dataKey="points" stroke="#FF6B35" fill="url(#ptsFill)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Donut({ done, todo }: { done: number; todo: number }) {
  const data = [
    { name: "done", value: Math.max(0, done) },
    { name: "todo", value: Math.max(0, todo) },
  ];
  const colors = ["#22C55E", "#E5E7EB"];
  return (
    <div className="w-40 h-40">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2}>
            {data.map((entry, i) => (
              <Cell key={`c-${i}`} fill={colors[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// codex-ok: 2026-04-14T12:21:00+08:00