# Vocabulary Learning App – Fachkonzept

> Arbeitsdokument für gemeinsam getroffene Entscheidungen. Offene Punkte bleiben ausdrücklich als offene Fragen markiert.

## 1. Ziel und Zweck

Eine kleine Webanwendung unterstützt beim Lernen englischer Vokabeln. Lerninhalte reichen von einzelnen Wörtern und Ausdrücken bis zu kurzen englischen Sätzen. Die Inhalte werden strukturiert gespeichert und können über einen einfachen Admin-Bereich gepflegt werden.

Die Anwendung soll zunächst klein, übersichtlich und auf den konkreten Schulstoff ausgerichtet sein. Die Architektur und das Datenmodell sollen spätere Erweiterungen ermöglichen, ohne den MVP unnötig komplex zu machen.

## 2. Zielgruppe und Nutzungskontext

- Die Anwendung wird zunächst für einen festen, vorgegebenen Vokabelbestand konzipiert.
- Eine konkrete Mehrbenutzerverwaltung ist im MVP noch nicht erforderlich.
- Die Anwendung soll fachlich so vorbereitet werden, dass später mehrere Lernende mit eigenem Lernfortschritt unterstützt werden können.
- Lernende benötigen im MVP kein Benutzerkonto.
- Der Admin-Bereich ist nur für berechtigte Personen zugänglich.

## 3. Lerninhalte und Vokabelbestand

Zu Beginn wird ausschließlich mit einem festen, vorgegebenen Vokabelbestand gearbeitet. Der erste Bestand stammt aus dem Schulstoff zum Thema:

> **Pick-up A – I'm from Greenwich**

Die Vokabeln werden nicht im Anwendungscode hardcodiert, sondern als strukturierte Daten gespeichert. Weitere Vokabelbestände und Themen sollen später ergänzt werden können.

Quelle des ersten Bestands sind drei bereitgestellte Fotos im Verzeichnis `/docs/`:

- `docs/IMG_4597.jpeg`
- `docs/IMG_4598.jpeg`
- `docs/IMG_4599.jpeg`

Die Daten werden vor der Speicherung redaktionell normalisiert. Offensichtliche OCR- und Transkriptionsfehler werden korrigiert. Bei nicht eindeutig rekonstruierbaren Stellen ist eine manuelle Prüfung erforderlich.

## 4. Fachliche Struktur einer Lernkarte

Die Vokabeln werden exakt nach der vorgegebenen Dreispaltenstruktur gepflegt:

### 4.1 Englisch inklusive Aussprache

- Englisches Wort, englischer Ausdruck oder kurzer englischer Satz
- Ausspracheangabe als Bestandteil der englischen Spalte
- Die Aussprache wird technisch separat gespeichert, im Admin-Bereich aber unter der fachlichen Spalte „Englisch inklusive Aussprache“ gruppiert.

### 4.2 Deutsch

- Deutsche Übersetzung oder mehrere deutsche Übersetzungen
- Mehrere in der Vorlage angegebene Übersetzungsvarianten können innerhalb derselben deutschen Spalte gespeichert werden.

### 4.3 Hinweis

- Optionaler Hinweis zur jeweiligen Lernkarte
- Keine eigene Lernkarte
- Wird erst nach der Auflösung bzw. nach dem eigenen Übersetzungsversuch angezeigt
- Kann beispielsweise einen Beispielsatz, eine grammatische Information, eine Merkhilfe, eine zusätzliche Bedeutung oder einen Aussprachehinweis enthalten
- Wird immer genau der zugehörigen Lernkarte zugeordnet

Die Zuordnung aus den drei Spalten der Vorlage bleibt maßgeblich. Inhalte werden nicht automatisch aufgrund zusätzlicher Beispielsätze in weitere Lernkarten aufgespalten.

### 4.4 Inhaltstypen

- **Wort oder Ausdruck**, beispielsweise `mouse`, `different` oder `on holiday`
- **Kurzer Satz**, beispielsweise `I'm from Greenwich.`

Beide Inhaltstypen werden als Lernkarten unterstützt, sofern sie in den drei vorgegebenen Spalten als eigenständiger Eintrag enthalten sind.

