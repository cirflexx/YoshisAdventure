class Egg {

    public speed:number;
    public div:HTMLElement;
    public x:number;
    public y:number;
    public height:number;
    public width: number;
    
    private behavior: Behavior;
            
    constructor(parent:HTMLElement) {
        this.div = document.createElement("egg");
        parent.appendChild(this.div);

        this.speed = 5;
        this.y = 332;
        this.x = 0;
        this.height = 50;
        this.width = 50;
    }

    public draw():void {
    }

}