import { ChevronLeft, Zap, Users, Lightbulb, Target, Clock } from 'lucide-react';

interface RulesScreenProps {
  onBack: () => void;
}

export default function RulesScreen({ onBack }: RulesScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 lg:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          Tillbaka
        </button>

        <h1 className="text-4xl font-bold text-white mb-2">Spelets Regler</h1>
        <p className="text-slate-400 mb-8">Allt du behöver veta för att spela Prompt-Jeopardy</p>

        <div className="space-y-8">
          {/* Objective */}
          <section className="bg-slate-800/80 rounded-lg p-6 border border-blue-500/30 backdrop-blur space-y-3">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Target size={24} className="text-blue-400" />
              Spelets Mål
            </h2>
            <p className="text-slate-200">
              Alla team arbetar tillsammans mot ett gemensamt poängmål (standard: 1600 poäng). Det handlar INTE om att vinna varandra — det är ett samarbetsspel där alla lyckas tillsammans eller misslyckas tillsammans.
            </p>
            <p className="text-slate-300 text-sm">
              När det gemensamma poängmålet nås, firar alla team tillsammans!
            </p>
          </section>

          {/* The Board */}
          <section className="bg-slate-800/80 rounded-lg p-6 border border-emerald-500/30 backdrop-blur space-y-3">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Lightbulb size={24} className="text-emerald-400" />
              Spelbrädet
            </h2>
            <p className="text-slate-200 mb-4">
              Brädet innehåller 25 uppgifter (rutor) sorterade i 3 svårighetskategorier:
            </p>
            <div className="space-y-3">
              <div className="pl-4 border-l-4 border-emerald-500">
                <h3 className="font-semibold text-emerald-300">Grund (100-200 poäng)</h3>
                <p className="text-sm text-slate-300">Grundläggande AI-promptning. Bra startpunkt för att förstå systemet.</p>
              </div>
              <div className="pl-4 border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-300">Fördjupning (200-400 poäng)</h3>
                <p className="text-sm text-slate-300">Mer avancerade uppgifter som kräver djupare kunskap och experiment.</p>
              </div>
              <div className="pl-4 border-l-4 border-violet-500">
                <h3 className="font-semibold text-violet-300">Skapa nytt (300-400 poäng)</h3>
                <p className="text-sm text-slate-300">Kreativa uppgifter. Högsta poängen men ofta mest öppen tolkning.</p>
              </div>
            </div>
          </section>

          {/* Game Flow */}
          <section className="bg-slate-800/80 rounded-lg p-6 border border-amber-500/30 backdrop-blur space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Clock size={24} className="text-amber-400" />
              Spelets Flöde
            </h2>
            <p className="text-slate-200 mb-4">
              Varje runda följer 4 enkla steg som upprepa tills poängmålet nås:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 font-bold text-white text-lg">A</div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Välj Startämne</h3>
                  <p className="text-slate-300 text-sm mt-1">Ett team väljer en ospelad ruta genom att slumpa eller klicka. Systemet visar en rolig animering när rutan väljs.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 font-bold text-white text-lg">B</div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Arbete i Par</h3>
                  <p className="text-slate-300 text-sm mt-1">Teamet arbetar tillsammans på uppgiften under en timer (ofta 5-10 minuter). De kan använda AI, google, diskutera — allt för att lösa uppgiften.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 font-bold text-white text-lg">C</div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Presentering</h3>
                  <p className="text-slate-300 text-sm mt-1">Ett par (kan vara samma team eller annat) presenterar sitt arbete. Systemet guidar med 3 frågor: Vad försökte ni? Vad gick snett? Vad ändrade ni?</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0 font-bold text-white text-lg">D</div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Nästa Ruta</h3>
                  <p className="text-slate-300 text-sm mt-1">Nästa team väljer nästa ruta, och processen börjar om. Poängen läggs till det gemensamma målet.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Setup Options */}
          <section className="bg-slate-800/80 rounded-lg p-6 border border-slate-700/50 backdrop-blur space-y-3">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users size={24} className="text-slate-400" />
              Spelinställningar
            </h2>
            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <h3 className="font-semibold text-white mb-1">Antal Par</h3>
                <p>Hur många team/par spelar? (2-8 rekommenderas)</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Parnamn</h3>
                <p>Valfritt: ge varje par ett eget namn. Systemet auto-genererar "Par 1, Par 2..." om du lämnar tomt.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Målpoäng</h3>
                <p>Det gemensamma poängmål som alla team arbetar mot. Standard: 1600. En kort workshop kan vara 800-1200, långare 1600-2000.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Runda-Timer</h3>
                <p>Hur många minuter varje par får arbeta på sin uppgift. Standard: 7 minuter. Kortare session: 5 min, längre: 10 min.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Undvik Repetering</h3>
                <p>Om aktiverad: samma par presenterar aldrig två uppgifter i rad. Gör det mer varierat och involverar fler personer.</p>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section className="bg-slate-800/80 rounded-lg p-6 border border-yellow-500/30 backdrop-blur space-y-3">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap size={24} className="text-yellow-400" />
              Tips för Framgång
            </h2>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-2">
                <span className="text-yellow-400 font-bold">•</span>
                <span><strong>Börja lätt:</strong> Välj "Grund"-rutor första rundan för att förstå systemet.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400 font-bold">•</span>
                <span><strong>Experimentera:</strong> AI-promptning handlar om iteration. Försök olika sätt att formulera.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400 font-bold">•</span>
                <span><strong>Lyssna på feedback:</strong> Andra teams presentationer ger ofta goda idéer för framtida rundor.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400 font-bold">•</span>
                <span><strong>Balansera strategi:</strong> Högt värderade rutor kan vara svårare. Blanda lätt och svårt för säker progression.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400 font-bold">•</span>
                <span><strong>Ha roligt:</strong> Det är ett workshop-spel — fokus ligger på att lära och experimentera tillsammans!</span>
              </li>
            </ul>
          </section>

          {/* Footer */}
          <button
            onClick={onBack}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Starta Spel
          </button>
        </div>
      </div>
    </div>
  );
}
