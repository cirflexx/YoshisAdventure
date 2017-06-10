/// <reference path="enemy.ts" />
class Goomba extends Enemy {

    constructor(parent:HTMLElement) {
        super("goomba", parent);

        this.speed = -4;
        this.x = 850;
        this.y = 352;
        this.height = 50;
        this.width = 50;
    }

    public draw():void {
        this.x += this.speed;
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";

        // Code door Robin
        // Als FlyingKoopa uit het scherm is, wordt hij teruggezet naar x = 900. Anders heeft de game geen uitdaging meer na een paar seconden
        if(this.x <= -90){
            this.x = 900;
            Game.getInstance().score -=5;
        }
    }

}