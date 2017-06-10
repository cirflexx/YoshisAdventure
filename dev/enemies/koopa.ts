/// <reference path="enemy.ts" />


class Koopa extends Enemy{

            
    constructor(parent:HTMLElement) {
        super("koopa", parent);

        this.speed = -5;
        this.x = 800;
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
        }
    }
}