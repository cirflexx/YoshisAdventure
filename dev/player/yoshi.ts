/// <reference path="../gameObject.ts" />
namespace Player{
    export class Yoshi extends GameObject {
        private behavior : Behavior
        public egg: Projectile.Egg;

        public jumpDirection: number;
        private timer : number  = 1;
        private shooting : boolean = false;
        public score: number;


        constructor(parent: HTMLElement) {
            super();
            this.div = document.createElement("yoshi");
            parent.appendChild(this.div);

            this.speed = 0;
            this.jumpDirection = -3;
            this.x = 18;
            this.y = 340;
            this.height = 70;
            this.width = 70; 

            let vehicleCloud = new VehicleCloud(this.div, -18, 50);

            this.behavior = new Move(this);

            window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        }


        private onKeyDown(e: KeyboardEvent): void {
            console.log(e.key);
            
            if(e.keyCode == Controls.UP && Game.getInstance().running == true) {
                this.behavior = new Move(this);
                this.onGoUp();
            }

            if(e.keyCode == Controls.DOWN && Game.getInstance().running == true) {
                this.behavior = new Move(this);
                this.onGoDown();
            }

            if(e.keyCode == Controls.RIGHT && Game.getInstance().running == true) {
                this.behavior = new Move(this);
                this.onGoForward();
            }
            if(e.keyCode ==  Controls.LEFT && Game.getInstance().running == true){
                this.behavior = new Move(this);
                this.onGoBack();
            }
            if(e.keyCode == Controls.SPACE && Game.getInstance().running == true){
                this.shooting = true;
                if(this.timer > 20){
                    this.timer = 1;
                    this.shooting = false;
                    this.onShoot();
                }
            }
        }

        public update():void {
            // De animaties die in de behaviors staan worden uitgevoerd.
            this.behavior.performBehavior();

            if(this.shooting = true){
                this.timer ++;
            }

        } 

        public onEnemyCollision(){
            this.behavior = new Dead(this);
        }

        public onGoUp():void {
            this.behavior.onGoUp();
        }

        public onGoDown():void {
            // console.log("Jumping!");
            this.behavior.onGoDown();
        }

        public onGoForward():void{
            this.behavior.onGoForward();
        }

        public onGoBack() : void{
            this.behavior.onGoBack();
        }

        public onShoot(){
            this.behavior = new Shoot(this.x, this.y);
        }
    }
}

import yoshi = Player.Yoshi;