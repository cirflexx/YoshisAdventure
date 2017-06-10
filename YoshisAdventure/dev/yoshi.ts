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

    // Code door Robin
    public score : number;

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
        this.score = 1;

        let vehicleCloud = new VehicleCloud(this.div, -18, 50);

        this._behavior = new Move(this);

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        //window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }


    private onKeyDown(e: KeyboardEvent): void {
        console.log(e.key);
        
        if(e.key == 'w' && Game.getInstance().running == true) {
            // Code door Robin
            this.onGoUp();

            /*this._behavior = new MoveVertical(this);
            this.onGoUp();*/
        }

        if(e.key == 's' && Game.getInstance().running == true) {
            // Code door Robin
            this.onGoDown();

            /*this._behavior = new MoveVertical(this);
            this.onGoDown();*/
        }

        if(e.key == 'd' && Game.getInstance().running == true) {
            // Code door Robin
            this.onGoForward();
            
            // this.div.style.backgroundImage = "url('http://static.tumblr.com/4ea070e8e27105fc99069d5e21456305/ofhymms/XYMon1apq/tumblr_static_6cy45y7o5i0wocsgo0k4ks4gc.gif')";
            //this._behavior = new MoveHorizontal(this);
            //this.onGoForward();
        }
        if(e.key ==  'a' && Game.getInstance().running == true){
            // Code door Robin
            this.onGoBack();

            // this.div.style.backgroundImage = "url('http://static.tumblr.com/4ea070e8e27105fc99069d5e21456305/ofhymms/XYMon1apq/tumblr_static_6cy45y7o5i0wocsgo0k4ks4gc.gif')";
            //this._behavior = new MoveHorizontal(this);
            //this.onGoBack();
        }
        if(e.key == ' ' && Game.getInstance().running == true){
            // this._behavior = new Shoot();
            // this.onShoot();
                //SCHIETEN!!!
        }
    }

    /*private onKeyUp(e: KeyboardEvent){
        if(e.key == ' ' || e.key == 'd' || e.key == 'a' ){

            // Commentaar door Robin
            // Maak het spel wat uitdagender door dit stukje code weg te halen. Je snelheid wordt dan niet teruggezet naar 0. Dit geeft een wat vloeiender Yoshi
            // In MoveVertical en MoveHorizontal wordt er wel een minimale en maximale snelheid gegeven, zodat je niet oneindig snel kan gaan.
            //this.speed = 0;
        }
    }*/

    public update():void {

        
        this._behavior.performBehavior();
        this.onCollision();
        if(this.speed == 0 && Game.getInstance().collision == false){
            this._behavior.onIdle();
            //this.onIdle();
        }

         // Code door Robin
         // Mocht je je score in het scherm willen laten zien, dan moet je dit gebruiken. Voor nu staat het best wel onoverzichtelijk in het scherm.
         //document.getElementById("tryAgain").innerHTML = "Score: " + Math.floor(this.score);
    } 

    public onCollision(){
        // Code door Robin, volgens presentatie PRG01-8_les2, slide 19
        let g : Game = Game.getInstance();

        if(Game.getInstance().collision == true){
            this._behavior = new Dead(this);
            this._behavior.onDead();

            // Code door Robin, volgens presentatie PRG01-8_les2, slide 19
            // Als je dood bent, is het gelijk game over. Geef de score dan mee (math.floor is afronden).
            g.gameOver(Math.floor(this.score));
            
            
            
            //this.onDead();

        // Code door Robin. Wanneer er geen collision is, tel dan de score op (hoe langer je leeft, hoe meer punten je krijgt)
        }else{
            this.score += 0.040;
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