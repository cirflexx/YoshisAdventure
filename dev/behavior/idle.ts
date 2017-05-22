class Idle implements Behavior{
        public yoshi : Yoshi;
        public mv : MoveVertical;
        public mh : MoveHorizontal;
        public dead: Dead;
        public shoot: Shoot;        

    constructor(y : Yoshi){
        this.yoshi = y;
    }

    public performBehavior() : void{

    }

    public onIdle(){
        this.yoshi.div.style.backgroundImage = "url('https://media.giphy.com/media/brvL9sNJZtFZe/giphy.gif?response_id=59205316163de286ba4848ec')";
    }

    public onGoForward(){
        this.mh.onGoForward();
    }

    public onGoBack(){
        this.mh.onGoBack();
    }

    public onGoUp(){
        this.mv.onGoUp();
    }

    public onGoDown(){
        this.mv.onGoDown();
    }

    public onDead(): void {
        this.dead.onDead();
    }

    public onShoot(): void{
        this.shoot.onShoot();
    }    
    
}