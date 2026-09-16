# Vocabulary Learning App – Fachkonzept

> Arbeitsdokument für gemeinsam getroffene Entscheidungen. Offene Punkte bleiben ausdrücklich als offene Fragen markiert.

## Ziel

Eine kleine Webanwendung unterstützt beim Lernen englischer Vokabeln. Lerninhalte reichen von einzelnen Wörtern bis zu kurzen Sätzen. Die Inhalte werden strukturiert gespeichert und über einen einfachen Admin-Bereich gepflegt.

## Bisher festgelegt

- Lernsprache: Englisch.
- Lerninhalte: einzelne Wörter und kurze englische Sätze.
- Inhalte werden strukturiert gespeichert und nicht im Anwendungscode hardcodiert.
- Es gibt einen möglichst einfachen Admin-Bereich zur Pflege der Inhalte.
- Die Anwendung soll zunächst klein und überschaubar bleiben.
- Die Anwendung wird zunächst so geplant, dass später mehrere Lernende möglich sind, ohne diese Funktion im MVP vollständig umzusetzen.
- Beide Lernrichtungen werden unterstützt:
  - Deutsch → Englisch
  - Englisch → Deutsch
- Vor dem Start einer Lernsession wählt die lernende Person die Richtung aus.
- Zusätzlich gibt es eine Option für eine zufällige Mischung beider Richtungen innerhalb einer Lernsession.
- Zu Beginn wird ausschließlich mit einem festen, vorgegebenen Vokabelbestand gearbeitet.
- Der erste Vokabelbestand stammt aus dem Schulstoff zum Thema **„Pick-up A – I'm from Greenwich“**.
- Weitere Vokabelbestände und Themen sollen später ergänzt werden können.

## Fachliche Struktur der Lerninhalte

Die Vokabeln werden exakt nach der vorgegebenen Dreispaltenstruktur gepflegt:

1. **Englisch inklusive Aussprache**
   - englisches Wort, Ausdruck oder englischer Satz
   - Ausspracheangabe als Bestandteil der englischen Spalte
2. **Deutsch**
   - deutsche Übersetzung oder Übersetzungen
3. **Hinweis**
   - optionaler Hinweis zur jeweiligen Lernkarte
   - wird erst nach der Auflösung bzw. dem Übersetzungsversuch angezeigt
   - ist keine eigene Lernkarte

Der Hinweis kann beispielsweise einen Beispielsatz, eine grammatische Information, eine Merkhilfe, eine zusätzliche Bedeutung oder einen Aussprachehinweis enthalten. Ein Hinweis wird immer derselben Lernkarte zugeordnet und nicht als separater Lerninhalt behandelt.

### Inhaltstypen

- **Wort bzw. Ausdruck**: beispielsweise `mouse`, `different`, `on holiday`
- **Kurzer Satz**: beispielsweise `I'm from Greenwich.`

Mehrere deutsche Übersetzungen können innerhalb der deutschen Spalte hinterlegt werden, wenn sie in der Vorlage angegeben sind. Die Anwendung unterscheidet dabei zwischen der Übersetzung als eigentlicher Lösung und dem Hinweis als zusätzlicher Information.

## Erster Vokabelbestand

- Thema: `Pick-up A – I'm from Greenwich`
- Quelle: drei bereitgestellte Fotos aus dem Ordner `/docs/`
- Sprache der Quelle: Englisch mit deutscher Übersetzung, Ausspracheangaben und Hinweisen
- Die Daten werden vor der Speicherung redaktionell normalisiert. Offensichtliche OCR-/Transkriptionsfehler werden korrigiert; bei nicht eindeutig rekonstruierbaren Stellen bleibt eine Kennzeichnung zur manuellen Prüfung bestehen.

### Bei der Normalisierung zu beachten

- IPA-/Ausspracheangaben werden von offensichtlichen OCR-Verwechslungen bereinigt, zum Beispiel `I'm` statt fehlerhaft erkanntem `Laum`.
- Englische Schreibweisen werden korrigiert, zum Beispiel `favourite`, `squirrel`, `boating lake`, `they're` und `don't`.
- Deutsche Übersetzungen werden orthografisch korrigiert, zum Beispiel `Mädchen`, `Englisch`, `unterschiedlich` und `Eichhörnchen`.
- Satzzeichen, Apostrophe und Groß-/Kleinschreibung werden vereinheitlicht.
- Hinweise aus der Vorlage wie Aussprache- oder Grammatikhinweise bleiben als optionale Hinweise erhalten und werden nicht mit der eigentlichen Übersetzung vermischt.
- Die Vorlage enthält sowohl einzelne Wörter/Ausdrücke als auch vollständige Sätze. Beide werden als Lernkarten unterstützt, sofern sie in den drei Spalten als eigener Eintrag vorgegeben sind.
- Eintrag und Hinweis werden nicht automatisch aus zusätzlichen Beispielsätzen aufgespalten: Die vorgegebene Zuordnung der drei Spalten bleibt maßgeblich.

## Ablauf einer Lernsession

1. Die lernende Person wählt ein Thema bzw. einen Vokabelbestand aus.
2. Sie wählt die Lernrichtung:
   - Deutsch → Englisch
   - Englisch → Deutsch
   - zufällige Mischung beider Richtungen
3. Optional kann die Anzahl der Karten festgelegt werden. Standardmäßig werden alle Karten des gewählten Themas verwendet.
4. Die Karten werden in zufälliger Reihenfolge angezeigt.
5. Die lernende Person überlegt die Übersetzung zunächst selbst und gibt sie im MVP nicht zwingend in ein Eingabefeld ein.
6. Mit **„Auflösen“** werden die korrekte Übersetzung und – falls vorhanden – der Hinweis angezeigt.
7. Die lernende Person bewertet sich selbst mit:
   - **Gewusst**
   - **Nicht gewusst**
8. Danach wird die nächste Karte angezeigt.
9. Jede Karte erscheint innerhalb einer Session höchstens einmal.
10. Am Ende wird eine einfache Zusammenfassung angezeigt, beispielsweise die Anzahl der Karten sowie die Anzahl der gewussten und nicht gewussten Antworten. Diese Zusammenfassung wird im MVP nicht dauerhaft gespeichert.

## Noch offen – fachliche Entscheidungen

1. Organisation der Inhalte, zum Beispiel Themen, Kapitel, Niveau und Tags
2. Benutzerkonten und persönlicher Lernfortschritt
3. Freigabe-/Veröffentlichungsstatus von Inhalten
4. Umgang mit Audio und automatischer Sprachausgabe
5. Umfang und Bedienung des Admin-Bereichs
6. Format der strukturierten Speicherung, zum Beispiel JSON-Datei oder Datenbank
7. Umgang mit unklaren oder mehrfach möglichen Übersetzungen
8. Verhalten bei einer frei gewählten Kartenanzahl, die größer als die Anzahl verfügbarer Karten ist

## Arbeitsannahmen für die Diskussion

- Für ein erstes MVP sollte der Fokus auf textbasierten Lernkarten und einer schnellen Inhaltspflege liegen.
- Ein komplexes Spaced-Repetition-System kann zunächst durch eine einfache Wiederholungslogik ersetzt werden.
- Eine Trennung zwischen redaktionell gepflegten Inhalten und persönlichem Lernfortschritt ist sinnvoll, falls mehrere Lernende unterstützt werden sollen.
- Hinweise werden standardmäßig erst nach der eigenen Übersetzungsleistung angeboten.
- Die Selbstbewertung ist im MVP ausreichend; eine automatische Bewertung eingegebener Antworten ist zunächst nicht erforderlich.
