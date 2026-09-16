# Vocabulary Learning App

Eine kleine Webanwendung zum Lernen englischer Vokabeln. Siehe [docs/fachkonzept.md](docs/fachkonzept.md)
für die vollständige fachliche und technische Konzeption.

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

Siehe [.env.example](.env.example).

| Variable         | Zweck                                                          |
| ---------------- | --------------------------------------------------------------- |
| `DATABASE_URL`    | SQLite-Datenbankdatei (`prisma/dev.db`), nicht versioniert       |
| `ADMIN_USERNAME`  | Benutzername des einzelnen Admin-Kontos                         |
| `ADMIN_PASSWORD`  | Passwort des einzelnen Admin-Kontos                              |
| `SESSION_SECRET`  | Signaturschlüssel für das Admin-Session-Cookie                  |

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

## Seiten- und Routenstruktur

| Route                            | Beschreibung                              |
| --------------------------------- | ------------------------------------------ |
| `/`                                | Startseite                                 |
| `/learn`                           | Themenauswahl                              |
| `/learn/setup`                     | Lernrichtung und Kartenanzahl              |
| `/learn/session`                   | aktuelle Lernkarte                         |
| `/learn/result`                    | Session-Ergebnis (nicht persistiert)       |
| `/admin/login`                     | Admin-Anmeldung                            |
| `/admin`                           | Themenübersicht (geschützt)                |
| `/admin/topics/[topicId]`          | Lernkarten eines Themas (geschützt)        |
| `/admin/cards/new`                 | neue Lernkarte anlegen (geschützt)         |
| `/admin/cards/[cardId]/edit`       | Lernkarte bearbeiten/löschen (geschützt)   |

Der Lernsession-Zustand wird ausschließlich clientseitig im React-Context
gehalten (siehe [docs/fachkonzept.md, Abschnitt 8.4](docs/fachkonzept.md#84-session-zustand))
und geht bei einem Seiten-Reload absichtlich verloren. Der Admin-Bereich ist
über ein signiertes, httpOnly-Session-Cookie geschützt
([src/middleware.ts](src/middleware.ts)); Zugangsdaten kommen ausschließlich
aus Umgebungsvariablen (siehe [docs/fachkonzept.md, Abschnitt 11](docs/fachkonzept.md#11-authentifizierung-und-berechtigungen)).


