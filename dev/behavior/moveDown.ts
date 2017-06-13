class MoveDown implements Behavior{
    public yoshi : Player.Yoshi;
    constructor(y : Player.Yoshi){
        this.yoshi = y;
    }

    public performBehavior() : void{
        this.yoshi.div.style.transform = "translate(" + this.yoshi.x + "px," + this.yoshi.y + "px)"; 
    }

    public move(){
        this.yoshi.y += this.yoshi.jumpDirection = 4;
        if (this.yoshi.y > 332){
            this.yoshi.y = 332;
        }
    }

    public onShoot(){
        
    }
}