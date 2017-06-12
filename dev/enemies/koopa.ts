/// <reference path="enemy.ts" />
namespace Enemies{
    export class Koopa extends Enemy implements Observer{
        constructor(parent:HTMLElement, subject: Subject) {
            super("koopa", parent);

            subject.subscribe(this);
            this.speed = -5;
            this.x = 800;
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
            this.speed = -5;
        }

        public draw():void {
            super.draw();
        }
    }
}

import koopa = Enemies.Koopa;