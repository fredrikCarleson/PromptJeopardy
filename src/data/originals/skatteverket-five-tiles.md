# Historiska originalrutor (Skatteverket)

Fem rutor byttes 16 september 2026 mot mer IT-anpassade uppgifter. Det här dokumentet är bara ett arkiv. Den aktiva datan ligger i `src/data/tiles.ts` och `QUESTIONS.md`.

Om rutorna ska läggas tillbaka: kopiera objekten nedan till motsvarande `id` i `src/data/tiles.ts` och återställ avsnitten i `QUESTIONS.md`. Uppdatera därefter den rekommenderade 60-minutersbanan i `README.md` så att runda 2 åter blir `Färdigt informationsblad i Word`.

| Id | Kategori | Poäng | Originaltitel | Ersatt av |
| --- | --- | --- | --- | --- |
| 4 | Förstå rapporten | 400 | Hitta relaterat arbetsmaterial | Kreativa förslag på retrospektivupplägg |
| 5 | Förstå rapporten | 500 | Ledningsbrief från flera källor | Bryt ner en user story |
| 9 | Klarspråk | 400 | Färdigt informationsblad i Word | Copilot som sparringpartner |
| 13 | Analysera | 300 | Jämför filer från OneDrive eller SharePoint | Skapa förslag på testfall |
| 14 | Analysera | 400 | Kalla fakta-frågor med arbetskontext | Generera kod |

Id 9 ingick i den rekommenderade 60-minutersbanan (`GUIDED_WORKSHOP_TILE_IDS`).

## Original i QUESTIONS.md-format

### Förstå rapporten · 400 poäng: Hitta relaterat arbetsmaterial

- Kort etikett: Sök kontext
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat -> OneDrive/SharePoint/Search
- Uppgift: Be Copilot Chat hitta dokument, presentationer, mejl eller Teams-material som ni har tillgång till och som kan ge kontext till ett område i årsredovisningen, till exempel service, digitalisering, kontroll, folkbokföring eller tillgänglighet. Välj ett hittat material och be Copilot Chat förklara hur det relaterar till årsredovisningen.
- Avgränsa källan: Använd en tydlig sökfråga och högst ett eller två dokument som Copilot hittar i er M365-miljö.
- Lärandemål: Förstå att M365 Copilot Chat kan använda arbetskontext som filer, mejl, möten och delade dokument när användaren har behörighet.
- Reflektionsfrågor:
  - Vad bad ni Copilot leta efter?
  - Vilket dokument eller material hittade Copilot?
  - Hur märktes det att Copilot använde arbetskontext och inte bara allmän kunskap?

### Förstå rapporten · 500 poäng: Ledningsbrief från flera källor

- Kort etikett: Flerkällsbrief
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat -> OneDrive/SharePoint
- Uppgift: Välj ett utdrag ur årsredovisningen och komplettera med ett dokument från OneDrive eller SharePoint som ni har tillgång till. Be Copilot Chat skapa en muntlig ledningsbrief på en minut med läge, viktigaste resultat, risk och en rekommenderad följdfråga.
- Avgränsa källan: Använd ett kort utdrag ur årsredovisningen och ett relevant internt eller delat dokument.
- Lärandemål: Träna på att kombinera årsredovisningen med arbetsmaterial och samtidigt be om källmedveten sammanfattning.
- Reflektionsfrågor:
  - Vilka två källor använde ni?
  - Vad blev bättre när Copilot fick arbetskontext?
  - Vilken del behövde ni faktakolla manuellt?

### Klarspråk · 400 poäng: Färdigt informationsblad i Word

- Kort etikett: Word-fil
- Verktyg: Copilot i Word
- Appfokus: Word Agent / Copilot i Word
- Uppgift: Årsredovisningen och klarspråksdokumentet är redan tillgängliga. Välj 2-3 sidor om ett ämne som är relevant för medborgare. Använd Word Agent eller Copilot i Word för att skapa ett färdigt informationsblad på högst en sida. Öppna dokumentet, faktakontrollera det och förbättra minst en formulering.
- Avgränsa källan: Använd bara de valda sidorna och klarspråksdokumentet. Ange sidnummer i dokumentet.
- Klart tidigt: Be Copilot markera den minst begripliga formuleringen. Förbättra den sedan själva.
- Lärandemål: Visa att Copilot kan skapa en riktig Office-fil från källmaterial och att resultatet behöver mänsklig redigering.
- Reflektionsfrågor:
  - Visa Word-filen och beskriv vem den är skriven för.
  - Vilken formulering eller uppgift förbättrade ni manuellt?
  - Hur kontrollerade ni att innehållet stämde med källan?

