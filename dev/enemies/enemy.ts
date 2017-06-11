abstract class Enemy extends GameObject {
            
    constructor(item: string, parent:HTMLElement) {
        super();
        this.div = document.createElement(item);
        parent.appendChild(this.div);

        this.speed = -4;
    }

    public draw(){
            this.x += this.speed;
            this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";

            // Code door Robin
            // Als FlyingKoopa uit het scherm is, wordt hij teruggezet naar x = 900. Anders heeft de game geen uitdaging meer na een paar seconden
            if(this.x <= -90){
                this.x = 900;
                Game.getInstance().score -=10;
            }
    }
} 

