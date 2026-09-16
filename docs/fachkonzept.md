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

Jeder Eintrag gehört zu einem Thema bzw. Vokabelbestand und wird zunächst in drei fachlichen Spalten gepflegt:

1. **Englisch inklusive Aussprache**
   - englisches Wort oder englischer Satz
   - optionale phonetische Ausspracheangabe
2. **Deutsch**
   - deutsche Übersetzung oder Übersetzungen
3. **Hinweis**
   - optionaler Hinweis, der nach dem Übersetzen angezeigt werden kann
   - kann beispielsweise ein Beispielsatz, eine grammatische Information, eine Merkhilfe oder eine zusätzliche Bedeutung enthalten

Die Aussprache wird als redaktioneller Text gespeichert. Für die erste Version ist keine automatische Spracherkennung oder automatische Aussprachegenerierung vorgesehen.

### Inhaltstypen

- **Wort bzw. Ausdruck**: beispielsweise `mouse`, `different`, `on holiday`
- **Kurzer Satz**: beispielsweise `I'm from Greenwich.`
- **Beispiel-/Fragesatz**: ein Satz, der als Hinweis zu einem Wort oder Ausdruck angezeigt werden kann

Mehrere deutsche Übersetzungen sind erlaubt, wenn sie fachlich sinnvoll sind. Die Anwendung soll Übersetzungen und Hinweise getrennt behandeln: Eine Übersetzung ist die erwartete Bedeutung, ein Hinweis ist zusätzliche Lernhilfe.

## Erster Vokabelbestand

- Thema: `Pick-up A – I'm from Greenwich`
- Quelle: drei bereitgestellte Fotos aus dem Ordner `/docs/`
- Sprache der Quelle: Englisch mit deutscher Übersetzung und Ausspracheangaben
- Die Daten werden vor der Speicherung redaktionell normalisiert. Offensichtliche OCR-/Transkriptionsfehler werden korrigiert; bei nicht eindeutig rekonstruierbaren Stellen bleibt eine Kennzeichnung zur manuellen Prüfung bestehen.

### Bei der Normalisierung zu beachten

- IPA-/Ausspracheangaben werden von offensichtlichen OCR-Verwechslungen bereinigt, zum Beispiel `I'm` statt fehlerhaft erkanntem `Laum`.
- Englische Schreibweisen werden korrigiert, zum Beispiel `favourite`, `squirrel`, `boating lake`, `they're` und `don't`.
- Deutsche Übersetzungen werden orthografisch korrigiert, zum Beispiel `Mädchen`, `Englisch`, `Unterschiedlich` und `Eichhörnchen`.
- Satzzeichen, Apostrophe und Groß-/Kleinschreibung werden vereinheitlicht.
- Hinweise aus der Vorlage wie Aussprache- oder Grammatikhinweise bleiben als optionale Hinweise erhalten und werden nicht mit der eigentlichen Übersetzung vermischt.
- Die Vorlage enthält sowohl Lernwörter als auch vollständige Beispielsätze. Beide werden als Einträge unterstützt; ihre fachliche Rolle wird zusätzlich durch den Inhaltstyp unterschieden.

## Noch offen – fachliche Entscheidungen

1. Organisation der Inhalte, zum Beispiel Themen, Kapitel, Niveau und Tags
2. Lernmodi und Ablauf einer Übung
3. Bewertung einer Antwort und Umgang mit Fehlern
4. Wiederholungssystem oder zunächst einfache zufällige Auswahl
5. Benutzerkonten und persönlicher Lernfortschritt
6. Freigabe-/Veröffentlichungsstatus von Inhalten
7. Umgang mit Audio und automatischer Sprachausgabe
8. Umfang und Bedienung des Admin-Bereichs
9. Format der strukturierten Speicherung, zum Beispiel JSON-Datei oder Datenbank
10. Umgang mit unklaren oder mehrfach möglichen Übersetzungen

## Arbeitsannahmen für die Diskussion

- Für ein erstes MVP sollte der Fokus auf textbasierten Lernkarten und einer schnellen Inhaltspflege liegen.
- Ein komplexes Spaced-Repetition-System kann zunächst durch eine einfache Wiederholungslogik ersetzt werden.
- Eine Trennung zwischen redaktionell gepflegten Inhalten und persönlichem Lernfortschritt ist sinnvoll, falls mehrere Lernende unterstützt werden sollen.
- Hinweise werden standardmäßig erst nach der eigenen Übersetzungsleistung angeboten.
