import { applyPetDecay, applyDecayToAllPets, getDecayConfig, updateDecayConfig } from '../pet-decay.service';
import { prisma } from '@/lib/prisma';
import { PetStatus, PetStage } from '@prisma/client';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    pet: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    petLog: {
      create: jest.fn(),
    },
  },
}));

describe('pet-decay.service', () => {
  const mockPetId = 'test-pet-id';
  const mockChildId = 'test-child-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('applyPetDecay', () => {
    it('操作失败'Oå£æ¸´ï¿½<ï¿½Tï¿½'操作失败'å°å® ï¿½?ï¿½',
        stage: PetStage.baby,
        level: 1,
        exp: 0,
        status: PetStatus.alive,
        hunger: 80,
        thirst: 80,
        cleanliness: 80,
        mood: 80,
        health: 100,
        lastDecayAt: fiveHoursAgo,
      };

      const updatedPet = {
        ...mockPet,
        hunger: 70,  // 80 - 2*5
        thirst: 65,  // 80 - 3*5
        cleanliness: 75,  // 80 - 1*5
        mood: 75,  // 80 - 1*5
        lastDecayAt: new Date(),
      };

      (prisma.pet.findUnique as jest.Mock).mockResolvedValue(mockPet);
      (prisma.pet.update as jest.Mock).mockResolvedValue(updatedPet);

      const result = await applyPetDecay(mockPetId);

      expect(result.decayed).toBe(true);
      expect(result.hoursPassed).toBeCloseTo(5, 0);
      expect(result.changes?.hunger).toBe(10); // 2 * 5
      expect(result.changes?.thirst).toBe(15); // 3 * 5
      expect(result.changes?.cleanliness).toBe(5); // 1 * 5
      expect(result.changes?.mood).toBe(5); // 1 * 5
    });

    it('操作失败', async () => {
      // æ¨¡ï¿½<Y 10 å°ï¿½-ï¿½ï¿½?ï¿½ï¿½Oé¥¥é¥¿ï¿½'操作失败'å°å® ï¿½?ï¿½'操作失败'ï¿½"操作失败"ï¿½"Tè¯¯'));

      const results = await applyDecayToAllPets();

      expect(results).toHaveLength(2);
      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(false);
      expect(results[1].error).toBe('操作失败');
    });
  });

  describe('getDecayConfig / updateDecayConfig', () => {
    it('操作失败', () => {
      const config = getDecayConfig();
      
      expect(config.hunger).toBe(2);
      expect(config.thirst).toBe(3);
      expect(config.cleanliness).toBe(1);
      expect(config.mood).toBe(1);
      expect(config.health.threshold).toBe(30);
      expect(config.health.decayRate).toBe(5);
    });

    it('操作失败', () => {
      updateDecayConfig({ hunger: 5, thirst: 5 });
      
      const config = getDecayConfig();
      expect(config.hunger).toBe(5);
      expect(config.thirst).toBe(5);
      // ï¿½.ï¿½ï¿½-ï¿½.ï¿½ç½®ä¿ï¿½Oï¿½ä¸ï¿½~
      expect(config.cleanliness).toBe(1);
      
      // æ¢å¤ï¿½~è®¤ï¿½?ï¿½
      updateDecayConfig({ hunger: 2, thirst: 3 });
    });
  });
});