## 5. Normalisierung der gelieferten Vokabeln

Bei der redaktionellen Übertragung werden unter anderem folgende Fehler korrigiert:

- `Laum from 'grenids]` → `I'm from Greenwich.`
- `Im English.` → `I'm English.`
- `unterchiedlich` → `unterschiedlich`
- `Pla` → `Pia`
- `ein Madchen` → `ein Mädchen`
- `Klike the boating lake.` → `I like the boating lake.`
- `They re my friends.` → `They're my friends.`
- `öer daunt it 'mais]` → `They don't eat mice.`
- OCR-Fehler in `cycling`, `football`, `squirrel`, `favourite` und `boating lake`
- fehlerhafte Groß-/Kleinschreibung, Satzzeichen und Apostrophe

Ausspracheangaben werden als redaktionelle Textangaben übernommen und von offensichtlichen OCR-Verwechslungen bereinigt. Eine automatische Spracherkennung oder automatische Aussprachegenerierung ist für das MVP nicht vorgesehen.

Reine Grammatik- oder Ausspracheerklärungen werden nicht als eigene Lernkarten gespeichert, sondern – sofern sie einer Karte zugeordnet werden können – als Hinweise hinterlegt.

## 6. Lernrichtungen

Die Anwendung unterstützt beide Lernrichtungen:

- **Deutsch → Englisch**
- **Englisch → Deutsch**
- **Gemischt:** zufällige Auswahl einer der beiden Richtungen pro Karte

Vor dem Start einer Lernsession wird die Lernrichtung ausgewählt. Bei einer gemischten Session wird die Richtung für jede einzelne Karte zufällig bestimmt und auf der Karte sichtbar angezeigt.

## 7. Ablauf einer Lernsession

1. Die lernende Person wählt ein Thema bzw. einen Vokabelbestand aus.
2. Sie wählt die Lernrichtung:
   - Deutsch → Englisch
   - Englisch → Deutsch
   - zufällige Mischung beider Richtungen
3. Optional kann die Anzahl der Karten festgelegt werden.
4. Die Auswahl bietet die Werte **5**, **10**, **20** und **Alle** an.
5. Wird eine Anzahl größer als der verfügbare Bestand gewählt, werden alle verfügbaren Karten verwendet.
6. Die ausgewählten Karten werden in zufälliger Reihenfolge angezeigt.
7. Jede Karte erscheint innerhalb einer Session höchstens einmal.
8. Die lernende Person überlegt die Übersetzung zunächst selbst; ein Eingabefeld ist im MVP nicht erforderlich.
9. Mit **„Auflösen“** werden die korrekte Übersetzung und – falls vorhanden – der Hinweis angezeigt.
10. Danach bewertet sich die lernende Person selbst:
    - **Gewusst**
    - **Nicht gewusst**
11. Nach der Bewertung wird automatisch die nächste Karte angezeigt.
12. Am Ende erscheint eine Session-Zusammenfassung.
13. Die Zusammenfassung wird im MVP nicht dauerhaft gespeichert.
14. Eine versehentliche Aktualisierung der Seite darf die laufende Session im MVP zurücksetzen.

Beispiel für die Zusammenfassung:

```text
Session abgeschlossen

20 Karten gelernt
15 gewusst
5 nicht gewusst
```

## 8. Technischer Entwurf

### 8.1 Architektur

Die Anwendung wird als gemeinsamer Monolith umgesetzt:

- Next.js mit App Router
- Lernbereich und Admin-Bereich in einer Codebasis
- serverseitige Datenzugriffe innerhalb der Next.js-Anwendung
- keine separate Backend-Anwendung im MVP
- keine öffentliche, unabhängig versionierte API erforderlich

### 8.2 Datenmodell

#### `Topic`

Repräsentiert einen Vokabelbestand bzw. ein Thema.

```text
Topic
- id
- title
- description (optional)
- createdAt
- updatedAt
```

#### `VocabularyCard`

Repräsentiert genau eine Lernkarte.

```text
VocabularyCard
- id
- topicId
- englishText
- pronunciation (optional)
- germanTranslations
- hint (optional)
- createdAt
- updatedAt
```

