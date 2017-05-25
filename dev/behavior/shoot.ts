class Shoot implements Behavior{
        public yoshi : Yoshi;
        public vehicleCloud : VehicleCloud;
        public mv : MoveVertical;
        public idle: Idle;
        public dead : Dead;
        public mh : MoveHorizontal;
        private egg: Egg;

    constructor(){
        let container = document.getElementById("container");
        this.egg = new Egg(container);

    }

    public performBehavior() : void{
        //Div in egg moet public zijn om er gebruik van te kunnen maken 
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
        this.mv.onGoUp();
    }

    public onGoDown(){
        this.mv.onGoDown();
    }

    public onGoForward(){
        this.mh.onGoForward();
    }
   
    public onGoBack(){
        this.mh.onGoBack();
    }

    public onIdle(){
        this.idle.onIdle();
    }
    
}