class Game implements Subject {
    public observers: Array<Observer> = new Array();
    private static instance: Game;

    private yoshi : Player.Yoshi;
    private koopa : Enemies.Koopa;
    private goomba : Enemies.Goomba;
    private flyingKoopa: Enemies.FlyingKoopaRed.FlyingKoopa;
    private flyingKoopa2: Enemies.FlyingKoopaGreen.FlyingKoopa;
    private lakitu: Enemies.Lakitu;
    private powerup: Powerup;

    private timer : number  = 200;
    private speedTimer : number = 500;
    public running: boolean = true;
    public score: number = 0;
    public powerupActive : boolean = false;

    private eggCollection = [];
    private collisionArray = [];

    private spawn50 : boolean = false;
    private spawn100 : boolean = false;
    private spawn150 : boolean = false;

    private sky: HTMLElement;
    private plateau: HTMLElement;
    private cloud: HTMLElement;

    constructor() {
        let container = document.getElementById("container");

        // Yoshi en enemies worden in aangemaakt en in container gezet.
        this.yoshi = new Player.Yoshi(container);
        this.koopa = new Enemies.Koopa(container, this);
        this.goomba = new Enemies.Goomba(container, this);
        this.flyingKoopa = new Enemies.FlyingKoopaRed.FlyingKoopa(container, this);

        // De enemies worden in de collisionArray gestopt.
        this.collisionArray.push(this.koopa);
        this.collisionArray.push(this.goomba);
        this.collisionArray.push(this.flyingKoopa);

        // De elemten worden gezocht en in variablen gezet
        this.sky = document.getElementById("sky");
        this.plateau = document.getElementById("plateau");
        this.cloud = document.getElementById("cloud");

        // Met de library Greensock heb ik de bovenstaande elementen geanimeerd. Hierdoor zijn de CSS animaties overbdig geworden.
        TweenMax.to(this.sky, 3, {x:-800, y:0, repeat:-1,ease:Linear.easeNone});
        TweenMax.to(this.plateau, 3, {x:-800, repeat:-1,ease:Linear.easeNone});
        TweenMax.to(this.cloud, 5, {x:-1200, repeat:-1,ease:Linear.easeNone});
        
        // Er wordt een eventListener op de refreshknop gezet. Als deze wordt ingedrukt voert hij de refreshage functie uit.
        document.getElementsByTagName("refreshPage")[0].addEventListener("click", () => this.refreshPage());
        requestAnimationFrame(() => this.gameLoop());


    }

    public subscribe(o:Observer){
        this.observers.push(o);
    }

    public unsubscribe(o:Observer){

    }