Beziehungen:

```text
Topic 1 ──── n VocabularyCard
```

`germanTranslations` enthält eine oder mehrere deutsche Übersetzungen. Fachlich bleiben diese Übersetzungen Teil der deutschen Spalte; technisch können sie als strukturierter Wert, beispielsweise als JSON-Array, gespeichert werden.

### 8.3 Empfohlenes Prisma-Modell

```prisma
model Topic {
  id          String           @id @default(cuid())
  title       String
  description String?
  cards       VocabularyCard[]
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
}

model VocabularyCard {
  id                 String   @id @default(cuid())
  topicId            String
  topic              Topic    @relation(fields: [topicId], references: [id], onDelete: Cascade)
  englishText        String
  pronunciation      String?
  germanTranslations Json
  hint               String?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  @@index([topicId])
}
```

Das Prisma-Modell ist ein Planungsstand und muss bei der Implementierung gegen die verwendete Prisma-Version und SQLite-Unterstützung geprüft werden. Falls JSON-Arrays in der konkreten Umgebung nicht passend unterstützt werden, kann die deutsche Übersetzung alternativ als einzelner strukturierter Textwert mit einem klar definierten Trenn- bzw. Importformat oder als separate Relation modelliert werden.

### 8.4 Session-Zustand

Der Zustand einer laufenden Session wird zunächst nur temporär verwaltet:

```text
LearningSession
- topicId
- direction
- cards
- currentCardIndex
- revealed
- results
```

Mögliche Richtungen:

```text
GERMAN_TO_ENGLISH
ENGLISH_TO_GERMAN
MIXED
```

Für eine gemischte Session wird die konkrete Richtung je Karte festgelegt:

```text
CardInSession
- cardId
- direction
```

Bewertung:

```text
KNOWN
UNKNOWN
```

Der Zustand wird im MVP nicht dauerhaft in der Datenbank gespeichert. Ein Browser-Refresh darf die Session verlieren.

## 9. Seiten- und Routenstruktur

```text
/
├── /learn
├── /learn/setup
├── /learn/session
├── /learn/result
├── /admin/login
├── /admin
├── /admin/topics/[topicId]
├── /admin/cards/new
└── /admin/cards/[cardId]/edit
```

### Seiten

- `/` – Startseite
- `/learn` – Auswahl eines Themas
- `/learn/setup` – Lernrichtung und Kartenanzahl
- `/learn/session` – aktuelle Lernkarte
- `/learn/result` – Session-Ergebnis
- `/admin/login` – Admin-Anmeldung
- `/admin` – Themenübersicht
- `/admin/topics/[topicId]` – Lernkarten eines Themas
- `/admin/cards/new` – neue Lernkarte anlegen
- `/admin/cards/[cardId]/edit` – Lernkarte bearbeiten

## 10. Technologieentscheidungen für das MVP

- **Framework:** Next.js mit App Router
- **Programmiersprache:** TypeScript
- **Styling:** Tailwind CSS
- **Datenzugriff:** Prisma ORM
- **Datenbank:** SQLite für den Start
- **Architektur:** gemeinsamer Monolith für Lernbereich und Admin-Bereich
- **Backend:** keine separate Backend-Anwendung im MVP
- **Strukturierte Speicherung:** Lernkarten werden in der Datenbank gespeichert und nicht im Anwendungscode hardcodiert
- **Initialer Datenimport:** Seed- oder Import-Skript für den ersten Vokabelbestand
- **Erweiterbarkeit:** Ein späterer Wechsel auf PostgreSQL und die Ergänzung einer Benutzerverwaltung sollen möglich bleiben

SQLite wird für die lokale Entwicklung und den kleinen ersten Bestand verwendet. Bei der späteren Bereitstellung muss sichergestellt werden, dass die Datenbank dauerhaft gespeichert wird und nicht bei jedem neuen Deployment verloren geht.

## 11. Authentifizierung und Berechtigungen

Für den MVP wird ein einzelner Admin-Zugang verwendet:

