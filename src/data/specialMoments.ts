export type SpecialMomentId = 'what_is_missing' | 'improve_prompt' | 'dangerous_detail';

export interface SpecialMoment {
  id: SpecialMomentId;
  afterGuidedRound: number;
  title: string;
  prompt: string;
  taskSteps: string[];
  contentLabel: string;
  facilitatorCue: string;
  screenContent: string[];
  suggestedAnswers: string[];
}

export const SPECIAL_MOMENTS: SpecialMoment[] = [
  {
    id: 'what_is_missing',
    afterGuidedRound: 2,
    title: 'Vad saknas i prompten?',
    prompt: 'Ni ska inte svara på prompten. Granska hur den är skriven och gör den tydligare och säkrare att använda.',
    taskSteps: [
      'Läs den ofullständiga prompten.',
      'Hitta 2–3 instruktioner som saknas.',
      'Förklara hur varje tillägg skulle förbättra svaret.',
    ],
    contentLabel: 'Avsiktligt ofullständig prompt',
    facilitatorCue: 'Diskutera kort med personen bredvid. Ropa sedan ut 2–3 konkreta tillägg innan facit visas.',
    screenContent: [
      'Sammanfatta avsnittet nedan i tre punkter för en medborgare.',
      'Använd bara information från texten.',
    ],
    suggestedAnswers: [
      'Ange önskad längd och ton för de tre punkterna.',
      'Be Copilot markera påståenden som är osäkra eller saknar tydligt stöd.',
      'Be om en kort lista över vad som ska kontrolleras manuellt.',
    ],
  },
  {
    id: 'improve_prompt',
    afterGuidedRound: 3,
    title: 'Förbättra prompten',
    prompt: 'Ni ska inte skriva om någon text ännu. Förbättra själva instruktionen så att två personer kan använda den och få liknande resultat.',
    taskSteps: [
      'Läs den vaga prompten.',
      'Föreslå 2–3 konkreta tillägg eller ändringar.',
      'Formulera tillsammans en bättre version av hela prompten.',
    ],
    contentLabel: 'Avsiktligt vag prompt',
    facilitatorCue: 'Diskutera kort i par. Ropa sedan ut konkreta formuleringar som kan byggas ihop till en bättre prompt.',
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
    prompt: 'Ni ska inte avgöra om svaret är sant. Hitta sådant som måste kontrolleras mot källan innan någon använder slutsatsen.',
    taskSteps: [
      'Läs det fiktiva Copilot-svaret.',
      'Peka ut minst två uppgifter eller formuleringar som behöver kontrolleras.',
      'Förklara vilken risk det innebär att använda dem utan kontroll.',
    ],
    contentLabel: 'Fiktivt Copilot-svar att granska',
    facilitatorCue: 'Diskutera kort i par. Peka sedan ut varningssignalerna och varför de är riskabla innan facit visas.',
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
