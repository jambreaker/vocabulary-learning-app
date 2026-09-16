# Vocabulary Learning App

Eine kleine Webanwendung zum Lernen englischer Vokabeln. Siehe [docs/fachkonzept.md](docs/fachkonzept.md)
für die vollständige fachliche und technische Konzeption.

> **Status:** Projektgrundlage (MVP-Fundament). Lernbereich, Session-Logik,
> Admin-Bereich und Login sind noch **nicht** implementiert. Aktuell vorhanden
> sind das Projektgerüst, das Datenmodell und ein Seed-Skript für den ersten
> Vokabelbestand.

## Tech-Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma ORM](https://www.prisma.io) mit SQLite

## Voraussetzungen

- Node.js 20+
- npm

## Setup

```bash
npm install
cp .env.example .env
npm run prisma:migrate   # erstellt/aktualisiert die lokale SQLite-Datenbank
npm run seed              # befüllt die Datenbank mit dem ersten Vokabelbestand
npm run dev
```

Die Anwendung läuft anschließend unter [http://localhost:3000](http://localhost:3000).

## Umgebungsvariablen

Siehe [.env.example](.env.example). `DATABASE_URL` verweist auf die lokale
SQLite-Datenbankdatei (`prisma/dev.db`) und wird nicht versioniert.

## Nützliche Skripte

| Skript                    | Zweck                                                |
| ------------------------- | ----------------------------------------------------- |
| `npm run dev`              | Entwicklungsserver starten                            |
| `npm run build`            | Produktions-Build erstellen                           |
| `npm run start`            | Produktions-Build ausführen                           |
| `npm run lint`             | ESLint ausführen                                      |
| `npm run prisma:migrate`   | Prisma-Migration erstellen/anwenden (`migrate dev`)   |
| `npm run prisma:generate`  | Prisma Client neu generieren                          |
| `npm run prisma:studio`    | Prisma Studio öffnen                                  |
| `npm run seed`             | Vokabelbestand in die Datenbank einspielen             |

## Datenmodell

Das Datenmodell besteht aus zwei Prisma-Modellen, `Topic` (Vokabelbestand /
Thema) und `VocabularyCard` (einzelne Lernkarte), siehe
[prisma/schema.prisma](prisma/schema.prisma) und
[docs/fachkonzept.md, Abschnitt 8.2/8.3](docs/fachkonzept.md#82-datenmodell).

## Seed-Daten

[prisma/seed.ts](prisma/seed.ts) legt das Thema „Pick-up A – I'm from
Greenwich“ an und befüllt es mit dem redaktionell bereinigten Vokabelbestand
(siehe [docs/fachkonzept.md, Abschnitt 3 und 5](docs/fachkonzept.md#3-lerninhalte-und-vokabelbestand)).

## Nicht Teil dieser Projektgrundlage

Gemäß Fachkonzept sind folgende Bereiche bewusst noch nicht umgesetzt:

- Lernbereich (`/learn/*`)
- Session-Logik
- Admin-Bereich
- Login/Authentifizierung

