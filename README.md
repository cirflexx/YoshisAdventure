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



## Beoordeling/check 
[x]  De code voor het deelproject staat op je eigen GitHub.
[x]  Er is een live page waar de game speelbaar is.
[]  Het deelproduct moet werkend zijn zonder bugs / foutmeldingen.
[x]  Het project bevat een Readme bestand met installatie instructies. Deze instructies stellen de gebruiker in staat om het deelproduct te installeren       en te openen.
[x]  Er is een klassendiagram voor het eindproduct. Hierin is aangegeven welke onderdelen al werkend zijn.
[x]  Het Readme bestand legt uit waar de onderstaande programmeerprincipes zijn toegepast in het project
    Het deelproduct maakt gebruik van:
    [x]  interface
    [x]  static utility method
    [x]  singleton
    [x]  strategy
    [x]  Encapsulation 
    [x]  Composition 
    [x]  Inheritance  

Beoordeling:
Voldoende

Edits:
Comments die beginnen met //F: in de code
-   Je ULM ziet er goed uit! Heel uitgebreid! 
        Kleine suggestie: zou je geen move functie maken in plaats van moveHorizontal+moveVertical?

-   Vraag: Waarom staat er nog een dist file naast je docs file?

-   Er komen maar 2 enemies in het scherm. 
    -   schrijf een if statement: 
    -   Zodra ENEMY buiten X width komt: maak een nieuwe enemy
    -   Gebruik (bijvoorbeeld) splice om de eerste enemy in de array te verwijderen.
    voorbeeld:
       var a: Game = Game.getInstance();
       // de 1000 staat voor width
        if (this.y >= 1000) {
            var i = a.ENEMY.indexOf(this);
            a.ENEMY.splice(i, 1);
            this.div.remove();
        }

-   Ik zou de speed van hoe snel Yoshi omhoog/laag gaat hoger zetten.

-   Voeg een score toe! Kan heel makkelijk:
    -   Maak een element in HTML + CSS 
    -   Haal (bijv. in je main file) het element op
    -   Zet de score op 0
    -   Bij collision, zet score (bijvoorbeeld)  +10
    voorbeeld:

    HTML
    <score id="score">Score: 0</score>

    CSS
    score {
    color: white;
    font-size: 30px;
    padding: 40px;
    }

    TYPESCRIPT
    private scoreDiv: HTMLElement;
    public score: number;
    this.scoreDiv = document.getElementById("score");
    this.score  = 0
    this.scoreDiv.innerHTML = "Score: " + this.score;
    a.score += 10;

-   Meer comments in je code maak het voor mij trouwens makkelijker te begrijpen :)

-   Je gebruikt nou je collision detect twee keer (verschillende enemies), zou je hier geen aparte class van maken?
    Dit hebben we ook in de laatste les gedaan. Bijvoorbeeld:
    class X {
    public static checkCollision(m: GameObject, n: GameObject): boolean {
                return (m.x < n.x + n.width &&
                        m.x + m.width > n.x &&
                        m.y < n.y + n.height &&
                        m.height + m.y > n.y);
        }
    }

