class MoveRight implements Behavior{
    public yoshi : Player.Yoshi;
    constructor(y : Player.Yoshi){
        this.yoshi = y;
    }

    public performBehavior() : void{
        this.yoshi.div.style.transform = "translate(" + this.yoshi.x + "px," + this.yoshi.y + "px)"; 
    }

    public move(){
        this.yoshi.speed = 4;
        this.yoshi.x += this.yoshi.speed;
        if (this.yoshi.x > 750){
            this.yoshi.x = 750;
        }
    }

    public onShoot(){

    }
}