# Facilitatorfacit: Semesterplan-demo.xlsx

Det här facit är avsett för facilitatorn och ska inte skickas till deltagarna tillsammans med övningsfilen.

Alla namn och uppgifter i arbetsboken är fiktiva.

## Formeldetektiven

Arbetsboken innehåller tre avsiktliga avvikelser på bladet `Bemanningsöversikt`:

1. `C11` använder intervallet `K5:K23` i stället för `K5:K24`. Den sista medarbetaren saknas därför i beräkningen.
2. `C18` innehåller ett hårdkodat tal i stället för samma `COUNTIF`-formel som omgivande celler.
3. `F20` använder villkoret `<=0` i stället för `<0`. Den 20 juli ligger exakt på minimibemanningen men märks därför felaktigt som `UNDER MINIMUM`.

Poängen är inte bara att hitta cellerna. Be deltagarna visa hur de jämförde med angränsande formler och kontrollerade källdatan innan de ändrade något.

## Bemanningsanalysen

Korrekt antal personer på plats räknar `På plats` som 1 och `Halvdag` som 0,5. Semester, sjukdom och utbildning räknas som 0.

De tre arbetsdagarna med lägst faktisk bemanning är:

1. 22 juli 2026: 6 personer
2. 23 juli 2026: 7 personer
3. 24 juli 2026: 8 personer

Minimibemanningen är 10 personer. Alla tre dagar ligger därför under minimum.

## Bra reservationer i redovisningen

Ett starkt deltagarsvar bör nämna minst en begränsning, exempelvis att totalsiffran inte visar:

- vilka roller eller kompetenser som finns på plats;
- om bemanningen är rätt fördelad mellan team;
- arbetsbelastning, öppettider eller prioriterade ärenden;
- distansarbete eller annan tillgänglighet;
- om sjukfrånvaro och utbildning är kända i förväg.

## Förberedelse

Skicka endast `public/ovningsfiler/Semesterplan-demo.xlsx` till deltagarna. Be dem spara en egen kopia i OneDrive eller SharePoint och öppna den i Excel före workshopen.

Om övningsfilen ska återskapas kör du:

```bash
python -m pip install -r scripts/requirements.txt
python scripts/create_semesterplan.py
```
