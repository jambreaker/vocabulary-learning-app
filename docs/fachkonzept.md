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
4. Standardmäßig werden alle Karten des gewählten Themas verwendet.
5. Die ausgewählten Karten werden in zufälliger Reihenfolge angezeigt.
6. Jede Karte erscheint innerhalb einer Session höchstens einmal.
7. Die lernende Person überlegt die Übersetzung zunächst selbst; ein Eingabefeld ist im MVP nicht erforderlich.
8. Mit **„Auflösen“** werden die korrekte Übersetzung und – falls vorhanden – der Hinweis angezeigt.
9. Danach bewertet sich die lernende Person selbst:
   - **Gewusst**
   - **Nicht gewusst**
10. Nach der Bewertung wird automatisch die nächste Karte angezeigt.
11. Am Ende erscheint eine Session-Zusammenfassung.
12. Die Zusammenfassung wird im MVP nicht dauerhaft gespeichert.

Beispiel für die Zusammenfassung:

```text
Session abgeschlossen

20 Karten gelernt
15 gewusst
5 nicht gewusst
```

## 8. Technologieentscheidungen für das MVP

- **Framework:** Next.js mit App Router
- **Programmiersprache:** TypeScript
- **Styling:** Tailwind CSS
- **Datenzugriff:** Prisma ORM
- **Datenbank:** SQLite für den Start
- **Architektur:** gemeinsamer Monolith für Lernbereich und Admin-Bereich
- **Backend:** keine separate Backend-Anwendung im MVP
- **Strukturierte Speicherung:** Lernkarten werden in der Datenbank gespeichert und nicht im Anwendungscode hardcodiert
- **Erweiterbarkeit:** Ein späterer Wechsel auf PostgreSQL und die Ergänzung einer Benutzerverwaltung sollen möglich bleiben

SQLite wird für die lokale Entwicklung und den kleinen ersten Bestand verwendet. Bei der späteren Bereitstellung muss sichergestellt werden, dass die Datenbank dauerhaft gespeichert wird und nicht bei jedem neuen Deployment verloren geht.

## 9. Authentifizierung und Berechtigungen

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

## 10. UI/UX-Entscheidungen

### 10.1 Grundprinzipien

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

### 10.2 Startseite

Die Startseite enthält nur die wichtigsten Aktionen:

- Anwendungstitel
- kurze Erklärung
- Button **„Lernen starten“**
- Button **„Admin-Bereich“** für berechtigte Personen

### 10.3 Lernkonfiguration

Vor Beginn einer Session können ausgewählt werden:

- Thema bzw. Vokabelbestand
- Lernrichtung
- Kartenanzahl
- Button **„Lernen beginnen“**

Im MVP wird zunächst genau ein Thema pro Session ausgewählt. Die Themenstruktur wird einfach gehalten; weitere Unterteilungen können später ergänzt werden. Freie Tags sind für den ersten festen Vokabelbestand nicht erforderlich.

### 10.4 Lernkarte vor der Auflösung

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

### 10.5 Lernkarte nach der Auflösung

```text
Lösung:

I'm from Greenwich.
Aussprache: [Ausspracheangabe]

Hinweis:

[optionaler Hinweis]

[Gewusst]       [Nicht gewusst]
```

Der Hinweis wird nur angezeigt, wenn für die Lernkarte ein Hinweis gespeichert ist.

### 10.6 Fortschrittsanzeige

Während der Session werden angezeigt:

- aktuelle Kartennummer und Gesamtanzahl, beispielsweise `Karte 4 von 20`
- visueller Fortschrittsbalken
- optional die aktuelle Anzahl der Bewertungen „Gewusst“ und „Nicht gewusst“

### 10.7 Navigation während des Lernens

- Der Lernbereich besitzt keinen permanent sichtbaren Navigationsbereich.
- Eine Option **„Session beenden“** ist verfügbar.
- Beim vorzeitigen Verlassen wird gewarnt.
- Die Browser-Zurück-Navigation soll kontrolliert behandelt werden.
- Nach der Bewertung wird automatisch die nächste Karte angezeigt.

### 10.8 Session-Ergebnis

Am Ende werden angezeigt:

- Anzahl gelernter Karten
- Anzahl „Gewusst“
- Anzahl „Nicht gewusst“
- Button **„Nochmal lernen“**
- Button **„Zur Startseite“**

### 10.9 Admin-Bereich

Der Admin-Bereich umfasst zunächst drei Ansichten:

1. **Themenübersicht**
   - Liste der Vokabelbestände
   - vollständiger Themenname
   - kurze Beschreibung, sofern vorhanden
   - Anzahl der Lernkarten
2. **Lernkartenübersicht**
   - Englisch inklusive Aussprache
   - Deutsch
   - Hinweis vorhanden: Ja/Nein
   - Bearbeiten
   - Löschen
3. **Lernkarte bearbeiten**
   - englischer Inhalt
   - Aussprache
   - deutsche Übersetzung bzw. Übersetzungen
   - Hinweis
   - Speichern
   - Abbrechen

Destruktive Aktionen wie Löschen erfordern eine Bestätigung. Fehlermeldungen werden direkt am jeweiligen Eingabefeld angezeigt.

## 11. Nicht Bestandteil des MVP

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

## 12. Noch offen – bewusst zurückgestellt

Die folgenden Punkte wurden nicht weiter fachlich detailliert und bleiben für eine spätere Phase offen:

1. konkrete Unterteilung eines Themas in Kapitel oder Abschnitte
2. Benutzerkonten und persönlicher Lernfortschritt
3. Freigabe- und Veröffentlichungsstatus von Inhalten
4. Umgang mit Audio und automatischer Sprachausgabe
5. konkrete Datenbanktabellen und Feldtypen im technischen Datenmodell
6. detaillierter Umgang mit unklaren oder mehrfach möglichen Übersetzungen
7. Verhalten bei einer Kartenanzahl, die größer als die Anzahl verfügbarer Karten ist

## 13. Nächster Planungsschritt

Als nächstes soll ein konkreter technischer Entwurf erstellt werden:

- Datenmodell für Themen und Lernkarten
- Prisma-Schema
- Seiten- und Routenstruktur
- Komponentenstruktur
- Session-Zustand für den Lernablauf
- Admin-Login und Zugriffsschutz
- Importformat für den ersten Vokabelbestand
- UI-Wireframes für Startseite, Konfiguration, Lernkarte, Ergebnis und Admin-Bereich
