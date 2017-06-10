/*class MoveVertical implements Behavior{
        public yoshi : Yoshi;
        public mh: MoveHorizontal;
        public idle: Idle;
        public dead: Dead;
        public shoot: Shoot;

    constructor(y : Yoshi){
        this.yoshi = y;
    }

    public performBehavior() : void{
        this.yoshi.div.style.transform = "translate(" + this.yoshi.x + "px," + this.yoshi.y + "px)";

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

    public onGoForward(){
       this.mh.onGoForward();
    }
   
    public onGoBack(){
       this.mh.onGoBack();
    }

    public onIdle(){
        this.yoshi.behavior = new Idle(this.yoshi);
    }

     public onDead(): void {
         this.dead.onDead();
     }

    public onShoot(): void{
        this.shoot.onShoot();
    }
    
}*/