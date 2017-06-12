class Move implements Behavior{
        public yoshi : Player.Yoshi;
        public shoot: Shoot;

    constructor(y : Player.Yoshi){
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
        this.yoshi.speed = 7;
        this.yoshi.x -= this.yoshi.speed;
        if (this.yoshi.x < 0){
            this.yoshi.x = 0;
        }

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
    }

    public onShoot(): void{
        this.shoot.onShoot();
    }    
    
}