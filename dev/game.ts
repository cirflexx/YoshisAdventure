class Game {

    private yoshi : Yoshi;
    private koopa : Koopa;
    private goomba : Goomba;
    private flyingKoopa: FlyingKoopa;
    private flyingKoopa2: FlyingKoopa2;
    private vehicleCloud : VehicleCloud;
    private m : Move;
    private static instance: Game;
    private e : Egg;
    private collisionArray = [];
    private enemy: Enemy;
    public collision: boolean;
    public running: boolean = true;
    private timer : number  = 200;
    private eggCollection = [];

    private score: number = 1;
    private spawn50 : boolean = false;
    private spawn100 : boolean = false;
    private spawn150 : boolean = false;

    constructor() {
        let container = document.getElementById("container");
        this.yoshi = new Yoshi(container);
        this.koopa = new Koopa(container);
        this.goomba = new Goomba(container);
        this.flyingKoopa = new FlyingKoopa(container);

        this.collisionArray.push(this.koopa);
        this.collisionArray.push(this.goomba);
        this.collisionArray.push(this.flyingKoopa);

        console.log(this.collisionArray);
        this.score = 1;
        this.liveScore();

        document.getElementsByTagName("refreshPage")[0].addEventListener("click", () => this.refreshPage());
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        this.checkCollision();
        this.yoshi.update();
        this.koopa.draw();
        this.goomba.draw();
        this.flyingKoopa.draw();


        for (let egg of this.eggCollection) {
            egg.draw();
        }
        this.liveScore();
        this.createEnemiesOnScore();

        if(this.running == true){
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    public refreshPage(){
        window.location.reload(true);
    }

    public checkCollision() : void{
        let container = document.getElementById('container');

        // check yoshi tegen enemies
        for(let enemy of this.collisionArray) {
            if(Utils.checkCollision(this.yoshi, enemy)){
                console.log(enemy + " raakt yoshi");
                this.yoshi.onEnemyCollision();
                this.gameOver();
            }
        }

        for (let egg of this.eggCollection){
             for(let enemy of this.collisionArray) {
                if(Utils.checkCollision(egg, enemy)){
                    console.log(egg + " raakt enemy");
                    this.addScore();
                    enemy.x = 1000;
                    enemy.speed = Math.floor(Math.random() * -6) - 1;

                    if(enemy == this.collisionArray[2]){
                        this.collisionArray[2].y = Math.floor(Math.random() * 250) + 1;
                    }
                    else if(enemy == this.collisionArray[3]){
                        this.collisionArray[3].y = Math.floor(Math.random() * 250) + 1;
                    }                    

                    this.eggCollection.splice(egg, 1);
                    container.removeChild(egg.div);
                }
            }
            if(egg.x >= 750){
                console.log(this.eggCollection); 
                this.eggCollection.splice(egg, 1);
                container.removeChild(egg.div);   

            } 
        }
    }

    public liveScore(){
        this.score += 0.020;
        document.getElementById("liveScore").innerHTML = "Score: " + Math.floor(this.score);
    }

    public addScore(){
        this.score += 10;
    }

    public createEnemiesOnScore(){
        // Blijft enemies spawnen!

        console.log("Score: " + Math.floor(this.score));
        let container = document.getElementById("container");

        if(this.score > 50 && this.score  < 70 && !this.spawn50 ){
            this.flyingKoopa2= new FlyingKoopa2(container);
            this.collisionArray.push(this.flyingKoopa2);
            this.spawn50 = true;
        }
        // else if(Math.floor(this.score) == 150){
        //     this.flyingKoopa= new FlyingKoopa(container);
        //     this.koopa= new Koopa(container);
        //     this.collisionArray.push(this.flyingKoopa);
        //     this.collisionArray.push(this.koopa);
        // }

        if(this.spawn50 || this.spawn100 || this.spawn150){
            this.flyingKoopa2.draw();
        }
        
    }


    public gameOver(){

        document.getElementById("tryAgain").innerHTML = "Game over! Score: " + Math.floor(this.score) + ". Click refresh button to try again.";
        document.getElementById("liveScore").remove();
        document.getElementById("gameOver").innerHTML = "Game Over!";
        document.getElementById("plateau").classList.add("animationpaused");
        document.getElementById("sky").classList.add("animationpaused");
        console.log("You're a dead yoshi...");

        this.timer --;
        if(this.timer < 1){
            this.running = false;
        }
        console.log(this.timer);
    }

    public addEgg(egg){
        this.eggCollection.push(egg);
        console.log(this.eggCollection);
    }
} 


// load
window.addEventListener("load", function() {
    let g : Game = Game.getInstance();
});