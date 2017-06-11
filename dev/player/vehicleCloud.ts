/// <reference path="../gameObject.ts" />
namespace Player{
    export class VehicleCloud extends GameObject {
                
        constructor(parent:HTMLElement, _X: number, _Y: number) {
            super();
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
}

import vh = Player.VehicleCloud;