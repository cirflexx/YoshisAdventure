class Shoot implements Behavior{
        public yoshi : Player.Yoshi;
        public ml : MoveLeft;
        private egg: Projectile.Egg;

    constructor(x: number, y: number){
        let egg = new Projectile.Egg(document.getElementById("container"), y, x);
        Game.getInstance().addEgg(egg);
    }

    public performBehavior() : void{
    }

    public onShoot(): void{
    }

    public move(){

    }
    
}