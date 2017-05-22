class VehicleCloud {

    public speed:number;
    private div:HTMLElement;
    public x:number;
    public y:number;
    public height:number;
    public width: number;
            
    constructor(parent:HTMLElement, _X: number, _Y: number) {
        this.div = document.createElement("vehicleCloud");
        parent.appendChild(this.div);

        this.speed = 0;
        this.x = _X;
        this.y = _Y;
        this.height = 50;
        this.width = 50;

        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    }

}