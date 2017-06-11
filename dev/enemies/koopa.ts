/// <reference path="enemy.ts" />
namespace Enemies{
    export class Koopa extends Enemy{
        constructor(parent:HTMLElement) {
            super("koopa", parent);

            this.speed = -5;
            this.x = 800;
            this.y = 352;
            this.height = 50;
            this.width = 50;
        }

        public draw():void {
            super.draw();
        }
    }
}

import koopa = Enemies.Koopa;