- Login-Seite unter `/admin/login`
- ein Benutzerkonto
- keine Registrierung
- keine Benutzerverwaltung
- Benutzername und Passwort werden ausschließlich über Umgebungsvariablen konfiguriert
- Zugangsdaten werden nicht im Quellcode gespeichert
- nach erfolgreichem Login wird eine geschützte Session über ein Cookie verwendet
- Admin-Seiten sind nur nach erfolgreicher Anmeldung zugänglich
- Lernende benötigen keinen Login

## 12. UI/UX-Entscheidungen

### 12.1 Grundprinzipien

- **Mobile first**
- Unterstützung für Smartphone, Tablet und Desktop
- ruhiges, helles und schulgeeignetes Design
- große, gut lesbare Schrift
- klare Primäraktionen
- ausreichender Farbkontrast
- große Touch-Ziele
- Bedienung per Tastatur und Touch
- keine überflüssigen Animationen im Lernfluss
- Informationen dürfen nicht ausschließlich über Farben vermittelt werden
- sichtbarer Fokus bei Tastaturbedienung
- logisch sortierte Tab-Reihenfolge

Der visuelle Stil soll wie ein ruhiges Lernwerkzeug wirken und nicht wie ein überladenes Spiel. Vorgesehen sind ein heller Hintergrund, eine dezente blaue oder violette Akzentfarbe und eine zentral platzierte Lernkarte mit abgerundeten Ecken.

### 12.2 Startseite

Die Startseite enthält nur die wichtigsten Aktionen:

- Anwendungstitel
- kurze Erklärung
- Button **„Lernen starten“**
- Button **„Admin-Bereich“** für berechtigte Personen

### 12.3 Lernkonfiguration

Vor Beginn einer Session können ausgewählt werden:

- Thema bzw. Vokabelbestand
- Lernrichtung
- Kartenanzahl: **5**, **10**, **20** oder **Alle**
- Button **„Lernen beginnen“**

Im MVP wird zunächst genau ein Thema pro Session ausgewählt. Die Themenstruktur wird einfach gehalten; weitere Unterteilungen können später ergänzt werden. Freie Tags sind für den ersten festen Vokabelbestand nicht erforderlich.

### 12.4 Lernkarte vor der Auflösung

Beispiel für Englisch → Deutsch:

```text
Karte 4 von 20

Übersetzung von:

I'm from Greenwich.
Aussprache: [Ausspracheangabe]

[Auflösen]
```

Beispiel für Deutsch → Englisch:

```text
Karte 4 von 20

Übersetzung von:

Ich bin aus Greenwich.

[Auflösen]
```

Bei einer gemischten Session wird die Richtung der jeweiligen Karte sichtbar angezeigt, beispielsweise:

```text
Deutsch → Englisch
```

Die jeweils nicht benötigte Sprachseite wird vor der Auflösung nicht angezeigt.

### 12.5 Lernkarte nach der Auflösung

```text
Lösung:

I'm from Greenwich.
Aussprache: [Ausspracheangabe]

Hinweis:

[optionaler Hinweis]

[Gewusst]       [Nicht gewusst]
```

Der Hinweis wird nur angezeigt, wenn für die Lernkarte ein Hinweis gespeichert ist.

### 12.6 Fortschrittsanzeige

Während der Session werden angezeigt:

- aktuelle Kartennummer und Gesamtanzahl, beispielsweise `Karte 4 von 20`
- visueller Fortschrittsbalken
- optional die aktuelle Anzahl der Bewertungen „Gewusst“ und „Nicht gewusst“

### 12.7 Navigation während des Lernens

- Der Lernbereich besitzt keinen permanent sichtbaren Navigationsbereich.
- Eine Option **„Session beenden“** ist verfügbar.
- Beim vorzeitigen Verlassen wird gewarnt.
- Die Browser-Zurück-Navigation soll kontrolliert behandelt werden.
- Nach der Bewertung wird automatisch die nächste Karte angezeigt.

### 12.8 Session-Ergebnis

Am Ende werden angezeigt:

- Anzahl gelernter Karten
- Anzahl „Gewusst“
- Anzahl „Nicht gewusst“
- Button **„Nochmal lernen“**
- Button **„Zur Startseite“**