### Analysera · 300 poäng: Jämför filer från OneDrive eller SharePoint

- Kort etikett: Filjämförelse
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat -> OneDrive/SharePoint
- Uppgift: Be Copilot Chat referera upp till fem filer i OneDrive eller SharePoint som ni har tillgång till, till exempel två versioner av ett dokument, en rapport och en presentation, eller flera underlag inom samma område. Be Copilot Chat jämföra dem och hitta viktigaste likheter, skillnader och möjliga konflikter.
- Avgränsa källan: Använd högst fem filer och välj dokument som ni har rätt att använda i övningen.
- Lärandemål: Visa att Copilot Chat kan använda filer från OneDrive/SharePoint som arbetskontext utan att deltagarna öppnar och läser allt manuellt.
- Reflektionsfrågor:
  - Vilka filer jämförde ni?
  - Vilka skillnader eller konflikter hittade Copilot?
  - Hur kontrollerade ni att jämförelsen var rimlig?

### Analysera · 400 poäng: Kalla fakta-frågor med arbetskontext

- Kort etikett: Granskning+
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat -> arbetskontext
- Uppgift: Välj ett avsnitt i årsredovisningen och, om möjligt, ett relaterat internt dokument eller mejl som Copilot Chat hittar. Be Copilot Chat formulera tre granskande frågor som en journalist skulle kunna ställa, med tydlig koppling till källorna.
- Avgränsa källan: Använd årsredovisningen plus högst ett extra arbetsmaterial.
- Lärandemål: Öva på rollprompting, arbetskontext och källbunden kritisk analys.
- Reflektionsfrågor:
  - Vilken extra kontext använde ni?
  - Vilken fråga blev skarpast men fortfarande rättvis?
  - Hur bad ni Copilot undvika lösa antaganden?

## Originalobjekt från tiles.ts

