class Dead implements Behavior{
        public yoshi : Player.Yoshi;       

    constructor(y: Player.Yoshi){
        this.yoshi = y;
        this.yoshi.speed  = 0;
        this.yoshi.div.style.backgroundImage = "url('images/yoshi-dead.gif')";
        this.yoshi.div.style.backgroundSize = "100%";
        this.yoshi.div.style.width = "70px";
        this.yoshi.div.style.height = "70px";;
    }

    public performBehavior() : void{
    }

    public move(){

    }

    // public onGoUp(){
    // }

    // public onGoDown(){
    // }

    // public onGoForward(){
    // }
   
    // public onGoBack(){
    // }

    public onShoot(): void{
    }
}