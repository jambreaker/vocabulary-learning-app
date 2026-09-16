import { prisma } from "@/lib/prisma";

export async function getCardById(cardId: string) {
  return prisma.vocabularyCard.findUnique({ where: { id: cardId } });
}

export function toTranslationsArray(value: unknown): string[] {
  return Array.isArray(value) ? (value as string[]) : [];
}
