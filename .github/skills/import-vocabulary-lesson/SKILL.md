---
name: import-vocabulary-lesson
description: Übernimmt Vokabeln aus Fotos/Scans einer Schulbuch-Vokabelliste (3 Spalten) als neue Lektion (Topic) in die Datenbank. Verwenden, wenn der Nutzer Bilder neuer Vokabeln gibt und eine neue Lektion anlegen will.
---

# Vokabel-Lektion aus Fotos importieren

## Vorlage (Schulbuchseite)
Drei Spalten:
1. Englisches Wort + Lautschrift in eckigen Klammern
2. Deutsche Übersetzung(en), mehrere durch `;` getrennt
3. Erklärung / Beispielsatz → Feld `hint`

## Vorgehen
1. Bilder lesen (große Bilder vorher mit `sips -Z 1400 in.jpg --out out.jpg` verkleinern, dann mit `view` ansehen).
2. Bestehende Daten in `prisma/seed.ts` ansehen und das Format übernehmen.
3. Lektionsname vom Nutzer übernehmen (Titel des Topics, z. B. „This is fun!").
4. In `prisma/seed.ts` ein neues Karten-Array (Typ `typeof cards`) ergänzen und in `main()` einen weiteren `topic.upsert` mit stabiler `id` (kebab-case, z. B. `pick-up-b-this-is-fun`) + `deleteMany` + `createMany` hinzufügen. Bestehende Topics nicht verändern.
5. DB vorher sichern: `cp prisma/dev.db /tmp/dev.db.bak`. Hinweis: `npm run seed` legt ALLE Seed-Topics neu an und überschreibt manuelle Änderungen im Admin-Bereich – den Nutzer darauf hinweisen.
6. `npm run seed` ausführen, dann prüfen:
   `sqlite3 prisma/dev.db "select t.title,count(c.id) from Topic t left join VocabularyCard c on c.topicId=t.id group by t.id"`

## Feldregeln
- `englishText`: Wort ohne Lautschrift; Grammatikangaben wie `(pl)` oder `(to)` bleiben erhalten. Führende Punkte/Marker der Vorlage weglassen.
- `pronunciation`: IPA in `/…/` statt `[…]`; Betonungszeichen `ˈ` bzw. `ˌ` verwenden.
- `germanTranslations`: Array, eine Übersetzung pro `;`-getrenntem Eintrag.
- `hint`: Beispielsätze und Hinweise (`! Achtung …`, `Fr. …; Lat. …`) übernehmen; mehrere Zeilen mit `\n`. Ohne Erklärung weglassen.
- Reine Bilder und Boxen ohne deutsche Übersetzung (z. B. „Hobbies") nicht importieren.

## Abschluss
Dem Nutzer Anzahl der Karten nennen, nicht übernommene Teile erwähnen und darauf hinweisen, dass undeutliche Stellen (v. a. Lautschrift) zu prüfen sind.
