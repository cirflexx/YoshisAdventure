var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Egg = (function () {
    function Egg(parent) {
        this.div = document.createElement("egg");
        parent.appendChild(this.div);
        this.speed = 5;
        this.y = 332;
        this.x = 0;
        this.height = 50;
        this.width = 50;
    }
    Egg.prototype.draw = function () {
    };
    return Egg;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.running = true;
        this.timer = 200;
        var container = document.getElementById("container");
        this.yoshi = new Yoshi(container, this);
        this.koopa = new Koopa(container);
        this.flyingKoopa = new FlyingKoopa(container);
        document.getElementsByTagName("refreshPage")[0].addEventListener("click", function () { return _this.refreshPage(); });
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.checkCollision();
        this.yoshi.update();
        this.koopa.draw();
        this.flyingKoopa.draw();
        if (this.running == true) {
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.refreshPage = function () {
        window.location.reload(true);
    };
    Game.prototype.checkCollision = function () {
        if (this.yoshi.x < this.koopa.x + this.koopa.width &&
            this.yoshi.x + this.yoshi.width > this.koopa.x &&
            this.yoshi.y < this.koopa.y + this.koopa.height &&
            this.yoshi.height + this.yoshi.y > this.koopa.y) {
            console.log("Collison ofzo");
            return this.collision = true;
        }
        else if (this.yoshi.x < this.flyingKoopa.x + this.flyingKoopa.width &&
            this.yoshi.x + this.yoshi.width > this.flyingKoopa.x &&
            this.yoshi.y < this.flyingKoopa.y + this.flyingKoopa.height &&
            this.yoshi.height + this.yoshi.y > this.flyingKoopa.y) {
            console.log("Collison ofzo");
            return this.collision = true;
        }
    };
    Game.prototype.gameOver = function (score) {
        document.getElementById("tryAgain").innerHTML = "Game over! Score: " + score + ". Click refresh button to try again.";
        document.getElementById("gameOver").innerHTML = "Game Over!";
        document.getElementById("plateau").classList.add("animationpaused");
        document.getElementById("sky").classList.add("animationpaused");
        console.log("You're a dead yoshi...");
        this.timer--;
        if (this.timer < 1) {
            this.running = false;
        }
        console.log(this.timer);
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
});
var VehicleCloud = (function () {
    function VehicleCloud(parent, _X, _Y) {
        this.div = document.createElement("vehicleCloud");
        parent.appendChild(this.div);
        this.speed = 0;
        this.x = _X;
        this.y = _Y;
        this.height = 50;
        this.width = 50;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }
    return VehicleCloud;
}());
var Yoshi = (function () {
    function Yoshi(parent, g) {
        var _this = this;
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
        var vehicleCloud = new VehicleCloud(this.div, -18, 50);
        this._behavior = new Move(this);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Object.defineProperty(Yoshi.prototype, "behavior", {
        get: function () {
            return this._behavior;
        },
        set: function (b) {
            this._behavior = b;
        },
        enumerable: true,
        configurable: true
    });
    Yoshi.prototype.onKeyDown = function (e) {
        console.log(e.key);
        if (e.key == 'w' && Game.getInstance().running == true) {
            this.onGoUp();
        }
        if (e.key == 's' && Game.getInstance().running == true) {
            this.onGoDown();
        }
        if (e.key == 'd' && Game.getInstance().running == true) {
            this.onGoForward();
        }
        if (e.key == 'a' && Game.getInstance().running == true) {
            this.onGoBack();
        }
        if (e.key == ' ' && Game.getInstance().running == true) {
        }
    };
    Yoshi.prototype.update = function () {
        this._behavior.performBehavior();
        this.onCollision();
        if (this.speed == 0 && Game.getInstance().collision == false) {
            this._behavior.onIdle();
        }
    };
    Yoshi.prototype.onCollision = function () {
        var g = Game.getInstance();
        if (Game.getInstance().collision == true) {
            this._behavior = new Dead(this);
            this._behavior.onDead();
            g.gameOver(Math.floor(this.score));
        }
        else {
            this.score += 0.040;
        }
    };
    Yoshi.prototype.onGoUp = function () {
        this._behavior.onGoUp();
    };
    Yoshi.prototype.onGoDown = function () {
        this._behavior.onGoDown();
    };
    Yoshi.prototype.onGoForward = function () {
        console.log("Running!");
        this._behavior.onGoForward();
    };
    Yoshi.prototype.onGoBack = function () {
        console.log("Running back!");
        this._behavior.onGoBack();
    };
    Yoshi.prototype.onIdle = function () {
        this._behavior.onIdle();
    };
    Yoshi.prototype.onDead = function () {
        this._behavior.onDead();
    };
    Yoshi.prototype.onShoot = function () {
        this._behavior.onShoot();
    };
    return Yoshi;
}());
var Dead = (function () {
    function Dead(y) {
        this.yoshi = y;
    }
    Dead.prototype.performBehavior = function () {
    };
    Dead.prototype.onDead = function () {
        this.yoshi.speed = 0;
        this.yoshi.div.style.backgroundImage = "url('images/yoshi-dead.gif')";
        this.yoshi.div.style.backgroundSize = "100%";
        this.yoshi.div.style.width = "70px";
        this.yoshi.div.style.height = "70px";
        ;
        Game.getInstance().gameOver();
    };
    Dead.prototype.onGoUp = function () {
    };
    Dead.prototype.onGoDown = function () {
    };
    Dead.prototype.onGoForward = function () {
    };
    Dead.prototype.onGoBack = function () {
    };
    Dead.prototype.onIdle = function () {
    };
    Dead.prototype.onShoot = function () {
    };
    return Dead;
}());
var Idle = (function () {
    function Idle(y) {
        this.yoshi = y;
    }
    Idle.prototype.performBehavior = function () {
    };
    Idle.prototype.onIdle = function () {
        this.yoshi.div.style.backgroundImage = "url('https://media.giphy.com/media/brvL9sNJZtFZe/giphy.gif?response_id=59205316163de286ba4848ec')";
    };
    Idle.prototype.onGoForward = function () {
        this.m.onGoForward();
    };
    Idle.prototype.onGoBack = function () {
        this.m.onGoBack();
    };
    Idle.prototype.onGoUp = function () {
        this.m.onGoUp();
    };
    Idle.prototype.onGoDown = function () {
        this.m.onGoDown();
    };
    Idle.prototype.onDead = function () {
        this.dead.onDead();
    };
    Idle.prototype.onShoot = function () {
        this.shoot.onShoot();
    };
    return Idle;
}());
var Move = (function () {
    function Move(y) {
        this.yoshi = y;
    }
    Move.prototype.performBehavior = function () {
        this.yoshi.div.style.transform = "translate(" + this.yoshi.x + "px," + this.yoshi.y + "px)";
    };
    Move.prototype.onGoForward = function () {
        this.yoshi.speed = 5;
        this.yoshi.x += this.yoshi.speed;
        if (this.yoshi.speed >= 1) {
            this.yoshi.speed = 1;
        }
        else {
            this.yoshi.speed += 1;
        }
    };
    Move.prototype.onGoBack = function () {
        this.yoshi.speed = 5;
        this.yoshi.x -= this.yoshi.speed;
    };
    Move.prototype.onGoUp = function () {
        this.yoshi.y -= this.yoshi.jumpDirection = 3;
        if (this.yoshi.y < 0) {
            this.yoshi.y = 0;
        }
    };
    Move.prototype.onGoDown = function () {
        this.yoshi.y += this.yoshi.jumpDirection = 3;
        if (this.yoshi.y > 332) {
            this.yoshi.y = 332;
        }
        console.log("this is Y: " + this.yoshi.y);
    };
    Move.prototype.onIdle = function () {
        this.yoshi.behavior = new Idle(this.yoshi);
    };
    Move.prototype.onDead = function () {
        this.yoshi.behavior = new Dead(this.yoshi);
    };
    Move.prototype.onShoot = function () {
        this.shoot.onShoot();
    };
    return Move;
}());
var Shoot = (function () {
    function Shoot() {
        var container = document.getElementById("container");
        this.egg = new Egg(container);
    }
    Shoot.prototype.performBehavior = function () {
        this.egg.div.style.transform = "translate(" + this.egg.x + "px," + this.egg.y + "px)";
    };
    Shoot.prototype.onShoot = function () {
        console.log("on shoot class");
        this.egg.x += this.egg.speed;
    };
    Shoot.prototype.onDead = function () {
        this.dead.onDead();
    };
    Shoot.prototype.onGoUp = function () {
        this.m.onGoUp();
    };
    Shoot.prototype.onGoDown = function () {
        this.m.onGoDown();
    };
    Shoot.prototype.onGoForward = function () {
        this.m.onGoForward();
    };
    Shoot.prototype.onGoBack = function () {
        this.m.onGoBack();
    };
    Shoot.prototype.onIdle = function () {
        this.idle.onIdle();
    };
    return Shoot;
}());
var Enemy = (function () {
    function Enemy(item, parent) {
        this.div = document.createElement(item);
        parent.appendChild(this.div);
        this.speed = -4;
    }
    Enemy.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -93) {
            this.x = 1283;
        }
    };
    return Enemy;
}());
var FlyingKoopa = (function (_super) {
    __extends(FlyingKoopa, _super);
    function FlyingKoopa(parent) {
        var _this = _super.call(this, "flying-koopa", parent) || this;
        _this.speed = -3;
        _this.x = 1000;
        _this.y = 250;
        _this.height = 70;
        _this.width = 70;
        return _this;
    }
    FlyingKoopa.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -130) {
            this.x = 900;
        }
    };
    return FlyingKoopa;
}(Enemy));
var Goomba = (function (_super) {
    __extends(Goomba, _super);
    function Goomba(parent) {
        var _this = _super.call(this, "goomba", parent) || this;
        _this.div = document.createElement("goomba");
        parent.appendChild(_this.div);
        _this.speed = -4;
        _this.x = 850;
        _this.y = 220;
        _this.height = 50;
        _this.width = 50;
        return _this;
    }
    Goomba.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -90) {
            this.x = 900;
        }
    };
    return Goomba;
}(Enemy));
var Koopa = (function (_super) {
    __extends(Koopa, _super);
    function Koopa(parent) {
        var _this = _super.call(this, "koopa", parent) || this;
        _this.speed = -5;
        _this.x = 800;
        _this.y = 352;
        _this.height = 50;
        _this.width = 50;
        return _this;
    }
    Koopa.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -90) {
            this.x = 900;
        }
    };
    return Koopa;
}(Enemy));
//# sourceMappingURL=main.js.map