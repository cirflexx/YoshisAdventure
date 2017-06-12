/// <reference path="enemy.ts" />
namespace Enemies{
    export class Goomba extends Enemy implements Observer {
        constructor(parent:HTMLElement, subject: Subject) {
            super("goomba", parent);

            subject.subscribe(this);
            this.speed = -4;
            this.x = 850;
            this.y = 352;
            this.height = 50;
            this.width = 50;
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
            this.speed = -4;
        }

        public draw():void {
            super.draw();
        }
    }
}

import goomba = Enemies.Goomba;
    