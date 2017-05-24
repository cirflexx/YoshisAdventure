class Game {

    private yoshi : Yoshi;
    private koopa : Koopa;
    //private goomba : Goomba;
    private flyingKoopa: FlyingKoopa;
    private vehicleCloud : VehicleCloud;
    //private mv : MoveVertical;
    private m : Move;
    private egg:  Egg;
    private static instance: Game;
    
    public collision: boolean;
    public running: boolean = true;
    private timer : number  = 200;

    constructor() {
        let container = document.getElementById("container");
        this.yoshi = new Yoshi(container, this);
        this.koopa = new Koopa(container);
        //this.goomba = new Goomba(container);
        this.flyingKoopa = new FlyingKoopa(container);

        document.getElementsByTagName("refreshPage")[0].addEventListener("click", () => this.refreshPage());

        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        this.checkCollision();
        this.yoshi.update();
        this.koopa.draw();
        //this.goomba.draw();
        this.flyingKoopa.draw();

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

    public checkCollision() : Boolean{
        
        if (this.yoshi.x < this.koopa.x + this.koopa.width &&
        this.yoshi.x + this.yoshi.width > this.koopa.x &&
        this.yoshi.y < this.koopa.y + this.koopa.height &&
        this.yoshi.height + this.yoshi.y > this.koopa.y) {
            // collision detected!
            console.log("Collison ofzo");
            return this.collision = true;
        }

        else if(this.yoshi.x < this.flyingKoopa.x + this.flyingKoopa.width &&
        this.yoshi.x + this.yoshi.width > this.flyingKoopa.x &&
        this.yoshi.y < this.flyingKoopa.y + this.flyingKoopa.height &&
        this.yoshi.height + this.yoshi.y > this.flyingKoopa.y) {
            // collision detected!
            console.log("Collison ofzo");
            return this.collision = true;
        }
    }

    public gameOver(score: number){

        document.getElementById("tryAgain").innerHTML = "Game over! Score: " + score + ". Click refresh button to try again.";
        
        document.getElementById("gameOver").innerHTML = "Game Over!";
        //document.getElementById("tryAgain").innerHTML = "Please click on the refresh button in the top right to try again!";
        document.getElementById("plateau").classList.add("animationpaused");
        document.getElementById("sky").classList.add("animationpaused");
        console.log("You're a dead yoshi...");

        this.timer --;
        if(this.timer < 1){
            this.running = false;
        }
        console.log(this.timer);
    }
} 


// load
window.addEventListener("load", function() {
    let g : Game = Game.getInstance();
});