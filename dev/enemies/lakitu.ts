/// <reference path="enemy.ts" />
namespace Enemies{
    export class Lakitu extends Enemy implements Observer {
        constructor(parent:HTMLElement, subject: Subject) {
            super("lakitu", parent);

            subject.subscribe(this);
            this.speed = -3;
            this.x = 1000;
            this.y = Math.floor(Math.random() * 270) + 1;
            this.height = 70;
            this.width = 70;
        }

        public notify(){
            this.changeMovementSpeed();
        }

        public changeMovementSpeed(){
            console.log("chnaging speed!");
            this.speed = -0.5;
            setInterval(() => this.changeSpeedBack(), 5000);
        }

        public changeSpeedBack(){
            console.log("Changing speed back!");
            this.speed = -3
        }

        public draw():void {
            this.x += this.speed;
            this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";

            if(this.x <= -130){
                this.x = 900;
                this.y = Math.floor(Math.random() * 270) + 1;
                if(Game.getInstance().powerupActive == false){
                        this.speed = Math.floor(Math.random() * -6) - 1;
                    }
                Game.getInstance().score -=10;
            }
        }
    }
}

import lakitu = Enemies.Lakitu;