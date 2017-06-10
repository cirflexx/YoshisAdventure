/// <reference path="gameObject.ts" />


class Egg extends GameObject {
    
    private behavior: Behavior;
            
    constructor(parent:HTMLElement, y: number, x: number) {
        super();
        this.div = document.createElement("egg");
        parent.appendChild(this.div);

        this.speed = 5;
        this.y = y;
        this.x = x;
        this.height = 50;
        this.width = 50;
    }

    public draw():void {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }

}