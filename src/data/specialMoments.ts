export type SpecialMomentId = 'what_is_missing' | 'improve_prompt' | 'dangerous_detail';

export interface SpecialMoment {
  id: SpecialMomentId;
  afterGuidedRound: number;
  title: string;
  prompt: string;
  facilitatorCue: string;
  screenContent: string[];
  suggestedAnswers: string[];
}

export const SPECIAL_MOMENTS: SpecialMoment[] = [
  {
    id: 'what_is_missing',
    afterGuidedRound: 2,
    title: 'Vad saknas?',
    prompt: 'Vad behöver läggas till för att prompten ska bli riktigt användbar?',
    facilitatorCue: 'Ropa ut svar tillsammans. Vi samlar 2–3 förslag innan facit visas.',
    screenContent: [
      'Sammanfatta avsnittet nedan i tre punkter för en medborgare.',
      'Använd bara information från texten.',
    ],
    suggestedAnswers: [
      'Önskat format är för tunt beskrivet.',
      'Ingen instruktion om vad som ska kontrolleras manuellt.',
      'Ingen tydlig längd, ton eller osäkerhetshantering.',
    ],
  },
  {
    id: 'improve_prompt',
    afterGuidedRound: 3,
    title: 'Förbättra prompten',
    prompt: 'Hur skulle ni förbättra den här prompten innan ni skickar den?',
    facilitatorCue: 'Föreslå muntliga förbättringar. Vi bygger sedan upp en bättre prompt tillsammans.',
    screenContent: [
      'Skriv om texten så att den blir tydligare.',
    ],
    suggestedAnswers: [
      'Ange målgrupp, till exempel medborgare utan förkunskaper.',
      'Ge en tydlig källa och säg att betydelsen inte får ändras.',
      'Be om konkret format, till exempel rubrik plus tre korta punkter.',
      'Be om en kort lista över vad som fortfarande bör faktakollas.',
    ],
  },
  {
    id: 'dangerous_detail',
    afterGuidedRound: 4,
    title: 'Farlig detalj',
    prompt: 'Vilken detalj här borde få er att stanna upp och kontrollera svaret manuellt?',
    facilitatorCue: 'Peka ut varningssignalen tillsammans innan svaret visas.',
    screenContent: [
      'Copilot svarar:',
      '"Antalet digitala ärenden ökade med 18 procent under året, vilket visar att myndigheten redan har nått sitt mål."',
    ],
    suggestedAnswers: [
      'Siffran måste kontrolleras mot källan.',
      'Påståendet om att målet är nått kan vara en tolkning som inte stöds av texten.',
      'Ordet "visar" låter säkrare än underlaget kanske medger.',
    ],
  },
];
