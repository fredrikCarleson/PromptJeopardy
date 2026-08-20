import { ChevronLeft, Clock, FileText, Monitor, Target, Users } from 'lucide-react';

interface RulesScreenProps {
  onBack: () => void;
}

export default function RulesScreen({ onBack }: RulesScreenProps) {
  return (
    <main className="min-h-screen bg-slate-950 p-4 text-white lg:p-6">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-blue-300 transition-colors hover:text-blue-200"
        >
          <ChevronLeft size={20} />
          Tillbaka
        </button>

        <h1 className="text-4xl font-black text-white">Regler och workshopupplägg</h1>
        <p className="mt-2 text-slate-400">
          Prompt-Jeopardy är ett samarbetsformat för att träna promptning, källavgränsning och klarspråk.
        </p>

        <div className="mt-8 space-y-6">
          <section className="rounded-lg border border-yellow-500/30 bg-slate-900 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold">
              <Target className="text-yellow-200" />
              Målet
            </h2>
            <p className="leading-relaxed text-slate-200">
              Alla par tävlar tillsammans mot ett gemensamt poängmål. Det finns ingen individuell vinnare. Värdet ligger i att
              se olika promptstrategier, diskutera resultat och upptäcka hur verktygen beter sig med verkligt material.
            </p>
          </section>

          <section className="rounded-lg border border-blue-500/30 bg-slate-900 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold">
              <FileText className="text-blue-300" />
              Materialet
            </h2>
            <p className="leading-relaxed text-slate-200">
              Deltagarna har Skatteverkets årsredovisning och en mall för klarspråk. Årsredovisningen är stor, så varje
              uppgift ber deltagarna välja en sida, ett avsnitt, en tabell, en bild eller ett kort sidintervall. Ingen uppgift
              kräver att hela rapporten bearbetas.
            </p>
          </section>

          <section className="rounded-lg border border-emerald-500/30 bg-slate-900 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold">
              <Users className="text-emerald-300" />
              Arbete i par
            </h2>
            <p className="leading-relaxed text-slate-200">
              Varje par använder sin egen dator och arbetar i Copilot Chat eller den app som står i uppgiften, exempelvis
              Word, Excel eller Create. De skapar, hittar, jämför och granskar verkliga arbetsprodukter. Appen på stor skärm
              visar bara rutan, timer, poäng och reflektionsfrågor.
            </p>
          </section>

          <section className="rounded-lg border border-amber-500/30 bg-slate-900 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Clock className="text-amber-300" />
              Rundans flöde
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['1. Välj ruta', 'Facilitatorn kan starta rekommenderad ruta, slumpa eller låta det presenterande paret välja ämne och poäng direkt på spelplanen.'],
                ['2. Arbeta', 'Alla par arbetar med samma uppgift under timern och väljer själva en relevant del av rapporten.'],
                ['3. Redovisa', 'Ett presenterande par visar resultatet. Ett annat granskarpar lyfter en styrka eller ställer en kontrollfråga. Par som ännu inte haft en roll prioriteras.'],
                ['4. Poäng', 'Facilitatorn markerar rutan som klar. Den blir låst och synlig på tavlan.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-md bg-slate-800 p-4">
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-violet-500/30 bg-slate-900 p-6">
            <h2 className="mb-3 text-2xl font-bold text-white">Vad ni tränar</h2>
            <p className="leading-relaxed text-slate-200">
              Varje prompt bör göra fem saker tydliga: roll eller målgrupp, avgränsad källa, uppgift, önskat format och
              vad en människa fortfarande behöver kontrollera. Det är den röda tråden genom hela spelet.
            </p>
          </section>

          <section className="rounded-lg border border-emerald-500/30 bg-slate-900 p-6">
            <h2 className="mb-3 text-2xl font-bold text-white">Om ett par blir klart tidigt</h2>
            <p className="leading-relaxed text-slate-200">
              De fem rekommenderade uppgifterna har en frivillig extrauppgift. Den ger snabbare par något att fördjupa
              utan att övriga behöver stressa eller att grundtiden ändras.
            </p>
          </section>

          <section className="rounded-lg border border-fuchsia-500/30 bg-slate-900 p-6">
            <h2 className="mb-3 text-2xl font-bold text-white">Muntliga specialmoment</h2>
            <p className="leading-relaxed text-slate-200">
              I workshopläget bryts spelet av tre korta helgruppsmoment: `Vad saknas?`, `Förbättra prompten` och
              `Farlig detalj`. De ger variation utan att kräva att deltagarna visar egna promptar.
            </p>
          </section>

          <section className="rounded-lg border border-cyan-500/30 bg-slate-900 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold">
              <Monitor className="text-cyan-300" />
              Redovisningen är verbal
            </h2>
            <p className="leading-relaxed text-slate-200">
              Appen ska inte ta emot filer eller svar. Paret redovisar muntligt: vilken del av rapporten de valde, vilket
              verktyg de använde, hur prompten ändrades och vad resultatet blev. Det gör momentet snabbt, socialt och lätt att
              köra på stor skärm.
            </p>
          </section>

          <button
            type="button"
            onClick={onBack}
            className="w-full rounded-md bg-blue-600 py-3 font-bold text-white transition-colors hover:bg-blue-500"
          >
            Till startsidan
          </button>
        </div>
      </div>
    </main>
  );
}
