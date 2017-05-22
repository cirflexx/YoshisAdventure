class Dead implements Behavior{
        public yoshi : Yoshi;
        public vehicleCloud : VehicleCloud;
        public mv : MoveVertical;
        public idle: Idle;
        public shoot: Shoot;        

    constructor(y: Yoshi){
        this.yoshi = y;
    }

    public performBehavior() : void{
    }

    public onDead(): void {
        this.yoshi.speed  = 0;
        this.yoshi.div.style.backgroundImage = "url('images/yoshi-dead.gif')";
        this.yoshi.div.style.backgroundSize = "100%";
        this.yoshi.div.style.width = "70px";
        this.yoshi.div.style.height = "70px";;

        Game.getInstance().gameOver();
    }

    public onGoUp(){
    }

    public onGoDown(){
    }

    public onGoForward(){
    }
   
    public onGoBack(){
    }

    public onIdle(){
    }

    public onShoot(): void{
    }
    
}