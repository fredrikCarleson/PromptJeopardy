import { BarChart3, CheckCircle, FileText, Image, MessageSquareText, RotateCcw, SearchCheck } from 'lucide-react';

interface WorkshopCompleteScreenProps {
  score: number;
  onContinue: () => void;
  onReset: () => void;
}

const achievements = [
  { icon: MessageSquareText, text: 'Prioriterat insikter från en avgränsad källa' },
  { icon: FileText, text: 'Skapat och förbättrat ett riktigt Word-dokument' },
  { icon: Image, text: 'Gjort en infografik från årsredovisningen' },
  { icon: SearchCheck, text: 'Granskat avvikande formler i Excel' },
  { icon: BarChart3, text: 'Analyserat bemanning och synliggjort begränsningar' },
];

export default function WorkshopCompleteScreen({ score, onContinue, onReset }: WorkshopCompleteScreenProps) {
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950 p-4 text-white sm:p-6" role="dialog" aria-modal="true" aria-label="Workshopen är klar">
      <div className="mx-auto flex min-h-full w-full max-w-6xl items-center justify-center">
        <section className="w-full rounded-2xl border border-yellow-300/40 bg-blue-950/50 p-6 text-center shadow-2xl sm:p-8 lg:p-10">
          <CheckCircle className="mx-auto h-16 w-16 text-emerald-300" />
          <div className="mt-4 text-lg font-black uppercase tracking-widest text-yellow-200">Fem rundor klara</div>
          <h1 className="mt-2 text-[clamp(2.75rem,5vw,5rem)] font-black leading-none">Bra jobbat!</h1>
          <p className="mt-4 text-2xl font-bold text-blue-100">Gruppen samlade {score} poäng.</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {achievements.map(({ icon: Icon, text }) => (
              <div key={text} className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-left">
                <Icon className="h-8 w-8 text-blue-300" />
                <p className="mt-3 text-lg font-semibold leading-snug text-white">{text}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-7 max-w-4xl rounded-xl border border-yellow-300/40 bg-yellow-300/10 p-5">
            <div className="text-sm font-black uppercase tracking-wide text-yellow-200">Avslutande fråga</div>
            <p className="mt-2 text-[clamp(1.6rem,2.5vw,2.5rem)] font-bold leading-snug text-white">
              Vilken av de här sakerna kan ni använda i ert verkliga arbete nästa vecka?
            </p>
          </div>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onContinue}
              className="rounded-md bg-blue-600 px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-blue-500"
            >
              Fortsätt med fri ruta
            </button>
            <button
              type="button"
              onClick={onReset}
              className="flex items-center justify-center gap-2 rounded-md bg-slate-800 px-6 py-3 text-lg font-bold text-slate-100 transition-colors hover:bg-slate-700"
            >
              <RotateCcw size={20} />
              Avsluta och börja om
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
