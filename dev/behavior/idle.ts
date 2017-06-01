class Idle implements Behavior{
        public yoshi : Yoshi;
        //public mv : MoveVertical; Deze bestaat niet meer (door Robin)
        //public mh : MoveHorizontal; Deze bestaat niet meer (door Robin)
        public m : Move;
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

    // mh en mv zijn hieronder vervangen door m (door Robin)
    public onGoForward(){
        this.m.onGoForward();
    }

    public onGoBack(){
        this.m.onGoBack();
    }

    public onGoUp(){
        this.m.onGoUp();
    }

    public onGoDown(){
        this.m.onGoDown();
    }

    public onDead(): void {
        this.dead.onDead();
    }

    public onShoot(): void{
        this.shoot.onShoot();
    }    
    
}