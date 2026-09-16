# PromptJeopardy Frågor

Redigera den här filen när du vill ändra frågor, kategorier, poäng eller reflektionsfrågor. Be sedan Codex läsa `QUESTIONS.md` och uppdatera `src/data/tiles.ts`.

Viktigt: frågorna använder både **Microsoft 365 Copilot Chat** och Copilot-funktioner i Word, Excel och Create. Verktyget står uttryckligen i varje fråga. Deltagarna ska arbeta i den angivna appen och visa den faktiska filen, analysen eller bilden när uppgiften kräver det. Fem IT-anpassade rutor kräver ingen källfil; originalen finns i `src/data/originals/skatteverket-five-tiles.md`.

## Förstå rapporten

### 100 poäng: Förklara en sida enkelt

- Kort etikett: Enkel förklaring
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat
- Uppgift: Välj en sida eller ett kort avsnitt i årsredovisningen. Be Copilot Chat förklara innehållet så att en person utan förkunskaper förstår vad Skatteverket beskriver.
- Avgränsa källan: Använd bara en sida eller ett kort avsnitt, inte hela rapporten.
- Lärandemål: Träna på att ge tydlig målgrupp och avgränsat källmaterial.
- Reflektionsfrågor:
  - Vilken del av rapporten valde ni?
  - Vilken målgrupp bad ni Copilot skriva för?
  - Vad behövde ni ändra i prompten för att svaret skulle bli begripligt?

### 200 poäng: Tre viktigaste insikterna

- Kort etikett: Tre insikter
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat
- Uppgift: Välj 2-3 sidor ur ett kapitel. Be Copilot Chat ta fram de tre viktigaste insikterna och förklara varför de är viktiga för medborgare.
- Avgränsa källan: Välj ett kort sidintervall eller ett tydligt avsnitt.
- Klart tidigt: Be Copilot peka ut vilket påstående i svaret som har svagast stöd och förbättra det.
- Lärandemål: Öva på att be om prioritering, motivering och publiknytta.
- Reflektionsfrågor:
  - Vilka tre insikter fick ni?
  - Hur bad ni Copilot avgöra vad som var viktigast?
  - Blev något i svaret för generellt eller osäkert?

### 300 poäng: Fråga rapporten som en medborgare

- Kort etikett: Medborgarfrågor
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat
- Uppgift: Välj ett avsnitt som kan väcka frågor från allmänheten. Be Copilot Chat skapa fem sannolika medborgarfrågor och korta svar baserade på just den delen.
- Avgränsa källan: Använd ett avsnitt där det finns konkret sakinformation.
- Lärandemål: Träna på roll, kontext och krav på källbundenhet.
- Reflektionsfrågor:
  - Vilka frågor kändes mest realistiska?
  - Hur säkerställde ni att svaren höll sig till källan?
  - Vilken fråga behövde mest mänsklig kontroll?

### 400 poäng: Kreativa förslag på retrospektivupplägg

- Kort etikett: Kreativa förslag
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat
- Uppgift: Be Copilot Chat ta fram tre förslag på hur en timmes retrospektiv kan läggas upp. Ge Copilot en tydlig roll, kontext och önskat format.
- Avgränsa källan: Ingen källfil krävs. Använd bara den kontext ni ger Copilot i chatten.
- Klart tidigt: Ge Copilot Chat en annan kontext för retrospektivet och se hur det påverkar svaret.
- Lärandemål: Öva på att be om kreativa förslag på hur en arbetsuppgift kan utföras.
- Gör så här:
  - Be Copilot Chat agera som en rutinerad scrum master.
  - Be om tre förslag på hur en timmes retrospektiv kan läggas upp.
  - Ange kontext och önskat format för svaret.
- Förväntat resultat: Tre exempel på hur ett retrospektiv kan läggas upp.
- Reflektionsfrågor:
  - Hur kreativa tycker ni svaren från Copilot var?
  - Hur väl tycker ni att Copilot anpassade sitt svar till kontexten?
  - Vad ändrade ni i prompten för att styra formatet?

