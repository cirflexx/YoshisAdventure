/// <reference path="enemy.ts" />
namespace Enemies {
    export class Goomba extends Enemy implements Observer {
        constructor(parent: HTMLElement, subject: Subject) {
            super("goomba", parent);

            subject.subscribe(this);
            this.speed = -4;
            this.x = 850;
            this.y = 352;
            this.height = 50;
            this.width = 50;
        }

        public notify() {
            //Krijgt een notify binnen van game.ts en voert de functie uit
            this.changeMovementSpeed();
        }

        public changeMovementSpeed() {
            //Goomba wordt voor 5 seconden vertraagd.
            this.speed = -0.5;
            setInterval(() => this.changeSpeedBack(), 5000);
        }

        public changeSpeedBack() {
            //Als de 5 seconden voorbij zijn krijgt Goomba zijn snelheid terug.
            this.speed = -5;
        }
    }
}

import goomba = Enemies.Goomba;
