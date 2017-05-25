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

## Feedback
- Er is een live page waar de game speelbaar is. [x]
- Het deelproduct moet werkend zijn zonder bugs/foutmeldingen. []
    -> kleine fout in shoot.ts, schieten is nog niet mogelijk
- Het project bevat een Readme bestand met installatie instructies. Deze instructies stellen de gebruiker in staat om het deelproduct te installeren en te openen. [x]
- Er is een klassendiagram voor het eindproduct. Hierin is aangegeven welke onderdelen al werkend zijn. []
    -> UML is duidelijk en uitgebreid maar niet helemaal duidelijk wat wel en niet werkend is. Het is ook handig om achter een functie te noteren wat deze terug geeft. 
- Het Readme bestand legt uit waar de onderstaande programmeerprincipes zijn toegepast in het project. [x]
- Het deelproduct maakt gebruik van:    
    - interface [x]
    - static utility method [] -> kan je gaan gebruiken voor berekeningen zoals score en collision
    - singleton [x]
    - strategy [x]
- En van technieken uit PRG01-4:
    - Encapsulation [x]
    - Composition [x]
    - Inheritance [] -> kan je toepassen door een parent class GameObject toe te voegen

Niet alle punten zijn behaald maar het zijn over het algemeen nog wat kleine dingen die aangepast moeten worden dus het deelproduct is voldoende :) 

## Toevoeging code
Maak een parent class GameObject. Met behulp van deze class kan je verschillende enemies constant laten genereren. Door bij te houden hoe ver de speler in het spel is kan je steeds sterkere enemies gaan toevoegen. Ook lijkt het me leuk als Yoshi verschillende power-ups kan vinden maar dat is misschien veel werk. 
Verder kan je nog even bewegen als Yoshi al dood is, het is misschien beter om dat gelijk te disablen. 