### 500 poäng: Bryt ner en user story

- Kort etikett: Nedbrytning
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat
- Uppgift: Beskriv en användarberättelse (user story) i Copilot Chat och be Copilot bryta ner den i utvecklingsaktiviteter. Iterera prompten tills resultatet är relevant och heltäckande.
- Avgränsa källan: Ingen källfil krävs. Använd bara den user story och det område ni ger Copilot.
- Klart tidigt: Ange en ny användarberättelse och jämför nedbrytningen.
- Lärandemål: Öva på att bryta ner en större arbetsuppgift och iterera prompten tills resultatet är relevant och heltäckande.
- Gör så här:
  - Be Copilot agera som en erfaren utvecklare inom ett område ni kan.
  - Ange en user story: Som en… vill jag att… så att…
  - Be om en nedbrytning och iterera tills den är heltäckande.
- Förväntat resultat: Utvecklingsaktiviteter som täcker utveckling, felhantering, verifiering och dokumentation.
- Reflektionsfrågor:
  - Hur pass heltäckande tycker ni Copilots svar var?
  - Var det några utvecklingsaktiviteter i Copilots svar som var överraskande?
  - Vad ändrade ni när ni itererade prompten?

## Klarspråk

### 100 poäng: Gör en mening begriplig med klarspråksdokumentet

- Kort etikett: En mening
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat -> klarspråkstext
- Uppgift: Ladda upp eller referera dokumentet med klarspråksprinciper i Copilot Chat. Välj sedan en svår mening ur årsredovisningen och be Copilot Chat skriva om den i klarspråk enligt dokumentet, utan att ändra betydelsen.
- Avgränsa källan: Använd klarspråksdokumentet och en enda mening från årsredovisningen. Jämför före och efter.
- Lärandemål: Öva på att explicit ge Copilot en språklig referens och be den skriva i klarspråk.
- Reflektionsfrågor:
  - Vilken mening valde ni?
  - Hur refererade ni till klarspråksdokumentet?
  - Blev betydelsen densamma efter omskrivningen?

### 200 poäng: Klarspråk för ett stycke

- Kort etikett: Tydligt stycke
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat -> klarspråkstext
- Uppgift: Ladda upp eller referera klarspråksdokumentet i Copilot Chat. Välj ett stycke med myndighetsspråk och be Copilot Chat skriva om det i klarspråk så att det blir tydligare, kortare och mer aktivt.
- Avgränsa källan: Använd klarspråksdokumentet och ett stycke från årsredovisningen på cirka 5-10 rader.
- Lärandemål: Träna på att styra omskrivning med en faktisk klarspråkskälla, inte bara en allmän instruktion.
- Reflektionsfrågor:
  - Vad gjorde texten svår från början?
  - Hur fick ni Copilot att använda klarspråksdokumentet?
  - Vad blev mest förbättrat?

### 300 poäng: Testa mot klarspråksdokumentet

- Kort etikett: Malltest
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat -> klarspråksgranskning
- Uppgift: Ladda upp eller referera klarspråksdokumentet i Copilot Chat. Välj ett avsnitt ur årsredovisningen och be Copilot Chat bedöma texten mot klarspråksdokumentet: styrkor, brister och tre konkreta förbättringsförslag.
- Avgränsa källan: Använd ett kort avsnitt från årsredovisningen och klarspråksdokumentet som bedömningsgrund.
- Lärandemål: Öva på att låta Copilot använda ett uppladdat styrdokument som kriterielista.
- Reflektionsfrågor:
  - Vilken del av klarspråksdokumentet använde Copilot?
  - Vilka brister hittade Copilot?
  - Vilket förbättringsförslag var mest användbart?

### 400 poäng: Copilot som sparringpartner

