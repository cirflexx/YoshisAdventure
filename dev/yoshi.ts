/// <reference path="gameObject.ts" />

class Yoshi extends GameObject {
    private _behavior : Behavior
    public egg: Egg;

    public jumpDirection: number;
    private timer : number  = 1;
    private shooting : boolean = false;
    public score: number;

	public get behavior(): Behavior {
		return this._behavior;
	}

	public set behavior(b: Behavior) {
		this._behavior = b;
	}

    constructor(parent: HTMLElement) {
        super();
        this.div = document.createElement("yoshi");
        parent.appendChild(this.div);

        this.speed = 0;
        this.jumpDirection = -3;
        this.x = 18;
        this.y = 340;
        this.height = 70;
        this.width = 70; 

        let vehicleCloud = new VehicleCloud(this.div, -18, 50);

        this._behavior = new Move(this);

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    }


    private onKeyDown(e: KeyboardEvent): void {
        console.log(e.key);
        
        if(e.key == 'w' && Game.getInstance().running == true) {
            this._behavior = new Move(this);
            this.onGoUp();
        }

        if(e.key == 's' && Game.getInstance().running == true) {
            this._behavior = new Move(this);
            this.onGoDown();
        }

        if(e.key == 'd' && Game.getInstance().running == true) {
            this._behavior = new Move(this);
            this.onGoForward();
        }
        if(e.key ==  'a' && Game.getInstance().running == true){
            this._behavior = new Move(this);
            this.onGoBack();
        }
        if(e.key == ' ' && Game.getInstance().running == true){
            this.shooting = true;
            if(this.timer > 30){
                this.timer = 1;
                this.shooting = false;
                this.onShoot();
            }
        }
    }

    public update():void {
        // De animaties die in de behaviors staan worden uitgevoerd.
        this._behavior.performBehavior();

        if(this.shooting = true){
            this.timer ++;
        }

    } 

    public onEnemyCollision(){
        this._behavior = new Dead(this);
    }

    public onGoUp():void {
        // console.log("Jumping!");
        this._behavior.onGoUp();
    }

    public onGoDown():void {
        // console.log("Jumping!");
        this._behavior.onGoDown();
    }

    public onGoForward():void{
        console.log("Running!");
        this._behavior.onGoForward();
    }

    public onGoBack() : void{
        console.log("Running back!");
        this._behavior.onGoBack();
    }

    public onShoot(){
        this._behavior = new Shoot(this.x, this.y);
    }
}