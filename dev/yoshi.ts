class Yoshi {
    private game: Game;
    private vehicleCloud : VehicleCloud;
    private _behavior : Behavior

    public speed: number;
    public div: HTMLElement;
    public x: number;
    public y: number;
    public height : number;
    public width : number;
    public jumpDirection: number;

	public get behavior(): Behavior {
		return this._behavior;
	}

	public set behavior(b: Behavior) {
		this._behavior = b;
	}
    

    constructor(parent: HTMLElement, g: Game) {
        this.div = document.createElement("yoshi");
        parent.appendChild(this.div);
        this.game = g;
        this.speed = 0;
        this.jumpDirection = -3;
        this.x = 18;
        this.y = 340;
        this.height = 70;
        this.width = 70; 

        let vehicleCloud = new VehicleCloud(this.div, -18, 50);

        this._behavior = new MoveHorizontal(this);

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }


    private onKeyDown(e: KeyboardEvent): void {
        console.log(e.key);
        
        if(e.key == 'w' && Game.getInstance().running == true) {
            this._behavior = new MoveVertical(this);
            this.onGoUp();
        }

        if(e.key == 's' && Game.getInstance().running == true) {
            this._behavior = new MoveVertical(this);
            this.onGoDown();
        }

        if(e.key == 'd' && Game.getInstance().running == true) {
            // this.div.style.backgroundImage = "url('http://static.tumblr.com/4ea070e8e27105fc99069d5e21456305/ofhymms/XYMon1apq/tumblr_static_6cy45y7o5i0wocsgo0k4ks4gc.gif')";
            this._behavior = new MoveHorizontal(this);
            this.onGoForward();
        }
        if(e.key ==  'a' && Game.getInstance().running == true){
            // this.div.style.backgroundImage = "url('http://static.tumblr.com/4ea070e8e27105fc99069d5e21456305/ofhymms/XYMon1apq/tumblr_static_6cy45y7o5i0wocsgo0k4ks4gc.gif')";
            this._behavior = new MoveHorizontal(this);
            this.onGoBack();
        }
        if(e.key == ' ' && Game.getInstance().running == true){
            // this._behavior = new Shoot();
            // this.onShoot();
                //SCHIETEN!!!
        }
    }

    private onKeyUp(e: KeyboardEvent){
        if(e.key == ' ' || e.key == 'd' || e.key == 'a' ){
            this.speed = 0;
        }
    }

    public update():void {
        this._behavior.performBehavior();
        this.onCollision();
        if(this.speed == 0 && Game.getInstance().collision == false){
            this.onIdle();
        }
    } 

    public onCollision(){
        if(Game.getInstance().collision == true){
            this._behavior = new Dead(this);
            this.onDead();
        }
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
    
    public onIdle(){
        this._behavior.onIdle();
    }

    public onDead(){
        this._behavior.onDead();
    }
    public onShoot(){
        this._behavior.onShoot();
    }

}