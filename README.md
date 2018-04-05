# Yoshi's adventure

## Wat is het?
Yoshi's Adventure is space invaders in een Mario jasje. Het doel is om zo veel mogelijk punten te scoren door vijanden dood te maken. Laat je een vijand door dan verlies je punten.
Als je dood ( door tegen een vijand aan te vliegen ) bent begin je weer vanaf het begin.

Er is ook een powerup te krijgen in het spel (sneeuwvlokje), deze geeft je een voordeel voor een bepaalde tijd.

https://cirflexx.github.io/YoshisAdventure/

## Controls
- Spatie/linker muisknop = schieten
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
- Strategy - Dee strategy pattern bevat het gedrag van Yoshi. De interface heet Behaviour. Dit wordt gebruikt om te bewegen schieten en dood te gaan.
- Observer - Game is een Subject die checkt of Yoshi en de powerup elkaar raken. Als dit zo is stuurt deze een notifier af aan alle enemies. Deze worden dan voor 5 seconden erg sloom.
- Singleton - Deze heb ik aangemaakt in de game.ts, zodat deze in elke andere class is aan te spreken zonder gedoe. Wordt meerdere keren gebruikt in yoshi.ts.
- Interface - Gebruikt bij de strategy pattern en observer pattern. Bij strategy in behavior.ts. Bij observer in observer.ts en subject.ts.
- Encapsulation - In bijna elke file zit incapsulation, dit staat bovenaan de file.
- Composition -  Dit heb ik gebruikt in Game, Yoshi, vehicleCloud en elke file in de Enemies map. Bijvoorbeeld in game.ts wordt een Goomba gemaakt. Deze geeft "container" en "this" mee, omdat de class Goomba hierom vraagt in de constructor (parent, subject:Subject);
- Abstract class - enemies.ts is een abstract class. Hierdoor kan deze niet aangemaakt worden als een object. ( bv. this.enemy = new Enemy() kan niet meer).
- Static class - In de utils.ts wordt er gechecked voor collision. Dit is een static class en wordt aangeroepen in de onCollision functie in game.ts.
- Library - Ik heb greensock gebruikt om animaties te tonen. Zo wordt de score in het eindscherm voor de speler opgeteld en de refreshknop naar het midden gebracht(van rechtsboven). Ook zijn de animaties die eerst in de css waren vervangen door code in de game.ts.
- Namespaces - In de player map en enemies map heb ik alle classes een namespace gegeven (behalve enemies.ts). Dit heb ik gedaan zodat mensen die de code lezen meteen weten of er een enemy of speler in het spel wordt gemaakt. Ook waren er 2 flying koopa's (rood en groen) hier was eerst geen onderscheid in te zien in de code, nu wel.
- Enumeration - Staat in de enumerations folder. Hierin worden de keycodes omgezet in constanten die ik gebruik in yoshi.ts voor bewegen en schieten.
- Polymorfisme - In game.ts wordt er in onCollision() door de Array met enemies heen geloopt. Door deze loop wordt de draw functie voor elke enemy aangeroepen.
- Game Loop - In game.ts wordt in de constructor de functie gameloop aangeroepen. Deze roept de functies die erin staan constant uit omdat Game Loop zichzelf aanroept. Hierdoor wordt alles binnen Gameloop geupdated. 
- Inheritance - Goomba, Koopa, Lakitu en de andere vijanden erven van enemy.ts. Enemy.ts is een child van gameObject.ts. Yoshi, vihicleCloud en Egg erven ook van gameObject.ts.

## UML
![alt text](https://raw.githubusercontent.com/cirflexx/YoshisAdventure/master/UML-YoshisRevenge.png)

-------------------------------------------------------------------------------------
### Week 7 review(Maarten)
- Strategy - Strategy pattern goed toegepast, niet alleen maar voor de beweging, maar ook het behaviour dead en shoot.
- Observer - De game gebruikt de interface subject correct, en alle enemies zijn de observer class. Zo is er erg handig gebruik gemaakt van de observer. Hierdoor kunnen gemakkelijk alle enemies aangeroepen worden in de game door de functie notify().
- Inheritance - Staat niet in de readme, maar is wel goed toegepast, En het is ook mooi om te zien dat de enemy erft van de gameobject en bijvoorbeeld goomba dan weer erft van enemy. Alle andere objecten erven ook van gameobject dus dat is goed geimplementeerd. één ding lijkt mij wel overbodig, er zijn 2 classes van de flyingKoopa. Het enigste wat in mijn ogen verandert zijn de kleuren. Zo is veel code hetzelfde. 
- Singleton - Singleton wordt aangemaakt en wordt ook goed gebruikt.
- Interface - De interface wordt correct gebruikt, bijvoorbeeld bij de Observer.
- Encapsulation - Encapsulation wordt goed toegepast, zo zijn er geen overbodige public en of private's. Protected wordt helaas niet gebruikt, dat zou wel toegepast moeten worden in de class gameobject.
- Composition -  Correct toegepast.
- Abstract class - Correct toegepast.
- Static class - Gebruikt gemaakt van een static class, bijvoorbeeld in de util class. Zo kan deze gemakkelijk in alle bestanden aangeroepen worden.
- Library - Erg goed gebruik gemaakt van de animaties van greensock. Zo zijn de css animaties vervangen, wat natuurlijk erg veel voordeel heeft in de peformance van het spel.
- Namespaces - Goed over nagedacht en correct toegpast.
- Enumeration - Slim gebruik gemaakt van Enumeration bij de keycodes. Zo is overzichtelijk in de code te zien welke toets je moet indrukken.
- Polymorfisme - Mooi gebruik gemaakt van polymorfisme, alle enemies in één array gestopt. En elke enemy gebruikt ook zo zijn eigen functie.
- Game Loop - Correct toegepast.
- UML - De UML is goed, al zie je wel dat er in de game veel dingen worden aangemaakt. Zo ook spawn50,100,150. Dit had anders opgelost kunnen worden.

Beoordeling:
Voldoende

Uitleg beoordeling:
Wat kleine foutjes, maar er zijn vele onderwerp uitstekend uitgevoerd en alles zit erin. Zo heeft de game ook geen bugs en is het goed speelbaar. Ook heeft het een einde en wat ook handig is een restart knop. Prima :)