class Enemy extends GameObject {
            
    constructor(item: string, parent:HTMLElement) {
        super();
        this.div = document.createElement(item);
        parent.appendChild(this.div);

        this.speed = -4;

    }
} 

