'use client';

interface PetActionsProps {
  onFeed: () => void;
  onWater: () => void;
  onClean: () => void;
  onPlay: () => void;
  disabled?: boolean;
}

export default function PetActions({
  onFeed,
  onWater,
  onClean,
  onPlay,
  disabled = false,
}: PetActionsProps) {
  const actions = [
    {
      id: 'feed',
      label: '喂食',
      emoji: '🍗',
      description: '消耗少量积分，提升饱腹感',
      onClick: onFeed,
      color: 'bg-orange-500 hover:bg-orange-600',
    },
    {
      id: 'water',
      label: '喂水',
      emoji: '💧',
      description: '补充水分，提升口渴度',
      onClick: onWater,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'clean',
      label: '清洁',
      emoji: '🧼',
      description: '保持清洁与卫生',
      onClick: onClean,
      color: 'bg-cyan-500 hover:bg-cyan-600',
    },
    {
      id: 'play',
      label: '陪玩',
      emoji: '🎮',
      description: '提升心情值，让宠物更开心',
      onClick: onPlay,
      color: 'bg-pink-500 hover:bg-pink-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={action.onClick}
          disabled={disabled}
          className={`
            relative flex flex-col items-center justify-center
            p-4 rounded-xl text-white transition-all duration-200
            ${action.color}
            ${disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'active:scale-95 hover:shadow-lg'
            }
          `}
        >
          <span className="text-3xl mb-2">{action.emoji}</span>
          <span className="font-bold text-lg">{action.label}</span>
          <span className="text-xs text-white/80 mt-1">{action.description}</span>
        </button>
      ))}
    </div>
  );
}