- Kort etikett: Sparringpartner
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat
- Uppgift: Be Copilot Chat anta en persona med specifika åsikter, till exempel en medarbetare som inte vill dela kunskap. Simulera en konversation där ni försöker få personen att ändra tankesätt och agerande.
- Avgränsa källan: Ingen källfil krävs. Använd bara den roll, ståndpunkt och kontext ni ger Copilot.
- Klart tidigt: Prova att ge Copilot en annan roll och persona.
- Lärandemål: Öva på att använda Copilot som sparringpartner för att vässa argument och simulera en motpart.
- Gör så här:
  - Be Copilot anta en tydlig roll och persona.
  - Ange personens ståndpunkt, till exempel att den inte vill samarbeta.
  - Simulera en konversation och bemöt Copilots motargument.
- Förväntat resultat: En simulerad konversation där ni argumenterar mot Copilots persona.
- Reflektionsfrågor:
  - Hur väl tycker ni att Copilot simulerade konversationen?
  - Tycker ni att Copilot kan fungera bra som en sparringpartner?
  - Vad ändrade ni i prompten för att få en mer trovärdig motpart?

### 500 poäng: Bygg en återanvändbar klarspråksprompt

- Kort etikett: Promptmall
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat
- Uppgift: Ladda upp eller referera klarspråksdokumentet och skapa en återanvändbar promptmall som alltid granskar och skriver om text i klarspråk enligt dokumentet. Testa den på ett kort avsnitt ur årsredovisningen och förbättra prompten en gång.
- Avgränsa källan: Använd klarspråksdokumentet som permanent referens och testa på ett avgränsat avsnitt.
- Lärandemål: Träna på promptmallar, återanvändbarhet och hur ett styrdokument kan bli en tydlig instruktion för AI.
- Reflektionsfrågor:
  - Hur ser er promptmall ut, och hur refererar den till klarspråksdokumentet?
  - Vad ändrade ni efter första testet?
  - Hur kan mallen användas av andra efter workshopen?

## Analysera

### 100 poäng: Hitta en risk

- Kort etikett: Risk
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat
- Uppgift: Välj ett avsnitt som beskriver resultat, utveckling eller utmaningar. Be Copilot Chat identifiera en möjlig risk och föreslå en följdfråga.
- Avgränsa källan: Välj ett avsnitt med någon form av utmaning eller förändring.
- Lärandemål: Öva på analysfrågor som går bortom sammanfattning.
- Reflektionsfrågor:
  - Vilken risk hittade Copilot?
  - Var risken tydligt stödd av texten?
  - Vilken följdfråga blev bäst?

### 200 poäng: Dra en slutsats – försök motbevisa den

- Kort etikett: Motbevisa
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat
- Uppgift: Välj 2-3 sidor ur årsredovisningen. Be Copilot Chat formulera en viktig slutsats och ange exakt stöd i texten. Be sedan Copilot hitta en alternativ förklaring, ett motargument eller information som saknas.
- Avgränsa källan: Använd bara de valda sidorna och kräv sidnummer eller tydliga textbelägg.
- Lärandemål: Träna på källstöd, alternativa förklaringar och kritisk granskning av AI-genererade slutsatser.
- Reflektionsfrågor:
  - Vilken slutsats drog Copilot?
  - Vilket belägg var starkast?
  - Vad hittade ni som försvagade slutsatsen?

### 300 poäng: Skapa förslag på testfall

- Kort etikett: Testfall
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat
- Uppgift: Be Copilot Chat agera som en erfaren testare och skapa funktionella testfall för en ny systemfunktion som ni beskriver.
- Avgränsa källan: Ingen källfil krävs. Använd bara den applikation, funktion och de krav ni beskriver.
- Klart tidigt: Iterera vidare och be Copilot komplettera det som saknas.
- Lärandemål: Öva på att be Copilot agera som en testare som kan generera testfall.
- Gör så här:
  - Be Copilot agera som en erfaren testare inom ett område ni kan.
  - Beskriv en applikation och en ny funktion med några användarfall eller krav.
  - Be om funktionella testfall, med begränsningar och önskat format.
