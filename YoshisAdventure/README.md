# Yoshi's adventure

## Wat is het?
Yoshi's Adventure is space invaders in een Mario jasje. Het doel is om zo veel mogenlijk munten te verdienen door monsters de doden en op het einde een baas.
Als je dood bent begin je weer vanaf het begin.

https://cirflexx.github.io/YoshisAdventure/

## Controls
- Spatie =  schieten
- W = omhoog
- A = Naar links
- S = Naar beneden
- D = Naar rechts

Rechts boven in de hoek staat een refresh knop, als je op deze klikt wordt de website opnieuw geladen.

## Installatie
- Fork dit project naar een map die makkelijk voor jou te berijken is.
- Open het in je favoriete programma om in te programmeren ( dit kan ook in kladblok).
- Ga naar de map docs en klik op index.HTML om het spel lokaal te spelen.

## Toepassingen
- Interface/ Strategy - Deze heb ik toegepast om de Stategy pattern toe te passen, deze bevat het gedrag van Yoshi. De interface heet Behaviour.
- Singleton - Deze heb ik aangemaakt in de game.ts, zodat deze in elke andere class is aan te spreken zonder gedoe. Wordt meerdere keren gebruikt in yoshi.ts.
- Encapsulation - In bijna elke file zit incapsulation, dit staat bovenaan de file.
- Composition -  Dit heb ik gebruikt in Game, Yoshi, vehicleCloud en elke file in de Monsters map.

## UML
![alt text](https://raw.githubusercontent.com/cirflexx/YoshisAdventure/master/UML-YoshisRevenge.png)

-------------------------------------------------------------------------------------

# Robin's feedback

## UML
- Je UML ziet er duidelijk uit. Je hebt de juiste icoontjes gebruikt ('a heeft een b' en 'x is een y').

## Code
- Interface: Je hebt een interface gebruikt voor behavior en hier heb je een Strategy Pattern aan gekoppeld. Zoals het hoort staat er geen code in je Interface.
- Static Utility Method: Dit onderdeel is niet gebruikt in je project.
- Singleton: Ik zie dat Singleton is toegepast in game.ts
- Strategy Pattern: Je hebt een Strategy Pattern gebruikt voor het gedrag van Yoshi. Het gedrag van Yoshi is goed, maar ik zou moveHorizontal.ts en moveVertical.ts combineren tot 1 move.ts bestand (deze staat nu in de map behavior). Hierdoor heb je minder code, maar werkt alles nog wel. Hiervoor heb ik ook code uit yoshi.ts, idle.ts, shoot.ts, dead.ts en game.ts moeten wijzigen.
- Encapsulation: Encapsulation is goed gebruikt.
- Composition:
- Inheritance: Zit er nog niet in, maar dit heb ik gemaakt voor je. flyingKoopa, goomba en koopa zijn allemaal enemies.

## Veranderingen code
- moveHorizontal en moveHorizontal zijn samengevoegd tot 1 move behavior (Strategy Pattern). Move is eigenlijk 1 gedrag en het scheelt toch een bestand + code. Hiervoor zijn aanpassingen gemaakt in yoshi.ts, idle.ts, shoot.ts, dead.ts en game.ts.
- In yoshi.ts heb ik alle onKeyUp functies uitgecomment. De code van onKeyDown wordt alleen uitgevoerd als de knop ingedrukt is (zoals de naam al zegt). onKeyUp is dan overbodig.
- In yoshi.ts heb ik de Singleton gebruikt zoals hij in de les is uitgelegd: les 2, slide 19. Deze is te vinden op regel 116 en 124.
- Enemies (flyingKoopa, goomba en koopa) worden teruggezet naar x = 900 als ze uit het scherm zijn verdwenen. 
- Basis code voor een score is geschreven in game.ts en yoshi.ts.
- Goomba zit nog niet in je spel. Ik heb de basis code geschreven in game.ts.
- Overerving toegepast met enemies (flyingKoopa, goomba en koopa), zijn allemaal een enemy. Enemy.ts is gemaakt en de enemies extenden van Enemy.
- In ts.config wordt er 2x verwezen naar de dist map, waar /js/main.js in staat. Deze wordt nu aangepast in plaats die van in de docs map. Regel 10 moet ook docs zijn in plaats van dist. Anders wordt main.js in de map dist steeds aangepast, maar die in docs niet.

## Comments
Je gebruikt zo goed als geen comments in je code. Om je code duidelijker te maken voor andere mensen is het echt nodig om comments te plaatsen in je code.

## Het spel
- Ik weet niet of het de bedoeling is, maar het bewegen van Yoshi voelt best apart aan. Wanneer je 1x op D drukt, gaat Yoshi 1px naar rechts. Misschien is het leuker om Yoshi na het indrukken van een knop automatisch die kant op te laten gaan. Dit zorgt er voor dat het spel net wat vloeiender kan worden en misschien ook wat lastiger.
- Nadat je je 2 enemies hebt gezien gebeurt er niks meer in het spel. Je kan hier bijvoorbeeld je enemies opnieuw plaatsen (het veranderen van de x positie (en misschien ook de y als je dat wil)).
- Iets als een score zou je game leuker maken. In combinatie met het opnieuw positioneren van je enemies wordt je spel meer uitdagender. Je spel heeft dan ook een duidelijk doel: behaal een zo hoog mogelijke score. Je hebt al eens score gebruikt voor je project, dus deze kan je zo overnemen.

## Beoordeling
Voldoende