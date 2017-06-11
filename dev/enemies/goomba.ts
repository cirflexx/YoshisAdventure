/// <reference path="enemy.ts" />
namespace Enemies{
    export class Goomba extends Enemy {
        constructor(parent:HTMLElement) {
            super("goomba", parent);

            this.speed = -4;
            this.x = 850;
            this.y = 352;
            this.height = 50;
            this.width = 50;
        }

        public draw():void {
            super.draw();
        }
    }
}

import goomba = Enemies.Goomba;
    