- Förväntat resultat: Relevanta funktionella testfall för den beskrivna funktionen.
- Reflektionsfrågor:
  - Hur väl tycker ni att Copilot lyckades skapa relevanta testfall?
  - Finns det något som ni anser att Copilot har missat?
  - Vad ändrade ni i prompten för att förbättra testfallen?

### 400 poäng: Generera kod

- Kort etikett: Kod
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat
- Uppgift: Be Copilot Chat agera som en erfaren utvecklare i ett programmeringsspråk ni kan. Beskriv funktionen i detalj och be Copilot generera kod.
- Avgränsa källan: Ingen källfil krävs. Använd bara det språk och den funktionsbeskrivning ni ger Copilot.
- Klart tidigt: Be Copilot förfina svaret genom att iterera.
- Lärandemål: Öva på att be Copilot agera som en utvecklare och styra kodgenerering med tydlig uppgift.
- Gör så här:
  - Be Copilot agera som en erfaren utvecklare i ett programmeringsspråk ni kan.
  - Beskriv uppgiften: generera kod för en specifik funktion.
  - Beskriv funktionen i detalj och be om ett kodutkast.
- Förväntat resultat: Ett utkast på kod för den beskrivna funktionen.
- Reflektionsfrågor:
  - Hur väl tycker ni att Copilot lyckades skapa kod?
  - Vilken kvalitet har koden efter några iterationer?
  - Vad behövde ni ändra i prompten för att koden skulle bli användbar?

### 500 poäng: Beslutsunderlag med osäkerheter

- Kort etikett: Beslutsunderlag
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat -> dokumentunderlag
- Uppgift: Välj 4-6 sidor och be Copilot Chat skapa ett kort beslutsunderlag med slutsats, stöd i texten, osäkerheter och rekommenderade kontrollfrågor. Testa att även referera ett relevant dokument eller möte ni har tillgång till.
- Avgränsa källan: Använd ett sammanhängande utdrag och högst en extra källa.
- Lärandemål: Träna på analytisk struktur, explicit hantering av osäkerhet och mänsklig kontroll av AI-svar.
- Reflektionsfrågor:
  - Vilken slutsats föreslog Copilot?
  - Hur redovisades osäkerheter?
  - Vilken kontrollfråga bör en människa ställa efteråt?

## Skapa material

### 100 poäng: Word-dokument till kollegor

- Kort etikett: Word
- Verktyg: Copilot i Word
- Appfokus: Word Agent / Copilot i Word
- Uppgift: Välj ett kort avsnitt ur årsredovisningen. Använd Word Agent eller Copilot i Word för att skapa och öppna ett riktigt Word-dokument för kollegor. Dokumentet ska förklara varför avsnittet är relevant och innehålla rubrik, ingress, tre korta budskap och en enkel faktaruta.
- Avgränsa källan: Använd ett kort avsnitt som går att sammanfatta på 5-7 meningar.
- Lärandemål: Öva på att skapa, öppna och kvalitetssäkra ett konkret Word-dokument med tydlig målgrupp.
- Reflektionsfrågor:
  - Vilken struktur fick Word-dokumentet?
  - Hur styrde ni ton och längd?
  - Vad behövde ni justera för att dokumentet skulle kännas användbart?

### 200 poäng: FAQ från ett avsnitt som Word-dokument