    private gameLoop(){
        this.yoshi.update();
        this.koopa.draw();
        this.goomba.draw();
        this.flyingKoopa.draw();

        // Laat elk ei uit de array bewegen.
        for (let egg of this.eggCollection) {
            egg.draw();
        }

        this.liveScore();
        this.createEnemiesOnScore();
        this.checkCollision();

        // Checkt of het spel draait, zo niet (als gameover is) dan stopt het spel met draaien.
        if(this.running == true){
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    // Er wordt een Singleton van Game aangemaakt.
    public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private refreshPage(){
        // Refresht de pagina.
        window.location.reload(true);
    }

    private checkCollision() : void{
        let container = document.getElementById('container');

        // checkt of yoshi tegen enemies aan komt
        for(let enemy of this.collisionArray) {
            if(Utils.checkCollision(this.yoshi, enemy)){
                // Zorgt voor de animatie dat Yoshi dood gaat.
                this.yoshi.onEnemyCollision();
                // Als Yoshi tegen een enemy aan komt roept het spel de funtie gameOver aan. Het spel is afgelopen.
                this.gameOver();
            }
        }

        for(let enemy of this.collisionArray) {
            if(this.spawn150){
                if(Utils.checkCollision(this.yoshi, this.powerup)){
                        this.powerup.div.remove();
                        for(let o of this.observers){
                            o.notify();
                        }
                    }
                    
                }
            }
        

        // Checkt of het ei tegen een enemy aan komt.
        for (let egg of this.eggCollection){
             for(let enemy of this.collisionArray) {
                if(Utils.checkCollision(egg, enemy)){
                    // Als een ei een monster raakt wordt de addScore functie aangeroepen (score +10 punten).
                    this.addScore();

                    // als het ei een enemy raakt wordt deze enemy terug gezet op 1000 en een random speed meegegeven.
                    enemy.x = 1000;
                    if(!this.powerupActive){
                        enemy.speed = Math.floor(Math.random() * -6) - 1;
                    }
                    // Checkt of een van de vliegende monsters is geraakt en geeft een random y positie mee.
                    if(enemy == this.collisionArray[2]){
                        this.flyingKoopa.y = Math.floor(Math.random() * 300) + 1;
                    }
                    if(enemy == this.collisionArray[3]){
                        this.flyingKoopa2.y = Math.floor(Math.random() * 300) + 1;
                    } 
                    if(enemy == this.collisionArray[4]){
                        this.lakitu.y = Math.floor(Math.random() * 300) + 1;
                    }
                    
                    // Als het ei een monster aangeraakt heeft wordt het verwijderd en uit de array gehaald.
                    this.eggCollection.splice(egg, 1);
                    egg.div.remove(); 
  
                }
            }
            // Als het ei links uit het veld is wordt deze uit de array gehaald en verwijderd uit de game.
            if(egg.x >= 1200){
                this.eggCollection.splice(egg, 1);
                egg.div.remove();    
            } 
        }
    }

    private liveScore(){
        // Er wordt (bijna) elke seconde een punt bij score opgeteld.
        this.score += 0.020;
        document.getElementById("liveScore").innerHTML = "Score: " + Math.floor(this.score);
    }

    private addScore(){
        this.score += 10;
    }

    private createEnemiesOnScore(){
        let container = document.getElementById("container");

        // Als de score tussen de 50-70 is wordt een nieuwe Flyingkoopa in het spel gezet en in de collisionArray.
        if(this.score > 50 && this.score  < 70 && !this.spawn50 ){
            this.flyingKoopa2= new Enemies.FlyingKoopaGreen.FlyingKoopa(container, this);
            this.collisionArray.push(this.flyingKoopa2);
            // Zorgt ervoor dat hij maar 1 keer in het spel wordt gezet
            this.spawn50 = true;
        }
        // Als de score tussen de 100-120 is wordt een Lakitu in het spel gezet en in de collisionArray.
        else if(this.score > 100 && this.score  < 120 && !this.spawn100 ){
            this.lakitu= new Enemies.Lakitu(container, this);
            this.collisionArray.push(this.lakitu);
            // Zorgt ervoor dat hij maar 1 keer in het spel wordt gezet
            this.spawn100 = true;
        }
        else if(this.score > 150 && this.score  < 170 && !this.spawn150 ){
            this.powerup= new Powerup(container);
            // Zorgt ervoor dat hij maar 1 keer in het spel wordt gezet
            this.spawn150 = true;
        }

        // Als de monsters in het spel wordt gezet worden deze getekent.
        if(this.spawn50){
            this.flyingKoopa2.draw();
        }
        if(this.spawn100){
            this.lakitu.draw();
        }
        if(this.spawn150){
            this.powerup.draw();
        }
        
    }


    private gameOver(){

        let counter = { score: 0 };
        TweenMax.to(counter, 2, {
            score: Math.floor(this.score), 
            onUpdate: function () {
                document.getElementById("endScore").innerHTML = " "+ Math.floor(counter.score);
            },
            ease:Circ.easeOut
        });


        // De spelers is af dus de Greensock animaties worden stop gezet.
        TweenMax.killTweensOf(this.sky);
        TweenMax.killTweensOf(this.plateau);
        TweenMax.killTweensOf(this.cloud);

        // Er wordt text op het scherm gezet met de score en hoe je opnieuw kan spelen.
        document.getElementById("score").innerHTML = "Score";
        document.getElementById("gameOver").innerHTML = "Game Over!";
        document.getElementById("tryAgain").innerHTML = "You are dead! Click refresh button to try again.";
        
        // De score die tijdens het spelen link boven stond wordt verwijderd.
        document.getElementById("liveScore").remove();

        // De refreshbutton die tijdens het spelen linksboven stond wordt met Greensock naar het midden gebracht en groter gemaakt.
        let refreshbtn = document.getElementById("btn_refreshPage");
        TweenLite.to(refreshbtn, 2, {x:-365, y:270, scale:1.5});

        this.timer --;
        if(this.timer < 1){
            this.running = false;
        }
        console.log(this.timer);
    }

    public addEgg(egg){
        // De aagemaakte eieren worden in een array geplaatst.
        this.eggCollection.push(egg);
        console.log(this.eggCollection);
    }
} 


// load
window.addEventListener("load", function() {
    // Er wordt een Sigleton van Game aangeroepen.
    let g : Game = Game.getInstance();
});