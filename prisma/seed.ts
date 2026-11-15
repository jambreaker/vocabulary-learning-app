import { prisma } from "@/lib/prisma";

/**
 * Bereinigter Vokabelbestand "Pick-up A - I'm from Greenwich".
 *
 * Quelle: docs/IMG_4597.jpeg - docs/IMG_4599.jpeg (siehe docs/fachkonzept.md,
 * Abschnitt 3 und 5 fuer Herkunft und Normalisierungsregeln). OCR-/
 * Transkriptionsfehler wurden korrigiert, Ausspracheangaben in IPA normiert.
 * Ausnahme: die deutschen Zahlwoerter (fuenf-zwoelf) standen nicht lesbar in
 * der Vorlage und wurden ergaenzt, da sie eindeutig sind.
 */
const cards: Array<{
  englishText: string;
  pronunciation?: string;
  germanTranslations: string[];
  hint?: string;
}> = [
  {
    englishText: "I'm from Greenwich.",
    pronunciation: "/aɪm frəm ˈgrenɪdʒ/",
    germanTranslations: ["Ich bin aus Greenwich."],
  },
  {
    englishText: "Look!",
    pronunciation: "/lʊk/",
    germanTranslations: ["Schau mal!", "Schaut mal!"],
    hint: "Look, a boy and a dog!",
  },
  {
    englishText: "two boys and a dog",
    pronunciation: "/tuː bɔɪz ənd ə dɒg/",
    germanTranslations: ["zwei Jungen und ein Hund"],
    hint: "Look! Two boys and a dog in Greenwich Park.",
  },
  {
    englishText: "in Greenwich Park",
    pronunciation: "/ɪn ˈgrenɪdʒ pɑːk/",
    germanTranslations: ["im Greenwich-Park"],
  },
  {
    englishText: "Dogs are my friends, but not cats.",
    pronunciation: "/dɒgz ɑː maɪ frendz bʌt nɒt kæts/",
    germanTranslations: ["Hunde sind meine Freunde, aber Katzen nicht."],
  },
  {
    englishText: "I'm a mouse.",
    pronunciation: "/aɪm ə maʊs/",
    germanTranslations: ["Ich bin eine Maus."],
  },
  {
    englishText: "mouse (mice)",
    pronunciation: "/maʊs; maɪs/",
    germanTranslations: ["Maus/Mäuse"],
    hint: "one mouse - two mice",
  },
  {
    englishText: "Here's your ball.",
    pronunciation: "/hɪəz jɔː bɔːl/",
    germanTranslations: ["Hier ist dein Ball."],
    hint: "Here's Luke.",
  },
  {
    englishText: "Hello.",
    pronunciation: "/heˈləʊ/",
    germanTranslations: ["Hallo."],
  },
  {
    englishText: "Hello, I'm Pia.",
    pronunciation: "/heˈləʊ aɪm ˈpiːə/",
    germanTranslations: ["Ich heiße Pia.", "Ich bin Pia."],
  },
  {
    englishText: "You're a nice dog.",
    pronunciation: "/jɔːr ə naɪs dɒg/",
    germanTranslations: ["Du bist ein lieber Hund."],
  },
  {
    englishText: "What's your name?",
    pronunciation: "/wɒts jɔː neɪm/",
    germanTranslations: ["Wie heißt du?", "Wie heißen Sie?"],
    hint: "What's your name? - I'm Olivia.",
  },
  {
    englishText: "Sorry!",
    pronunciation: "/ˈsɒri/",
    germanTranslations: ["Entschuldigung!", "Tut mir leid!"],
  },
  {
    englishText: "My dog is crazy.",
    pronunciation: "/maɪ dɒg ɪz ˈkreɪzi/",
    germanTranslations: ["Mein Hund ist verrückt."],
    hint: "My dog is nice, but crazy!",
  },
  {
    englishText: "My name is Luke.",
    pronunciation: "/maɪ neɪm ɪz luːk/",
    germanTranslations: ["Ich heiße Luke."],
  },
  {
    englishText: "We're from Greenwich.",
    pronunciation: "/wɪə frəm ˈgrenɪdʒ/",
    germanTranslations: ["Wir sind aus Greenwich."],
    hint: "Luke is from Greenwich.",
  },
  {
    englishText: "Where are you from?",
    pronunciation: "/weər ɑː juː frɒm/",
    germanTranslations: [
      "Woher kommst du?",
      "Woher kommt ihr?",
      "Woher kommen Sie?",
    ],
    hint: "We're from Greenwich.",
  },
  {
    englishText: "Are you on holiday?",
    pronunciation: "/ɑː juː ɒn ˈhɒlədeɪ/",
    germanTranslations: [
      "Sind Sie im Urlaub?",
      "Seid ihr im Urlaub?",
      "Bist du im Urlaub?",
    ],
    hint: "Pia is on holiday in London.",
  },
  {
    englishText: "I'm here with my parents.",
    pronunciation: "/aɪm hɪə wɪð maɪ ˈpeərənts/",
    germanTranslations: ["Ich bin mit meinen Eltern hier."],
    hint: "Fr. parents (m); Lat. parentes (m)",
  },
  {
    englishText: "How old are you?",
    pronunciation: "/haʊ əʊld ɑː juː/",
    germanTranslations: ["Wie alt bist du?", "Wie alt sind Sie?"],
    hint: "! Achte auf die Verbindung zwischen den Wörtern beim Sprechen.",
  },
  {
    englishText: "You too?",
    pronunciation: "/juː tuː/",
    germanTranslations: ["Du auch?"],
    hint: "! Satzstellung: Are you ten too, Luke?",
  },
  {
    englishText: "no",
    pronunciation: "/nəʊ/",
    germanTranslations: ["nein"],
  },
  {
    englishText: "yes",
    pronunciation: "/jes/",
    germanTranslations: ["ja"],
  },
  {
    englishText: "German",
    pronunciation: "/ˈdʒɜːmən/",
    germanTranslations: [
      "deutsch",
      "Deutsch",
      "aus Deutschland",
      "Deutsche/-r",
    ],
    hint: "I'm from Germany.\n! Achtung Aussprache.\nAre you German? - Yes, I'm from Cologne.",
  },
  {
    englishText: "different",
    pronunciation: "/ˈdɪfrənt/",
    germanTranslations: ["anders", "unterschiedlich", "verschieden"],
    hint: "Dogs and cats are different.\nFr. différent/-e; Lat. differens",
  },
  {
    englishText: "I'm English.",
    pronunciation: "/aɪm ˈɪŋglɪʃ/",
    germanTranslations: ["Ich bin Engländer.", "Ich bin Engländerin."],
    hint: "Are you English? - No, I'm German.",
  },
  {
    englishText: "I love dogs.",
    pronunciation: "/aɪ lʌv dɒgz/",
    germanTranslations: ["Ich liebe Hunde.", "Ich mag Hunde total gern."],
  },
  {
    englishText: "Dogs love squirrels.",
    pronunciation: "/dɒgz lʌv ˈskwɪrəlz/",
    germanTranslations: ["Hunde lieben Eichhörnchen."],
    hint: "Look, a squirrel! I love squirrels.",
  },
  {
    englishText: "That was close!",
    pronunciation: "/ðæt wɒz kləʊs/",
    germanTranslations: ["Das war knapp!"],
  },
  {
    englishText: "animal",
    pronunciation: "/ˈænɪməl/",
    germanTranslations: ["Tier"],
    hint: "Cats and dogs are animals.\nFr. animal (m); Lat. animal (nt)",
  },
  {
    englishText: "Thank you.",
    pronunciation: "/ˈθæŋk juː/",
    germanTranslations: ["Danke."],
    hint: "Here's your ball. - Oh, thank you.",
  },
  {
    englishText: "This is Pia.",
    pronunciation: "/ðɪs ɪz ˈpiːə/",
    germanTranslations: ["Das (hier) ist Pia."],
  },
  {
    englishText: "a girl from Germany",
    pronunciation: "/ə gɜːl frəm ˈdʒɜːməni/",
    germanTranslations: ["ein Mädchen aus Deutschland"],
    hint: "Is Olivia a girl from Germany? - No, Olivia is from Greenwich.",
  },
  {
    englishText: "school",
    pronunciation: "/skuːl/",
    germanTranslations: ["Schule"],
    hint: "Pia is a girl from school. - No, Pia is a girl from Germany.",
  },
  {
    englishText: "Greenwich Park is big.",
    pronunciation: "/ˈgrenɪdʒ pɑːk ɪz bɪg/",
    germanTranslations: ["Der Greenwich-Park ist groß."],
    hint: "Sherlock is a big dog.",
  },
  {
    englishText: "It's great for cycling.",
    pronunciation: "/ɪts greɪt fə ˈsaɪklɪŋ/",
    germanTranslations: ["Er ist super zum Radfahren."],
    hint: "Cycling is great in Greenwich Park.",
  },
  {
    englishText: "I don't like cycling.",
    pronunciation: "/aɪ dəʊnt laɪk ˈsaɪklɪŋ/",
    germanTranslations: ["Ich fahre nicht gern Rad."],
    hint: "I don't like cats, but I like Luke!",
  },
  {
    englishText: "My favourite sport is football.",
    pronunciation: "/maɪ ˈfeɪvərɪt spɔːt ɪz ˈfʊtbɔːl/",
    germanTranslations: ["Mein Lieblingssport ist Fußball."],
    hint: "My favourite animals are dogs.",
  },
  {
    englishText: "I like the boating lake.",
    pronunciation: "/aɪ laɪk ðə ˈbəʊtɪŋ leɪk/",
    germanTranslations: [
      "Ich mag den See mit den Booten.",
      "Mir gefällt der See mit den Booten.",
    ],
  },
  {
    englishText: "five",
    pronunciation: "/faɪv/",
    germanTranslations: ["fünf"],
  },
  {
    englishText: "six",
    pronunciation: "/sɪks/",
    germanTranslations: ["sechs"],
  },
  {
    englishText: "seven",
    pronunciation: "/ˈsevn/",
    germanTranslations: ["sieben"],
  },
  {
    englishText: "eight",
    pronunciation: "/eɪt/",
    germanTranslations: ["acht"],
  },
  {
    englishText: "nine",
    pronunciation: "/naɪn/",
    germanTranslations: ["neun"],
  },
  {
    englishText: "ten",
    pronunciation: "/ten/",
    germanTranslations: ["zehn"],
  },
  {
    englishText: "eleven",
    pronunciation: "/ɪˈlevn/",
    germanTranslations: ["elf"],
  },
  {
    englishText: "twelve",
    pronunciation: "/twelv/",
    germanTranslations: ["zwölf"],
  },
  {
    englishText: "word",
    pronunciation: "/wɜːd/",
    germanTranslations: ["Wort"],
    hint: "'Squirrel' is the English word for 'Eichhörnchen.'",
  },
  {
    englishText: "What's that?",
    pronunciation: "/wɒts ðæt/",
    germanTranslations: ["Was ist das?"],
    hint: "A squirrel? What's that?",
  },
  {
    englishText: "Let's go!",
    pronunciation: "/lets gəʊ/",
    germanTranslations: ["Lass uns hingehen!", "Los, gehen wir hin!"],
    hint: "A boating lake? Great, let's go!",
  },
  {
    englishText: "It's fun.",
    pronunciation: "/ɪts fʌn/",
    germanTranslations: ["Es macht Spaß."],
    hint: "Football is fun! - Cycling too.",
  },
  {
    englishText: "rat",
    pronunciation: "/ræt/",
    germanTranslations: ["Ratte"],
    hint: "I don't like rats.\nFr. rat (m)",
  },
  {
    englishText: "I'm not scared of dogs.",
    pronunciation: "/aɪm nɒt skeəd əv dɒgz/",
    germanTranslations: ["Ich habe keine Angst vor Hunden."],
    hint: "Are you scared of rats? I'm not.",
  },
  {
    englishText: "I'm scared of cats.",
    pronunciation: "/aɪm skeəd əv kæts/",
    germanTranslations: ["Ich habe Angst vor Katzen."],
  },
  {
    englishText: "Worms are OK.",
    pronunciation: "/wɜːmz ɑːr əʊˈkeɪ/",
    germanTranslations: ["Würmer sind o.k."],
    hint: "Football is OK.",
  },
  {
    englishText: "Rabbits are nice.",
    pronunciation: "/ˈræbɪts ɑː naɪs/",
    germanTranslations: ["Kaninchen sind nett."],
  },
  {
    englishText: "They're my friends.",
    pronunciation: "/ðeə maɪ frendz/",
    germanTranslations: ["Sie sind meine Freunde."],
    hint: "Are Olivia and Dave OK? - Yes, they're my friends!",
  },
  {
    englishText: "They don't eat mice.",
    pronunciation: "/ðeɪ dəʊnt iːt maɪs/",
    germanTranslations: ["Sie essen keine Mäuse."],
  },
];

