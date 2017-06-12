# Yoshi's adventure

## Wat is het?
Yoshi's Adventure is space invaders in een Mario jasje. Het doel is om zo veel mogelijk punten te scoren door vijanden dood te maken. Laat je een vijand door dan verlies je punten.
Als je dood ( door tegen een vijand aan te vliegen ) bent begin je weer vanaf het begin.

Er is ook een powerup te krijgen in het spel (sneeuwvlokje), deze geeft je een voordeel voor een bepaalde tijd.

https://cirflexx.github.io/YoshisAdventure/

## Controls
- Spatie = schieten
- W = omhoog
- A = Naar links
- S = Naar beneden
- D = Naar rechts

Rechts boven in de hoek staat een refresh knop, als je op deze klikt wordt de website opnieuw geladen.

## Installatie
- Fork dit project naar een map die makkelijk voor jou te berijken is.
- Open het in je favoriete programma  om in te programmeren ( Kladblok, Visual Code, Webstorm, etc...).
- Ga naar de map docs en klik op index.HTML om het spel lokaal te spelen.

## Toepassingen
- Strategy - Deze heb ik toegepast om de Stategy pattern toe te passen, deze bevat het gedrag van Yoshi. De interface heet Behaviour.
- Observer - Game is een Subject die checkt of Yoshi en de powerup elkaar raken. Als dit zo is stuurt deze een notifier af aan alle enemies. Deze worden dan voor 5 seconden erg sloom.
- Singleton - Deze heb ik aangemaakt in de game.ts, zodat deze in elke andere class is aan te spreken zonder gedoe. Wordt meerdere keren gebruikt in yoshi.ts.
- Interface - Gebruikt bij de strategy pattern en observer pattern. Bij strategy in behavior.ts. Bij observer in observer.ts en subject.ts.
- Encapsulation - In bijna elke file zit incapsulation, dit staat bovenaan de file.
- Composition -  Dit heb ik gebruikt in Game, Yoshi, vehicleCloud en elke file in de Enemies map. Bijvoorbeeld in game.ts wordt een Goomba gemaakt. Deze geeft "container" en "this" mee, omdat de class Goomba hierom vraagt in de constructor (parent, subject:Subject);
- Abstract class - enemies.ts is een abstract class. Deze bevat de draw voor Koopa en Goomba. In koopa.ts en goomba.ts wordt deze draw via de super aangeroepen.
- Static class - In de utils.ts wordt er gechecked voor collision. Dit is een static class en wordt aangeroepen in de onCollision functie in game.ts.
- Library - Ik heb greensock gebruikt om animaties te tonen. Zo wordt de score in het eindscherm voor de speler opgeteld en de refreshknop naar het midden gebracht(van rechtsboven). Ook zijn de animaties die eerst in de css waren vervangen door code in de game.ts.
- Namespaces - In de player map en enemies map heb ik alle classes een namespace gegeven (behalve enemies.ts). Dit heb ik gedaan zodat mensen die de code lezen meteen weten of er een enemy of speler in het spel wordt gemaakt. Ook waren er 2 flying koopa's (rood en groen) hier was eerst geen onderscheid in te zien in de code, nu wel.
- Enumeration - Staat in de enumerations folder. Hierin worden de keycodes omgezet in constanten die ik gebruik in yoshi.ts voor bewegen en schieten.
- Polymorfisme - In yoshi.ts staat een keyboardEvent, die laat de speler bewegen en schieten als er op de knop is gedrukt. Een keyboard event hoefde ik zelf niet te coderen, maar bestaat wel.
- Game Loop - In game.ts wordt in de constructor de functie gameloop aangeroepen. Deze roept de functies die erin staan constant uit omdat Game Loop zichzelf aanroept. Hierdoor wordt alles binnen Gameloop geupdated. 

## UML
![alt text](https://raw.githubusercontent.com/cirflexx/YoshisAdventure/master/UML-YoshisRevenge.png)

-------------------------------------------------------------------------------------