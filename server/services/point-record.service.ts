import { PrismaClient, RecordStatus } from '@prisma/client';

const prisma = new PrismaClient();

export interface SubmitPointRecordInput {
  childId: string;
  pointRuleId: string;
  description?: string;
  imageUrl?: string;
  submitNote?: string;
}

export async function submitPointRecord(input: SubmitPointRecordInput) {
  const { childId, pointRuleId, description, imageUrl, submitNote } = input;
  const record = await prisma.pointRecord.create({
    data: {
      childId,
      pointRuleId,
      description,
      imageUrl,
      submitNote,
      status: RecordStatus.pending,
      points: 0,
    },
  });
  return { record, message: '已提交，待审核' };
}
