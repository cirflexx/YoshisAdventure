class Koopa {

    public speed:number;
    private div:HTMLElement;
    public x:number;
    public y:number;
    public height:number;
    public width: number;
            
    constructor(parent:HTMLElement) {
        this.div = document.createElement("koopa");
        parent.appendChild(this.div);

        this.speed = -4;
        this.x = 800;
        this.y = 352;
        this.height = 50;
        this.width = 50;
    }

    public draw():void {
        this.x += this.speed;
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    }

}