- Kort etikett: FAQ Word
- Verktyg: Copilot i Word
- Appfokus: Word Agent / Copilot i Word
- Uppgift: Välj ett avsnitt i årsredovisningen. Använd Word Agent eller Copilot i Word för att skapa och öppna en FAQ för medborgare. Dokumentet ska ha rubrik, kort ingress, fem frågor och svar samt en avslutande ruta med "Bra att veta". Kontrollera att svaren stöds av källan.
- Avgränsa källan: Använd ett avsnitt där medborgare sannolikt kan ha frågor.
- Lärandemål: Öva på att skapa en riktig Word-fil med målgrupp, struktur, saklig ton och källkontroll.
- Reflektionsfrågor:
  - Vilka frågor valde Copilot ut?
  - Hur styrde ni att svaren skulle vara korta och begripliga?
  - Vad behövde ni ändra för att dokumentet skulle kännas korrekt och användbart?

### 300 poäng: PowerPoint från befintlig fil

- Kort etikett: PowerPoint
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat -> PowerPoint
- Uppgift: Välj ett kort Word- eller PDF-underlag, till exempel ett utdrag ur årsredovisningen eller ett dokument i OneDrive. Be Copilot Chat skapa en PowerPoint med tre slides: rubrik, huvudbudskap och talarmanus.
- Avgränsa källan: Använd en kort källfil eller ett kort utdrag som fungerar som presentationsunderlag.
- Lärandemål: Visa hur Copilot Chat kan skapa en PowerPoint från befintliga filer och inte bara från fri text.
- Reflektionsfrågor:
  - Vilken källfil använde ni?
  - Vilken slide blev bäst?
  - Vad behövde ni ändra manuellt i presentationen?

### 400 poäng: Workshopövning som PowerPoint

- Kort etikett: Workshop PPT
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat -> PowerPoint
- Uppgift: Välj ett tema eller avsnitt i årsredovisningen och be Copilot Chat skapa en PowerPoint för en 10-minuters workshopövning. Presentationen ska ha 4-5 slides: syfte, instruktion, parövning, diskussionsfrågor och avslutande lärdom.
- Avgränsa källan: Använd ett tema eller kort avsnitt som går att diskutera i par.
- Lärandemål: Träna på att från chatten skapa en konkret PowerPoint som kan användas för att leda en övning.
- Reflektionsfrågor:
  - Hur fungerade workshopupplägget?
  - Hur styrde ni att PowerPointen skulle bli praktisk att använda?
  - Vad behövde ni ändra för att instruktionerna skulle bli tydliga?

### 500 poäng: Skapa ett paket: bild plus PowerPoint

- Kort etikett: Bild + PPT
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat -> bild + PowerPoint
- Uppgift: Välj ett tydligt budskap från årsredovisningen. Be Copilot Chat först skapa en bildprompt eller bild. Be sedan Copilot Chat skapa en kort PowerPoint med tre slides: problem, insikt och rekommendation, där bilden eller bildidén används.
- Avgränsa källan: Använd ett kort avsnitt ur årsredovisningen och en bildidé som kan förklaras muntligt.
- Lärandemål: Träna på att från chatten kombinera generativ bild, PowerPoint-struktur och ett sakligt budskap.
- Reflektionsfrågor:
  - Vilken bildidé skapade ni?
  - Hur använde ni bilden i PowerPoint-strukturen?
  - Vad behövde ni ändra för att paketet skulle kännas professionellt?

## Data och bild

### 100 poäng: Vad säger tabellen – och inte?

- Kort etikett: Tabellkritik
- Verktyg: Microsoft 365 Copilot Chat
- Appfokus: Copilot Chat -> Excel
- Uppgift: Välj en tabell i årsredovisningen. Be Copilot Chat hitta en viktig insikt, en osäkerhet och en möjlig feltolkning. Kräv att varje påstående kopplas till värden i tabellen.
- Avgränsa källan: Använd en enda tabell eller ett tydligt tabellutdrag.
- Lärandemål: Öva på att skilja mellan vad data visar, vad den inte visar och vad som kräver kontroll.
- Reflektionsfrågor:
  - Vilken tabell valde ni?
  - Vilken insikt och osäkerhet hittade ni?
  - Hur skulle tabellen kunna misstolkas?

