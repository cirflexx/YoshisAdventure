class Enemy {

    public speed:number;
    public div:HTMLElement;
    private game : Game;
    public x:number;
    public y:number;

            
    constructor(item: string, parent:HTMLElement) {
        this.div = document.createElement(item);
        parent.appendChild(this.div);

        this.speed = -4;

    }

    public draw():void {
        this.x += this.speed;
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";

        if(this.x <= -93){
            this.x = 1283;
        }
    }
} 