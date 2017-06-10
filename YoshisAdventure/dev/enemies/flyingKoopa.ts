/// <reference path="enemy.ts" />


class FlyingKoopa extends Enemy {

    public speed:number;
    public x:number;
    public y:number;
    public height:number;
    public width: number;
            
    constructor(parent:HTMLElement) {
        super("flying-koopa", parent);

        this.speed = -3;
        this.x = 1000;
        this.y = 250;
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
        }
    }

}