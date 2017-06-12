class Idle implements Behavior{
        public yoshi : Player.Yoshi;
        public shoot: Shoot;  
        public m: Move;      

    constructor(y : Player.Yoshi){
    }

    public performBehavior() : void{

    }

    public onIdle(){
        this.yoshi.div.style.backgroundImage = "url('https://media.giphy.com/media/brvL9sNJZtFZe/giphy.gif?response_id=59205316163de286ba4848ec')";
    }

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

    public onShoot(): void{
        this.shoot.onShoot();
    }    
    
}