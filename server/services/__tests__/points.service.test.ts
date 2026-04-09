import { earnPoints, spendPoints, getPointAccount } from '../points.service';
import { prisma } from '@/lib/prisma';
import { SourceType } from '@prisma/client';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    $transaction: jest.fn(),
    pointAccount: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    pointTransaction: {
      create: jest.fn(),
    },
  },
}));

describe('points.service', () => {
  const mockChildId = 'test-child-id';
  const mockAccountId = 'test-account-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('earnPoints', () => {
    it('操作失败', async () => {
      // æ¨¡ï¿½<Yå·²ï¿½o?è´¦ï¿½^ï¿½
      const mockAccount = {
        id: mockAccountId,
        childId: mockChildId,
        balance: 100,
        totalEarned: 50,
        totalSpent: 0,
      };

      const mockUpdatedAccount = {
        ...mockAccount,
        balance: 150,
        totalEarned: 100,
      };

      const mockTransaction = {
        id: 'tx-1',
        accountId: mockAccountId,
        type: 'earn',
        amount: 50,
        balanceAfter: 150,
        sourceType: SourceType.task,
        description: '操作失败',
      };

      // è®¾ç½® mock ï¿½"ï¿½>zï¿½?ï¿½
      (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
        return callback({
          pointAccount: {
            findUnique: jest.fn().mockResolvedValue(mockAccount),
            update: jest.fn().mockResolvedValue(mockUpdatedAccount),
          },
          pointTransaction: {
            create: jest.fn().mockResolvedValue(mockTransaction),
          },
        });
      });

      const result = await earnPoints({
        childId: mockChildId,
        amount: 50,
        sourceType: SourceType.task,
        description: '操作失败',
      });

      expect(result.success).toBe(true);
      expect(result.balance).toBe(150);
      expect(result.message).toBe('操作失败');
    });

    it('操作失败', async () => {
      const mockNewAccount = {
        id: mockAccountId,
        childId: mockChildId,
        balance: 0,
        totalEarned: 0,
        totalSpent: 0,
      };

      const mockUpdatedAccount = {
        ...mockNewAccount,
        balance: 30,
        totalEarned: 30,
      };

      const mockTransaction = {
        id: 'tx-1',
        accountId: mockAccountId,
        type: 'earn',
        amount: 30,
        balanceAfter: 30,
        sourceType: SourceType.manual,
        description: '操作失败',
      };

      (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
        return callback({
          pointAccount: {
            findUnique: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue(mockNewAccount),
            update: jest.fn().mockResolvedValue(mockUpdatedAccount),
          },
          pointTransaction: {
            create: jest.fn().mockResolvedValue(mockTransaction),
          },
        });
      });

      const result = await earnPoints({
        childId: mockChildId,
        amount: 30,
        sourceType: SourceType.manual,
        description: '操作失败',
      });

      expect(result.success).toBe(true);
      expect(result.balance).toBe(30);
    });

    it('操作失败'ç»ï¿½zï¿½.ç§¯ï¿½^?ï¿½.ï¿½ï¿½?ï¿½', async () => {
      await expect(
        earnPoints({
          childId: mockChildId,
          amount: 0,
          sourceType: SourceType.task,
          description: '操作失败',
        })
      ).rejects.toThrow('操作失败');

      await expect(
        earnPoints({
          childId: mockChildId,
          amount: -10,
          sourceType: SourceType.task,
          description: '操作失败',
        })
      ).rejects.toThrow('操作失败');
    });

    it('操作失败', async () => {
      const mockAccount = {
        id: mockAccountId,
        childId: mockChildId,
        balance: 100,
        totalEarned: 100,
        totalSpent: 0,
      };

      const mockTransaction = {
        id: 'tx-1',
        accountId: mockAccountId,
        type: 'earn',
        amount: 20,
        balanceAfter: 120,
        sourceType: SourceType.task,
        sourceId: 'task-123',
        description: '操作失败',
      };

      (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
        return callback({
          pointAccount: {
            findUnique: jest.fn().mockResolvedValue(mockAccount),
            update: jest.fn().mockResolvedValue({ ...mockAccount, balance: 120 }),
          },
          pointTransaction: {
            create: jest.fn().mockResolvedValue(mockTransaction),
          },
        });
      });

      const result = await earnPoints({
        childId: mockChildId,
        amount: 20,
        sourceType: SourceType.task,
        sourceId: 'task-123',
        description: '操作失败',
      });

      expect(result.transaction).toBeDefined();
      expect(result.transaction.amount).toBe(20);
      expect(result.transaction.balanceAfter).toBe(120);
    });
  });

  describe('spendPoints', () => {
    it('操作失败', async () => {
      const mockAccount = {
        id: mockAccountId,
        childId: mockChildId,
        balance: 100,
        totalEarned: 100,
        totalSpent: 0,
      };

      const mockUpdatedAccount = {
        ...mockAccount,
        balance: 70,
        totalSpent: 30,
      };

      const mockTransaction = {
        id: 'tx-1',
        accountId: mockAccountId,
        type: 'spend',
        amount: -30,
        balanceAfter: 70,
        sourceType: SourceType.pet,
        description: '操作失败',
      };

      (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
        return callback({
          pointAccount: {
            findUnique: jest.fn().mockResolvedValue(mockAccount),
            update: jest.fn().mockResolvedValue(mockUpdatedAccount),
          },
          pointTransaction: {
            create: jest.fn().mockResolvedValue(mockTransaction),
          },
        });
      });

      const result = await spendPoints({
        childId: mockChildId,
        amount: 30,
        sourceType: SourceType.pet,
        description: '操作失败',
      });

      expect(result.success).toBe(true);
      expect(result.balance).toBe(70);
      expect(result.message).toBe('操作失败');
    });

    it('操作失败', async () => {
      const mockAccount = {
        id: mockAccountId,
        childId: mockChildId,
        balance: 20,
        totalEarned: 100,
        totalSpent: 80,
      };

      (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
        return callback({
          pointAccount: {
            findUnique: jest.fn().mockResolvedValue(mockAccount),
          },
          pointTransaction: {
            create: jest.fn(),
          },
        });
      });

      await expect(
        spendPoints({
          childId: mockChildId,
          amount: 50,
          sourceType: SourceType.pet,
          description: '操作失败',
        })
      ).rejects.toThrow('操作失败');
    });

    it('操作失败', async () => {
      (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
        return callback({
          pointAccount: {
            findUnique: jest.fn().mockResolvedValue(null),
          },
          pointTransaction: {
            create: jest.fn(),
          },
        });
      });

      await expect(
        spendPoints({
          childId: mockChildId,
          amount: 10,
          sourceType: SourceType.pet,
          description: '操作失败',
        })
      ).rejects.toThrow('操作失败');
    });

    it('操作失败'ç»ï¿½zï¿½.ç§¯ï¿½^?ï¿½.ï¿½ï¿½?ï¿½', async () => {
      await expect(
        spendPoints({
          childId: mockChildId,
          amount: 0,
          sourceType: SourceType.pet,
          description: '操作失败',
        })
      ).rejects.toThrow('操作失败');
    });

    it('操作失败', async () => {
      const mockAccount = {
        id: mockAccountId,
        childId: mockChildId,
        balance: 100,
        totalEarned: 100,
        totalSpent: 0,
      };

      const mockTransaction = {
        id: 'tx-1',
        accountId: mockAccountId,
        type: 'spend',
        amount: -20,
        balanceAfter: 80,
        sourceType: SourceType.pet,
        sourceId: 'pet-care-1',
        description: '操作失败',
      };

      (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
        return callback({
          pointAccount: {
            findUnique: jest.fn().mockResolvedValue(mockAccount),
            update: jest.fn().mockResolvedValue({ ...mockAccount, balance: 80 }),
          },
          pointTransaction: {
            create: jest.fn().mockResolvedValue(mockTransaction),
          },
        });
      });

      const result = await spendPoints({
        childId: mockChildId,
        amount: 20,
        sourceType: SourceType.pet,
        sourceId: 'pet-care-1',
        description: '操作失败',
      });

      expect(result.transaction).toBeDefined();
      expect(result.transaction.amount).toBe(-20); // ï¿½^è´¹ä¸ºï¿½Yï¿½.ï¿½
      expect(result.transaction.balanceAfter).toBe(80);
    });
  });

  describe('getPointAccount', () => {
    it('操作失败'Oï¿½o?ï¿½'æµæ°´', async () => {
      const mockAccount = {
        id: mockAccountId,
        childId: mockChildId,
        balance: 150,
        totalEarned: 200,
        totalSpent: 50,
        transactions: [
          { id: 'tx-1', amount: 20, description: '操作失败' },
          { id: 'tx-2', amount: -10, description: '操作失败' },
        ],
      };

      (prisma.pointAccount.findUnique as jest.Mock).mockResolvedValue(mockAccount);

      const result = await getPointAccount(mockChildId);

      expect(result).toBeDefined();
      expect(result?.balance).toBe(150);
      expect(result?.transactions).toHaveLength(2);
    });

    it('操作失败', async () => {
      (prisma.pointAccount.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getPointAccount(mockChildId);

      expect(result).toBeNull();
    });
  });
});
