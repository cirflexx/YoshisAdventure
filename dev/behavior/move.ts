

// Code door Robin
// Class MoveVertical en moveHorizontal zijn samengevoegd tot 1 move class.
// Dit scheelt dubbele code, terwijl alles nog gewoon werkt.

class Move implements Behavior{
        public yoshi : Yoshi;
        //public mv : MoveVertical;
        public idle: Idle;
        public dead : Dead;
        public shoot: Shoot;

    constructor(y : Yoshi){
        this.yoshi = y;
    }

    public performBehavior() : void{
        this.yoshi.div.style.transform = "translate(" + this.yoshi.x + "px," + this.yoshi.y + "px)"; 
    }

    public onGoForward(){
        this.yoshi.speed = 5;
        this.yoshi.x += this.yoshi.speed;

        // test code door Robin
        if(this.yoshi.speed >= 1){
            this.yoshi.speed = 1;
        }else{
            this.yoshi.speed += 1;
        }
    }

    public onGoBack(){
        this.yoshi.speed = 5;
        this.yoshi.x -= this.yoshi.speed;
    }

    public onGoUp(){

        this.yoshi.y -= this.yoshi.jumpDirection = 3;
        if (this.yoshi.y < 0){
            this.yoshi.y = 0;
        }
    }

    public onGoDown(){

        this.yoshi.y += this.yoshi.jumpDirection = 3;
        if (this.yoshi.y > 332){
            this.yoshi.y = 332;
        }
        console.log("this is Y: " + this.yoshi.y);
    }

    public onIdle(){
        this.yoshi.behavior = new Idle(this.yoshi);
    }

    public onDead(): void {
        this.yoshi.behavior = new Dead(this.yoshi);
    }

    public onShoot(): void{
        this.shoot.onShoot();
    }    
    
}