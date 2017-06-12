    class Powerup extends GameObject {

        constructor(parent:HTMLElement) {
            super();
            this.div = document.createElement("powerup");
            parent.appendChild(this.div);

            this.speed = -3;
            this.x = 1200;
            this.y = Math.floor(Math.random() * 270) + 1;
            this.height = 60;
            this.width = 60;
        }

        public draw():void {
            this.x += this.speed;
            this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";

            if(this.x <= -130){
                this.div.remove();
            }
        }
    }