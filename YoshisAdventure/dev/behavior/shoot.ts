class Shoot implements Behavior{
        public yoshi : Yoshi;
        public vehicleCloud : VehicleCloud;
        //public mv : MoveVertical;
        public idle: Idle;
        public dead : Dead;
        //public mh : MoveHorizontal;
        public m : Move;
        private egg: Egg;

    constructor(){
        let container = document.getElementById("container");
        this.egg = new Egg(container);

    }

    public performBehavior() : void{
        this.egg.div.style.transform = "translate(" + this.egg.x + "px," + this.egg.y + "px)"; 
    }

    public onShoot(): void{
        console.log("on shoot class");
        this.egg.x += this.egg.speed;
    }

    public onDead(): void {
        this.dead.onDead();
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

    public onIdle(){
        this.idle.onIdle();
    }
    
}