/** Lektion "Pick-up B - This is fun!" (Vorlage: Schulbuchseiten, Fotos vom 15.11.2026). */
const funCards: typeof cards = [
  { englishText: "day", pronunciation: "/deɪ/", germanTranslations: ["Tag"], hint: "It's a nice day for the boating lake. - OK, let's go to the park." },
  { englishText: "happy", pronunciation: "/ˈhæpi/", germanTranslations: ["glücklich", "froh", "fröhlich"], hint: "Lou is happy." },
  { englishText: "skates (pl)", pronunciation: "/skeɪts/", germanTranslations: ["Inlineskates", "Rollschuhe", "Schlittschuhe"] },
  { englishText: "can't", pronunciation: "/kɑːnt/", germanTranslations: ["kann nicht", "können nicht"], hint: "Where's Mr Fluff? I can't see him.\n! Achtung Aussprache: can /æ/ - can't /ɑː/" },
  { englishText: "to meet", pronunciation: "/miːt/", germanTranslations: ["treffen", "sich treffen"], hint: "Where can I meet you? - Let's meet in the park." },
  { englishText: "to show", pronunciation: "/ʃəʊ/", germanTranslations: ["zeigen"], hint: "Please show me your new skates." },
  { englishText: "game", pronunciation: "/geɪm/", germanTranslations: ["Spiel"] },
  { englishText: "to want (to)", pronunciation: "/ˈwɒnt tə/", germanTranslations: ["wollen", "mögen"], hint: "I want to play a game." },
  { englishText: "to play", pronunciation: "/pleɪ/", germanTranslations: ["spielen"], hint: "Let's play football. - No, let's play a different game." },
  { englishText: "boring", pronunciation: "/ˈbɔːrɪŋ/", germanTranslations: ["langweilig"], hint: "That's boring! ↔ That's fun!" },
  { englishText: "You're into sports.", pronunciation: "/jɔːr ˌɪntə ˈspɔːts/", germanTranslations: ["Du magst doch Sport.", "Du stehst doch auf Sport."], hint: "You're into computer games? I'm into inline skating." },
  { englishText: "Try skating!", pronunciation: "/ˌtraɪ ˈskeɪtɪŋ/", germanTranslations: ["Versuch es mal mit Inlineskating.", "Probier mal Inlineskating."] },
  { englishText: "to skate", pronunciation: "/skeɪt/", germanTranslations: ["Inlineskates fahren", "Schlittschuh laufen"], hint: "to skate → skates → skating" },
  { englishText: "fast", pronunciation: "/fɑːst/", germanTranslations: ["schnell"], hint: "Not so fast, Olivia! Skating isn't easy." },
  { englishText: "so", pronunciation: "/səʊ/", germanTranslations: ["so", "also"], hint: "I like rabbits. They're so quiet." },
  { englishText: "I'm sorry!", pronunciation: "/ˌaɪm ˈsɒri/", germanTranslations: ["Tut mir leid!"] },
  { englishText: "I'm fine.", pronunciation: "/ˌaɪm ˈfaɪn/", germanTranslations: ["Mir geht's gut."], hint: "= I'm OK." },
  { englishText: "cute", pronunciation: "/kjuːt/", germanTranslations: ["niedlich", "süß"], hint: "I like Lou. She's so cute!" },
  { englishText: "lucky charm", pronunciation: "/ˌlʌki ˈtʃɑːm/", germanTranslations: ["Glücksbringer", "Talisman"], hint: "Holly's lucky charm is pink." },
  { englishText: "text message", pronunciation: "/ˈtekst ˌmesɪdʒ/", germanTranslations: ["SMS", "Kurznachricht"], hint: "! Du kannst text message sagen oder einfach text." },
  { englishText: "reading", pronunciation: "/ˈriːdɪŋ/", germanTranslations: ["Lesen"], hint: "reading → to read" },
  { englishText: "music", pronunciation: "/ˈmjuːzɪk/", germanTranslations: ["Musik"], hint: "! Achtung Aussprache.\nFr. musique (f); Lat. musica (f)" },
  { englishText: "to paint", pronunciation: "/peɪnt/", germanTranslations: ["anmalen", "malen"] },
  { englishText: "to go swimming", pronunciation: "/ˌgəʊ ˈswɪmɪŋ/", germanTranslations: ["Schwimmen gehen"], hint: "Let's go swimming. Swimming is fun. - I like it too." },
  { englishText: "to read", pronunciation: "/riːd/", germanTranslations: ["lesen"], hint: "This text is in English. Can you read it?" },
  { englishText: "book", pronunciation: "/bʊk/", germanTranslations: ["Buch"] },
  { englishText: "to take photos", pronunciation: "/ˌteɪk ˈfəʊtəʊz/", germanTranslations: ["fotografieren", "Fotos machen"], hint: "Please take a photo of me!" },
  {
    englishText: "to watch",
    pronunciation: "/wɒtʃ/",
    germanTranslations: ["beobachten", "(sich) ansehen", "zuschauen"],
    hint: "! Beachte den Unterschied: Help! I can see a mouse! = sehen\nLet's look at your photos. = anschauen\nHey, Olivia, I can skate! Watch! = zuschauen",
  },
  { englishText: "card", pronunciation: "/kɑːd/", germanTranslations: ["Karte", "Spielkarte"], hint: "Let's play cards." },
  { englishText: "magazine", pronunciation: "/ˌmægəˈziːn/", germanTranslations: ["Zeitschrift"], hint: "Fr. magazine (m)" },
  { englishText: "to watch TV", pronunciation: "/ˌwɒtʃ tiːˈviː/", germanTranslations: ["fernsehen"], hint: "Let's watch TV." },
  { englishText: "DVD", pronunciation: "/ˌdiːviːˈdiː/", germanTranslations: ["DVD"] },
  { englishText: "bike", pronunciation: "/baɪk/", germanTranslations: ["Fahrrad"] },
  { englishText: "silly", pronunciation: "/ˈsɪli/", germanTranslations: ["dumm", "doof", "albern"], hint: "That's a silly game!" },
];

