import { CheckCircle, Lightbulb } from 'lucide-react';
import { SpecialMoment } from '../data/specialMoments';

interface SpecialMomentScreenProps {
  moment: SpecialMoment;
  showAnswers: boolean;
  onRevealAnswers: () => void;
  onFinish: () => void;
}

export default function SpecialMomentScreen({
  moment,
  showAnswers,
  onRevealAnswers,
  onFinish,
}: SpecialMomentScreenProps) {
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={moment.title}
    >
      <div className="mx-auto grid min-h-full w-full max-w-5xl content-center gap-4 py-2 sm:gap-5">
        <div className="text-center">
          <div className="text-sm font-bold uppercase tracking-widest text-yellow-200">Specialmoment</div>
          <h2 className="mt-2 text-5xl font-black text-white lg:text-6xl">{moment.title}</h2>
        </div>

        <section className="rounded-xl border border-yellow-300/50 bg-yellow-300/10 p-5">
          <div className="text-sm font-black uppercase tracking-widest text-yellow-200">Er uppgift</div>
          <p className="mt-2 text-2xl font-bold leading-snug text-white">{moment.prompt}</p>
          <ol className="mt-4 grid gap-3 md:grid-cols-3">
            {moment.taskSteps.map((step, index) => (
              <li key={step} className="flex items-start gap-3 rounded-lg bg-slate-950/70 p-4 text-lg font-semibold leading-snug text-white">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-300 font-black text-slate-950">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="rounded-lg border border-blue-500/40 bg-blue-950/50 p-6">
          <div className="mb-3 text-sm font-black uppercase tracking-wide text-blue-200">{moment.contentLabel}</div>
          <div className="space-y-3">
            {moment.screenContent.map((line) => (
              <div key={line} className="rounded-md bg-slate-950/70 p-4 text-lg leading-relaxed text-white">
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900 p-5">
          <div className="flex items-center gap-2 text-sm font-bold uppercase text-slate-300">
            <Lightbulb size={18} />
            Så gör vi tillsammans
          </div>
          <p className="mt-3 text-base leading-relaxed text-slate-200">{moment.facilitatorCue}</p>
        </div>

        {showAnswers && (
          <div className="grid gap-3 md:grid-cols-3">
            {moment.suggestedAnswers.map((answer) => (
              <div key={answer} className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-base font-semibold leading-relaxed text-emerald-50">
                {answer}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          {!showAnswers && (
            <button
              type="button"
              onClick={onRevealAnswers}
              className="rounded-md bg-yellow-300 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-yellow-200"
            >
              Visa facit
            </button>
          )}
          <button
            type="button"
            onClick={onFinish}
            className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-500"
          >
            <CheckCircle size={18} />
            Tillbaka till spelet
          </button>
        </div>
      </div>
    </div>
  );
}
