"use server";

import { prisma } from "@/lib/prisma";
import { toTranslationsArray } from "@/lib/cards";
import type { LearningCard } from "@/lib/learning-types";

export async function getCardsForTopicAction(
  topicId: string
): Promise<LearningCard[]> {
  const cards = await prisma.vocabularyCard.findMany({
    where: { topicId },
    orderBy: { createdAt: "asc" },
  });

  return cards.map((card) => ({
    id: card.id,
    englishText: card.englishText,
    pronunciation: card.pronunciation,
    germanTranslations: toTranslationsArray(card.germanTranslations),
    hint: card.hint,
  }));
}
