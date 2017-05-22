class FlyingKoopa {

    public speed:number;
    private div:HTMLElement;
    public x:number;
    public y:number;
    public height:number;
    public width: number;
            
    constructor(parent:HTMLElement) {
        this.div = document.createElement("flying-koopa");
        parent.appendChild(this.div);

        this.speed = -3;
        this.x = 1000;
        this.y = 250;
        this.height = 70;
        this.width = 70;
    }

    public draw():void {
        this.x += this.speed;
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    }

}