'use client';

import { PetStage, PetStatus } from '@prisma/client';

interface Pet {
  id: string;
  name: string;
  stage: PetStage;
  level: number;
  exp: number;
  status: PetStatus;
  hunger: number;
  thirst: number;
  cleanliness: number;
  mood: number;
  health: number;
}

interface PetCardProps {
  pet: Pet;
}

const stageLabels: Record<PetStage, string> = {
  [PetStage.egg]: '蛋',
  [PetStage.baby]: '幼年',
  [PetStage.growth]: '成长',
  [PetStage.final]: '最终',
};

const stageEmojis: Record<PetStage, string> = {
  [PetStage.egg]: '🥚',
  [PetStage.baby]: '🐣',
  [PetStage.growth]: '🐾',
  [PetStage.final]: '⭐',
};

export default function PetCard({ pet }: PetCardProps) {
  const getBarColor = (value: number) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getMoodEmoji = (mood: number) => {
    if (mood >= 80) return '😄';
    if (mood >= 60) return '🙂';
    if (mood >= 40) return '😐';
    if (mood >= 20) return '😟';
    return '😢';
  };

  const getHealthStatus = (health: number) => {
    if (health >= 80) return { label: '健康', color: 'text-green-600' };
    if (health >= 50) return { label: '一般', color: 'text-yellow-600' };
    if (health >= 20) return { label: '虚弱', color: 'text-orange-600' };
    return { label: '危险', color: 'text-red-600' };
  };

  const healthStatus = getHealthStatus(pet.health);

  if (pet.status === PetStatus.dead) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-6xl mb-4">💀</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{pet.name}</h2>
        <p className="text-red-600 font-medium">宠物已死亡</p>
        <p className="text-gray-500 text-sm mt-2">请联系家长帮助复活</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* 头部信息 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{stageEmojis[pet.stage]}</span>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{pet.name}</h2>
            <p className="text-sm text-gray-500">
              {stageLabels[pet.stage]} · Lv.{pet.level}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl">{getMoodEmoji(pet.mood)}</span>
          <p className={`text-sm font-medium ${healthStatus.color}`}>
            {healthStatus.label}
          </p>
        </div>
      </div>

      {/* 经验条 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>经验值</span>
          <span>{pet.exp} XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((pet.exp % 100), 100)}%` }}
          />
        </div>
      </div>

      {/* 状态条 */}
      <div className="space-y-4">
        {/* 饥饿度 */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">🍗 饥饿度</span>
            <span className={`font-medium ${pet.hunger < 30 ? 'text-red-600' : 'text-gray-700'}`}>
              {pet.hunger}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${getBarColor(pet.hunger)}`}
              style={{ width: `${pet.hunger}%` }}
            />
          </div>
        </div>

        {/* 口渴度 */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">💧 口渴度</span>
            <span className={`font-medium ${pet.thirst < 30 ? 'text-red-600' : 'text-gray-700'}`}>
              {pet.thirst}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${getBarColor(pet.thirst)}`}
              style={{ width: `${pet.thirst}%` }}
            />
          </div>
        </div>

        {/* 清洁度 */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">🧼 清洁度</span>
            <span className={`font-medium ${pet.cleanliness < 30 ? 'text-red-600' : 'text-gray-700'}`}>
              {pet.cleanliness}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${getBarColor(pet.cleanliness)}`}
              style={{ width: `${pet.cleanliness}%` }}
            />
          </div>
        </div>

        {/* 心情值 */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">🙂 心情值</span>
            <span className={`font-medium ${pet.mood < 30 ? 'text-red-600' : 'text-gray-700'}`}>
              {pet.mood}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${getBarColor(pet.mood)}`}
              style={{ width: `${pet.mood}%` }}
            />
          </div>
        </div>

        {/* 健康值 */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">❤️ 健康值</span>
            <span className={`font-medium ${pet.health < 30 ? 'text-red-600' : 'text-gray-700'}`}>
              {pet.health}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${getBarColor(pet.health)}`}
              style={{ width: `${pet.health}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