### 200 poäng: Rätt diagram – fel diagram

- Kort etikett: Diagramval
- Verktyg: Copilot i Excel
- Appfokus: Copilot i Excel
- Uppgift: Välj en tabell ur årsredovisningen och lägg in den i Excel. Be Copilot i Excel skapa två olika diagram. Välj vilket diagram som kommunicerar innehållet bäst och förklara hur det andra kan vilseleda.
- Avgränsa källan: Använd en tabell som går att klistra in eller återskapa i Excel.
- Lärandemål: Träna på att skapa och kritiskt bedöma datavisualiseringar, inte bara acceptera första förslaget.
- Reflektionsfrågor:
  - Vilket diagram valde ni och varför?
  - Hur kunde det andra diagrammet vilseleda?
  - Vad behövde ni ändra manuellt?

### 300 poäng: Formeldetektiven

- Kort etikett: Formelfel
- Verktyg: Copilot i Excel
- Appfokus: Copilot i Excel
- Uppgift: Öppna den gemensamma filen Semesterplan-demo.xlsx i Excel. Be Copilot i Excel leta efter formler som avviker från mönstret, felvärden och hårdkodade tal där det borde finnas en formel. Undersök två misstänkta celler och kontrollera förslagen manuellt innan ni ändrar något.
- Avgränsa källan: Använd endast den syntetiska övningsfilen. Ändra inget innan ni har granskat Copilots förklaring.
- Klart tidigt: Be Copilot förklara varför den mest svårupptäckta avvikelsen kan leda till ett felaktigt beslut.
- Lärandemål: Visa hur Copilot kan hjälpa till att felsöka en befintlig arbetsbok utan att ersätta mänsklig kontroll.
- Reflektionsfrågor:
  - Vilka två celler verkade misstänkta?
  - Hur förklarade Copilot avvikelsen?
  - Hade Copilot rätt när ni kontrollerade manuellt?

### 400 poäng: Infografik från årsredovisningen

- Kort etikett: Infografik
- Verktyg: Microsoft 365 Copilot Create
- Appfokus: Create -> Infografik
- Uppgift: Öppna Create i Microsoft 365 Copilot och välj "Design an infographic". Lägg till årsredovisningen som källa och skapa en infografik för medborgare med högst tre huvudbudskap. Kontrollera alla siffror och formuleringar mot rapporten innan ni laddar ned bilden.
- Avgränsa källan: Använd årsredovisningen som källa. Ha högst tre budskap och hitta inte på siffror.
- Klart tidigt: Kontrollera en siffra och ett visuellt påstående mot årsredovisningen.
- Lärandemål: Visa hur ett befintligt dokument kan omvandlas till en konkret visuell produkt med källkontroll.
- Reflektionsfrågor:
  - Vilka tre budskap valde ni?
  - Vilken uppgift faktakontrollerade ni?
  - Vad skulle ni ändra innan publicering?

### 500 poäng: När är bemanningen som lägst?

- Kort etikett: Bemanning
- Verktyg: Copilot i Excel
- Appfokus: Copilot i Excel
- Uppgift: Öppna Semesterplan-demo.xlsx i Excel. Be Copilot i Excel hitta de tre arbetsdagar som har lägst bemanning, markera dagar under minimibemanningen och skapa en enkel visualisering. Be sedan Copilot beskriva vad analysen inte tar hänsyn till.
- Avgränsa källan: Använd endast den syntetiska semesterplanen och dess angivna minimibemanning.
- Klart tidigt: Bryt ner en riskdag per team eller roll och förklara varför totalsiffran inte räcker.
- Lärandemål: Träna på att använda en befintlig arbetsbok för en konkret verksamhetsfråga och granska analysens begränsningar.
- Reflektionsfrågor:
  - Vilka tre dagar hade lägst bemanning?
  - Hur visade ni resultatet?
  - Vad saknas för att kunna fatta ett riktigt bemanningsbeslut?

