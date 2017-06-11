class Shoot implements Behavior{
        public yoshi : Player.Yoshi;
        public vehicleCloud : Player.VehicleCloud;
        public dead : Dead;
        public m : Move;
        private egg: Projectile.Egg;

    constructor(x: number, y: number){
        let egg = new Projectile.Egg(document.getElementById("container"), y, x);
        Game.getInstance().addEgg(egg);
    }

    public performBehavior() : void{
    }

    public onShoot(): void{
    }

    public onGoUp(){
        this.m.onGoUp();
    }

    public onGoDown(){
        this.m.onGoDown();
    }

    public onGoForward(){
        this.m.onGoForward();
    }
   
    public onGoBack(){
        this.m.onGoBack();
    }
    
}