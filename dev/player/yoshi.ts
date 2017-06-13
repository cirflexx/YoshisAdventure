/// <reference path="../gameObject.ts" />
namespace Player {
    export class Yoshi extends GameObject {
        private behavior: Behavior
        private egg: Projectile.Egg;

        public jumpDirection: number;
        private timer: number = 1;
        private shooting: boolean = false;

        constructor(parent: HTMLElement) {
            super();
            //Maakt Yoshi aan.
            this.div = document.createElement("yoshi");
            parent.appendChild(this.div);

            this.speed = 0;
            this.jumpDirection = -3;
            this.x = 18;
            this.y = 340;
            this.height = 70;
            this.width = 70;

            //Maakt nieuw VihicleCloud (wolkje onder Yoshi)
            let vehicleCloud = new VehicleCloud(this.div, -18, 50);

            this.behavior = new MoveLeft(this);

            window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
            window.addEventListener("mousedown", (e: MouseEvent) => this.onKeyDown(e));
        }


        private onKeyDown(e: Event): void {

            if (e instanceof KeyboardEvent) {
                //Omhoog
                if (e.keyCode == Controls.UP && Game.getInstance().running == true) {
                    this.behavior = new MoveUp(this);
                    // this.onMoveUp();
                }
                //Omlaag
                if (e.keyCode == Controls.DOWN && Game.getInstance().running == true) {
                    this.behavior = new MoveDown(this);
                    // this.onMoveDown();
                }
                //Rechts
                if (e.keyCode == Controls.RIGHT && Game.getInstance().running == true) {
                    this.behavior = new MoveRight(this);
                    // this.onMoveRight();
                }
                //Links
                if (e.keyCode == Controls.LEFT && Game.getInstance().running == true) {
                    this.behavior = new MoveLeft(this);
                    // this.onMoveLeft();
                }
                //Schieten met spatie
                if (e.keyCode == Controls.SPACE && Game.getInstance().running == true) {
                    this.onShoot();
                }
            }
            // Schieten met muis
            if (e instanceof MouseEvent) {
                this.onShoot();
            }
        }

        public update(): void {
            // De animaties die in de behaviors staan worden uitgevoerd.
            this.behavior.performBehavior();
            this.behavior.move();

            // Als er geschoten is wordt een timer gestart. Speler kan niet spammen.
            if (this.shooting = true) {
                this.timer++;
            }

        }

        public onEnemyCollision() {
            //De speler gaat dood
            this.behavior = new Dead(this);
        }

        public onShoot() {
            //Speler schiet een ei af zodra de timer groter is dan 20;
            this.shooting = true;
            if (this.timer > 20) {
                this.timer = 1;
                this.shooting = false;
                this.behavior = new Shoot(this.x, this.y);
            }
        }
    }
}

import yoshi = Player.Yoshi;