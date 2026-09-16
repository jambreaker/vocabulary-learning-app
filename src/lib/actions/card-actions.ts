"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseTranslations(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export async function createCardAction(formData: FormData): Promise<void> {
  const topicId = String(formData.get("topicId") ?? "");
  const englishText = String(formData.get("englishText") ?? "").trim();
  const pronunciation = String(formData.get("pronunciation") ?? "").trim();
  const germanTranslations = parseTranslations(
    String(formData.get("germanTranslations") ?? "")
  );
  const hint = String(formData.get("hint") ?? "").trim();

  if (!topicId || !englishText || germanTranslations.length === 0) {
    throw new Error(
      "Thema, englischer Text und mindestens eine deutsche Übersetzung sind erforderlich."
    );
  }

  await prisma.vocabularyCard.create({
    data: {
      topicId,
      englishText,
      pronunciation: pronunciation || null,
      germanTranslations,
      hint: hint || null,
    },
  });

  revalidatePath(`/admin/topics/${topicId}`);
  redirect(`/admin/topics/${topicId}`);
}

export async function updateCardAction(formData: FormData): Promise<void> {
  const cardId = String(formData.get("cardId") ?? "");
  const topicId = String(formData.get("topicId") ?? "");
  const englishText = String(formData.get("englishText") ?? "").trim();
  const pronunciation = String(formData.get("pronunciation") ?? "").trim();
  const germanTranslations = parseTranslations(
    String(formData.get("germanTranslations") ?? "")
  );
  const hint = String(formData.get("hint") ?? "").trim();

  if (!cardId || !englishText || germanTranslations.length === 0) {
    throw new Error(
      "Englischer Text und mindestens eine deutsche Übersetzung sind erforderlich."
    );
  }

  await prisma.vocabularyCard.update({
    where: { id: cardId },
    data: {
      englishText,
      pronunciation: pronunciation || null,
      germanTranslations,
      hint: hint || null,
    },
  });

  revalidatePath(`/admin/topics/${topicId}`);
  redirect(`/admin/topics/${topicId}`);
}

export async function deleteCardAction(formData: FormData): Promise<void> {
  const cardId = String(formData.get("cardId") ?? "");
  const topicId = String(formData.get("topicId") ?? "");

  await prisma.vocabularyCard.delete({ where: { id: cardId } });

  revalidatePath(`/admin/topics/${topicId}`);
  redirect(`/admin/topics/${topicId}`);
}
