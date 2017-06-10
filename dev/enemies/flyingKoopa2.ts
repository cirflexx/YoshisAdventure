<<<<<<< HEAD
/// <reference path="enemy.ts" />
=======
>>>>>>> origin/master
class FlyingKoopa2 extends Enemy {
            
    constructor(parent:HTMLElement) {
        super("flying-koopa2", parent);

        this.speed = -3;
        this.x = 1000;
<<<<<<< HEAD
        this.y = Math.floor(Math.random() * 270) + 1;
=======
        this.y = Math.floor(Math.random() * 250) + 1;
>>>>>>> origin/master
        this.height = 70;
        this.width = 70;
    }

    public draw():void {
        this.x += this.speed;
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";

        // Code door Robin
        // Als FlyingKoopa uit het scherm is, wordt hij teruggezet naar x = 900. Anders heeft de game geen uitdaging meer na een paar seconden
        if(this.x <= -130){
            this.x = 900;
<<<<<<< HEAD
            this.y = Math.floor(Math.random() * 270) + 1;
            this.speed = Math.floor(Math.random() * -6) - 1;
            Game.getInstance().score -=5;
=======
            this.y = Math.floor(Math.random() * 250) + 1;
            this.speed = Math.floor(Math.random() * -6) - 1;
>>>>>>> origin/master
        }
    }

}