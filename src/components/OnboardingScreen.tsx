import { Play, Users, Zap, Award, BookOpen } from 'lucide-react';

interface OnboardingScreenProps {
  onStartSetup: () => void;
  onViewRules: () => void;
}

export default function OnboardingScreen({ onStartSetup, onViewRules }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl lg:text-6xl font-bold text-white">Prompt-Jeopardy</h1>
          <p className="text-xl text-slate-300">Ett samarbetsinriktat workshop-spel</p>
          <p className="text-sm text-slate-400">Där team samarbetar för att nå ett gemensamt poängmål</p>
        </div>

        {/* How to Play Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-800/80 rounded-lg p-6 border border-blue-500/30 backdrop-blur">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Users size={20} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Teamspel</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              2-8 par arbetar tillsammans mot ett gemensamt mål. Alla team strävar efter samma poängmål på en delad spelbräde.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-lg p-6 border border-emerald-500/30 backdrop-blur">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Zap size={20} className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Snabb Workflow</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Välj en ruta → Arbeta i par under timer → Presentera resultat → Välj nästa ruta. 4 enkla steg som upprepas.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-lg p-6 border border-amber-500/30 backdrop-blur">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Award size={20} className="text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Flexibla Poäng</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Varje ruta ger 100-400 poäng. Välj svårare rutor för högre belöning eller enklare för säker progression.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-lg p-6 border border-violet-500/30 backdrop-blur">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <BookOpen size={20} className="text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">AI-Prompting</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Varje ruta är en AI-prompt att arbeta med. Du bestämmer själv hur du löser den — kreativitet uppmuntras!
            </p>
          </div>
        </div>

        {/* Quick Overview */}
        <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-700/50 backdrop-blur space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold text-white">1</span>
            Steg A: Välj en ruta
          </h3>
          <p className="text-sm text-slate-300 ml-10">Slumpa eller klicka en ospelad ruta för att starta en runda.</p>

          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mt-5">
            <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold text-white">2</span>
            Steg B: Arbeta i par
          </h3>
          <p className="text-sm text-slate-300 ml-10">Teamet arbetar tillsammans på uppgiften under en timer (ofta 5-10 minuter). Gärna med AI-hjälp!</p>

          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mt-5">
            <span className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-sm font-bold text-white">3</span>
            Steg C: Presentera
          </h3>
          <p className="text-sm text-slate-300 ml-10">Ett par presenterar vad de gjorde, vad som gick snett, och hur de löste det.</p>

          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mt-5">
            <span className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-sm font-bold text-white">4</span>
            Steg D: Nästa ruta
          </h3>
          <p className="text-sm text-slate-300 ml-10">Nästa par väljer nästa ruta. Processen upprepa tills poängmål nås!</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onStartSetup}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
          >
            <Play size={22} />
            Starta spel
          </button>
          <button
            onClick={onViewRules}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
          >
            <BookOpen size={22} />
            Läs regler
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500">
          Spelet sparas automatiskt. Du kan gå från spelet och komma tillbaka senare.
        </div>
      </div>
    </div>
  );
}