async function main() {
  const topic = await prisma.topic.upsert({
    where: { id: "pick-up-a-greenwich" },
    update: {
      title: "Pick-up A – I'm from Greenwich",
    },
    create: {
      id: "pick-up-a-greenwich",
      title: "Pick-up A – I'm from Greenwich",
    },
  });

  await prisma.vocabularyCard.deleteMany({ where: { topicId: topic.id } });

  await prisma.vocabularyCard.createMany({
    data: cards.map((card) => ({
      topicId: topic.id,
      englishText: card.englishText,
      pronunciation: card.pronunciation,
      germanTranslations: card.germanTranslations,
      hint: card.hint,
    })),
  });

  const funTopic = await prisma.topic.upsert({
    where: { id: "pick-up-b-this-is-fun" },
    update: { title: "This is fun!" },
    create: { id: "pick-up-b-this-is-fun", title: "This is fun!" },
  });

  await prisma.vocabularyCard.deleteMany({ where: { topicId: funTopic.id } });

  await prisma.vocabularyCard.createMany({
    data: funCards.map((card) => ({
      topicId: funTopic.id,
      englishText: card.englishText,
      pronunciation: card.pronunciation,
      germanTranslations: card.germanTranslations,
      hint: card.hint,
    })),
  });

  console.log(
    `Seed abgeschlossen: Thema "${topic.title}" mit ${cards.length} Lernkarten, Thema "${funTopic.title}" mit ${funCards.length} Lernkarten.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