### 12.9 Admin-Bereich

Der Admin-Bereich umfasst zunächst diese Ansichten:

1. **Themenübersicht**
   - Liste der Vokabelbestände
   - vollständiger Themenname
   - kurze Beschreibung, sofern vorhanden
   - Anzahl der Lernkarten
2. **Lernkartenübersicht**
   - Englisch inklusive Aussprache
   - Deutsch
   - Hinweis vorhanden: Ja/Nein
   - neue Karte anlegen
   - Bearbeiten
   - Löschen
3. **Lernkarte anlegen/bearbeiten**
   - englischer Inhalt
   - Aussprache
   - standardmäßig ein Feld für eine deutsche Übersetzung
   - Möglichkeit, weitere Übersetzungsfelder hinzuzufügen
   - Hinweis
   - Speichern
   - Abbrechen

Destruktive Aktionen wie Löschen erfordern eine Bestätigung. Fehlermeldungen werden direkt am jeweiligen Eingabefeld angezeigt.

## 13. Datenimport und redaktioneller Workflow

Der erste Vokabelbestand wird aus den drei Fotos redaktionell in strukturierte Importdaten überführt. Ein Importdatensatz enthält mindestens:

```json
{
  "topic": {
    "title": "Pick-up A – I'm from Greenwich",
    "description": "Vokabeln aus dem aktuellen Schulstoff"
  },
  "cards": [
    {
      "englishText": "I'm from Greenwich.",
      "pronunciation": "[Ausspracheangabe]",
      "germanTranslations": ["Ich bin aus Greenwich."],
      "hint": null
    }
  ]
}
```

Grundsätze:

- Importdaten werden vor dem Import geprüft.
- Offensichtliche Transkriptionsfehler werden korrigiert.
- Die Dreispaltenzuordnung aus der Vorlage bleibt erhalten.
- Hinweise werden nicht als eigene Lernkarten importiert.
- Die Daten werden nach dem Import zusätzlich über den Admin-Bereich pflegbar.

## 14. Nicht Bestandteil des MVP

Die folgenden Funktionen werden zunächst nicht umgesetzt:

- Lernendenkonten
- dauerhaft gespeicherter persönlicher Lernfortschritt
- komplexes Spaced-Repetition-System
- automatische Bewertung eingegebener Antworten
- verpflichtendes Eingabefeld für Antworten
- automatische Spracherkennung
- automatische Aussprachegenerierung
- Audioverwaltung
- freie Tags
- gleichzeitige Auswahl mehrerer Themen
- umfangreiche Rollen- und Rechteverwaltung
- Registrierung und Benutzerverwaltung
- dauerhaftes Speichern einer laufenden Session

## 15. Noch offen – bewusst zurückgestellt

Die folgenden Punkte wurden nicht weiter fachlich detailliert und bleiben für eine spätere Phase offen:

1. konkrete Unterteilung eines Themas in Kapitel oder Abschnitte
2. Benutzerkonten und persönlicher Lernfortschritt
3. Freigabe- und Veröffentlichungsstatus von Inhalten
4. Umgang mit Audio und automatischer Sprachausgabe
5. konkrete technische Umsetzung der Admin-Session und Cookie-Sicherheit
6. detaillierter Umgang mit unklaren oder mehrfach möglichen Übersetzungen
7. konkrete Prisma-/SQLite-Unterstützung für Übersetzungs-Arrays
8. konkretes Deployment mit dauerhaftem Datenbank-Storage

## 16. Nächster Planungsschritt

Als nächstes kann die technische Umsetzung vorbereitet werden:

- Next.js-Projektstruktur anlegen
- Prisma-Schema und Migration erstellen
- Seed-/Importdaten für den ersten Vokabelbestand erstellen
- Seiten und Routen anlegen
- Lernsession-Komponenten umsetzen
- Admin-Login und Zugriffsschutz umsetzen
- Admin-CRUD für Themen und Lernkarten umsetzen
- UI-Wireframes in responsive Komponenten übertragen
- Tests für Lernsession, Übersetzungsvarianten und Admin-Zugriff ergänzen
