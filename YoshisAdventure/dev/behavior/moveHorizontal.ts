/*class MoveHorizontal implements Behavior{
        public yoshi : Yoshi;
        public mv : MoveVertical;
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
    }

    public onGoBack(){
        this.yoshi.speed = 5;
        this.yoshi.x -= this.yoshi.speed;
    }

    public onGoUp(){
        this.mv.onGoUp();
    }

    public onGoDown(){
        this.mv.onGoDown();
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
    
}*/