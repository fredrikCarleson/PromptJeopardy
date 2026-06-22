import { Award, BookOpen, Download, Monitor, Play, Users, Wand2 } from 'lucide-react';
import { downloadQuestionsAsText } from '../utils/exportQuestions';

interface OnboardingScreenProps {
  onStartSetup: () => void;
  onViewRules: () => void;
}

export default function OnboardingScreen({ onStartSetup, onViewRules }: OnboardingScreenProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-white">
      <div className="w-full max-w-5xl space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-black tracking-normal text-yellow-100 lg:text-7xl">Prompt-Jeopardy</h1>
          <p className="mt-4 text-xl text-slate-200">
            Ett gemensamt Jeopardy-spel för att öva prompting med årsredovisning och klarspråk.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Deltagarna arbetar i par på egna datorer. Facilitatorn styr tavlan på stor skärm.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-blue-500/30 bg-slate-900 p-5">
            <Users className="mb-4 h-8 w-8 text-blue-300" />
            <h3 className="text-lg font-bold">25 par</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Alla par arbetar samtidigt med samma valda ruta och lär av varandras promptar.
            </p>
          </div>

          <div className="rounded-lg border border-yellow-500/30 bg-slate-900 p-5">
            <Award className="mb-4 h-8 w-8 text-yellow-200" />
            <h3 className="text-lg font-bold">Gemensamt mål</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Gruppen tävlar tillsammans, inte mot varandra, för att nå ett realistiskt poängmål.
            </p>
          </div>

          <div className="rounded-lg border border-emerald-500/30 bg-slate-900 p-5">
            <Wand2 className="mb-4 h-8 w-8 text-emerald-300" />
            <h3 className="text-lg font-bold">Copilot Chat</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Uppgifterna tränar hur Copilot Chat använder rapporttext, arbetskontext och tydliga instruktioner.
            </p>
          </div>

          <div className="rounded-lg border border-cyan-500/30 bg-slate-900 p-5">
            <Monitor className="mb-4 h-8 w-8 text-cyan-300" />
            <h3 className="text-lg font-bold">Muntlig redovisning</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Appen samlar inte in svar. Paret visar och beskriver resultatet från sin egen dator.
            </p>
          </div>
        </div>

        <section className="rounded-lg border border-blue-500/30 bg-blue-950/40 p-6">
          <h2 className="mb-4 text-2xl font-black text-white">Så fungerar en runda</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ['1', 'Starta eller välj ruta', 'Facilitatorn startar första rundan. Senare kan paret välja eller följa banan.'],
              ['2', 'Arbeta i par', 'Alla använder en vald del av årsredovisningen, inte hela rapporten.'],
              ['3', 'Redovisa muntligt', 'Ett par slumpas och visar resultatet från sin egen dator.'],
              ['4', 'Lägg till poäng', 'Rutan låses, poängen läggs till och nästa runda börjar.'],
            ].map(([number, title, body]) => (
              <div key={number} className="rounded-md bg-slate-950/50 p-4">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-300 font-black text-slate-950">
                  {number}
                </div>
                <h3 className="font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-700 bg-slate-900 p-6">
          <h2 className="mb-3 text-xl font-black text-white">Bra promptar har fem delar</h2>
          <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-5">
            {['Roll', 'Källa', 'Uppgift', 'Format', 'Kontroll'].map((item) => (
              <div key={item} className="rounded-md bg-slate-950/60 px-3 py-2 text-center font-semibold">
                {item}
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onStartSetup}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 py-4 text-lg font-bold text-white transition-colors hover:bg-blue-500"
          >
            <Play size={22} />
            Starta spel
          </button>
          <button
            type="button"
            onClick={onViewRules}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-slate-800 py-4 text-lg font-bold text-white transition-colors hover:bg-slate-700"
          >
            <BookOpen size={22} />
            Läs regler
          </button>
          <button
            type="button"
            onClick={downloadQuestionsAsText}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-slate-800 py-4 text-lg font-bold text-white transition-colors hover:bg-slate-700"
          >
            <Download size={22} />
            Ladda ner frågor
          </button>
        </div>
      </div>
    </main>
  );
}
