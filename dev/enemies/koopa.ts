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
            //Krijgt een notify binnen van Game.ts en voert de functie uit
            this.changeMovementSpeed();
        }

        public changeMovementSpeed(){
            //Koopa wordt voor 5 seconden vertraagd.
            this.speed = -0.5;
            setInterval(() => this.changeSpeedBack(), 5000);
        }

        public changeSpeedBack(){
            //Als de 5 seconden voorbij zijn krijgt koopa zijn snelheid terug.
            this.speed = -5;
        }
    }
}

import koopa = Enemies.Koopa;