```ts
{
  id: 4,
  topic: 'Forsta rapporten',
  points: 400,
  title: 'Hitta relaterat arbetsmaterial',
  shortLabel: 'Sök kontext',
  task: 'Be Copilot Chat hitta dokument, presentationer, mejl eller Teams-material som ni har tillgång till och som kan ge kontext till ett område i årsredovisningen. Välj ett material och be Copilot Chat förklara hur det relaterar till årsredovisningen.',
  presentationSteps: [
    'Be Copilot Chat hitta arbetsmaterial som ger kontext till ett område i årsredovisningen.',
    'Välj ett av materialen som Copilot hittar.',
    'Be Copilot förklara hur materialet relaterar till årsredovisningen.',
  ],
  expectedResult: 'Ett relevant arbetsmaterial och en tydlig koppling till årsredovisningen.',
  toolFocus: 'Microsoft 365 Copilot Chat',
  appFocus: 'Copilot Chat -> OneDrive/SharePoint/Search',
  learningGoal: 'Förstå hur arbetskontext kan ge rikare svar när användaren har behörighet till materialet.',
  sourceInstruction: 'Använd en tydlig sökfråga och högst ett eller två dokument som Copilot hittar i er M365-miljö.',
  verbalPresentationPrompt: [
    'Vad bad ni Copilot leta efter?',
    'Vilket dokument eller material hittade Copilot?',
    'Hur märktes det att Copilot använde arbetskontext och inte bara allmän kunskap?',
  ],
  status: 'unplayed',
}

{
  id: 5,
  topic: 'Forsta rapporten',
  points: 500,
  title: 'Ledningsbrief från flera källor',
  shortLabel: 'Flerkällsbrief',
  task: 'Välj ett utdrag ur årsredovisningen och komplettera med ett dokument från OneDrive eller SharePoint som ni har tillgång till. Be Copilot Chat skapa en muntlig ledningsbrief på en minut med läge, viktigaste resultat, risk och en rekommenderad följdfråga.',
  presentationSteps: [
    'Välj ett kort utdrag ur årsredovisningen.',
    'Komplettera med ett relevant dokument från OneDrive eller SharePoint.',
    'Be Copilot Chat skapa en muntlig ledningsbrief på en minut.',
  ],
  expectedResult: 'En brief med läge, viktigaste resultat, risk och en rekommenderad följdfråga.',
  toolFocus: 'Microsoft 365 Copilot Chat',
  appFocus: 'Copilot Chat -> OneDrive/SharePoint',
  learningGoal: 'Träna på att kombinera rapporttext med arbetsmaterial och ändå be om källmedveten sammanfattning.',
  sourceInstruction: 'Använd ett kort utdrag ur årsredovisningen och ett relevant internt eller delat dokument.',
  verbalPresentationPrompt: [
    'Vilka två källor använde ni?',
    'Vad blev bättre när Copilot fick arbetskontext?',
    'Vilken del behövde ni faktakolla manuellt?',
  ],
  status: 'unplayed',
}

{
  id: 9,
  topic: 'Klarsprak',
  points: 400,
  title: 'Färdigt informationsblad i Word',
  shortLabel: 'Word-fil',
  task: 'Årsredovisningen och klarspråksdokumentet är redan tillgängliga. Välj 2-3 sidor om ett ämne som är relevant för medborgare. Använd Word Agent eller Copilot i Word för att skapa ett färdigt informationsblad på högst en sida. Öppna dokumentet, faktakontrollera det och förbättra minst en formulering.',
  presentationSteps: [
    'Välj 2–3 relevanta sidor ur årsredovisningen.',
    'Skapa ett informationsblad på högst en sida i Word.',
    'Öppna filen, faktakontrollera och förbättra minst en formulering.',
  ],
  expectedResult: 'En öppnad Word-fil med rubrik, ingress, tre huvudbudskap, faktaruta och källhänvisning.',
  toolFocus: 'Copilot i Word',
  appFocus: 'Word Agent / Copilot i Word',
  learningGoal: 'Visa att Copilot kan skapa en riktig Office-fil från källmaterial och att resultatet behöver mänsklig redigering.',
  sourceInstruction: 'Använd bara de valda sidorna och klarspråksdokumentet. Ange sidnummer i dokumentet.',
  bonusChallenge: 'Be Copilot markera den minst begripliga formuleringen. Förbättra den sedan själva.',
  verbalPresentationPrompt: [
    'Visa Word-filen och beskriv vem den är skriven för.',
    'Vilken formulering eller uppgift förbättrade ni manuellt?',
    'Hur kontrollerade ni att innehållet stämde med källan?',
  ],
  status: 'unplayed',
}

{
  id: 13,
  topic: 'Analysera',
  points: 300,
  title: 'Jämför filer från OneDrive eller SharePoint',
  shortLabel: 'Filjämförelse',
  task: 'Be Copilot Chat referera upp till fem filer i OneDrive eller SharePoint som ni har tillgång till, till exempel två versioner av ett dokument eller flera underlag inom samma område. Be Copilot Chat jämföra dem och hitta viktigaste likheter, skillnader och möjliga konflikter.',
  presentationSteps: [
    'Välj upp till fem relevanta filer i OneDrive eller SharePoint.',
    'Be Copilot Chat jämföra filerna.',
    'Be Copilot lyfta det viktigaste i jämförelsen.',
  ],
  expectedResult: 'De viktigaste likheterna, skillnaderna och möjliga konflikterna.',
  toolFocus: 'Microsoft 365 Copilot Chat',
  appFocus: 'Copilot Chat -> OneDrive/SharePoint',
  learningGoal: 'Visa hur filer från arbetskontext kan jämföras utan att deltagarna först öppnar och läser allt manuellt.',
  sourceInstruction: 'Använd högst fem filer och välj dokument som ni har rätt att använda i övningen.',
  verbalPresentationPrompt: [
    'Vilka filer jämförde ni?',
    'Vilka skillnader eller konflikter hittade Copilot?',
    'Hur kontrollerade ni att jämförelsen var rimlig?',
  ],
  status: 'unplayed',
}

{
  id: 14,
  topic: 'Analysera',
  points: 400,
  title: 'Kalla fakta-frågor med arbetskontext',
  shortLabel: 'Granskning+',
  task: 'Välj ett avsnitt i årsredovisningen och, om möjligt, ett relaterat internt dokument eller mejl som Copilot Chat hittar. Be Copilot Chat formulera tre granskande frågor som en journalist skulle kunna ställa, med tydlig koppling till källorna.',
  presentationSteps: [
    'Välj ett avsnitt i årsredovisningen.',
    'Lägg om möjligt till ett relaterat dokument eller mejl.',
    'Be Copilot formulera tre granskande frågor i rollen som journalist.',
  ],
  expectedResult: 'Tre skarpa men rättvisa frågor med tydlig koppling till källorna.',
  toolFocus: 'Microsoft 365 Copilot Chat',
  appFocus: 'Copilot Chat -> arbetskontext',
  learningGoal: 'Öva på rollprompting, arbetskontext och källbunden kritisk analys.',
  sourceInstruction: 'Använd årsredovisningen plus högst ett extra arbetsmaterial.',
  verbalPresentationPrompt: [
    'Vilken extra kontext använde ni?',
    'Vilken fråga blev skarpast men fortfarande rättvis?',
    'Hur bad ni Copilot undvika lösa antaganden?',
  ],
  status: 'unplayed',
}
```
