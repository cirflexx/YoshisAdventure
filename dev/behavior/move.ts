

// Code door Robin
// Class MoveVertical en moveHorizontal zijn samengevoegd tot 1 move class.
// Dit scheelt dubbele code, terwijl alles nog gewoon werkt.

class Move implements Behavior{
        public yoshi : Yoshi;
        public dead : Dead;
        public shoot: Shoot;

    constructor(y : Yoshi){
        this.yoshi = y;
    }

    public performBehavior() : void{
        this.yoshi.div.style.transform = "translate(" + this.yoshi.x + "px," + this.yoshi.y + "px)"; 
    }

    public onGoForward(){
        this.yoshi.speed = 7;
        this.yoshi.x += this.yoshi.speed;

    }

    public onGoBack(){
        this.yoshi.speed = 5;
        this.yoshi.x -= this.yoshi.speed;
    }

    public onGoUp(){

        this.yoshi.y -= this.yoshi.jumpDirection = 7;
        if (this.yoshi.y < 0){
            this.yoshi.y = 0;
        }
    }

    public onGoDown(){

        this.yoshi.y += this.yoshi.jumpDirection = 7;
        if (this.yoshi.y > 332){
            this.yoshi.y = 332;
        }
        console.log("this is Y: " + this.yoshi.y);
    }

    public onShoot(): void{
        this.shoot.onShoot();
    }    
    
}