import { prisma } from "@/lib/prisma";

export async function getTopicsWithCardCount() {
  return prisma.topic.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { cards: true } } },
  });
}

export async function getTopicWithCards(topicId: string) {
  return prisma.topic.findUnique({
    where: { id: topicId },
    include: { cards: { orderBy: { createdAt: "asc" } } },
  });
}
