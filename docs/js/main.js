var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject() {
    }
    return GameObject;
}());
var Egg = (function (_super) {
    __extends(Egg, _super);
    function Egg(parent, y, x) {
        _super.call(this);
        this.div = document.createElement("egg");
        parent.appendChild(this.div);
        this.speed = 5;
        this.y = y;
        this.x = x;
        this.height = 50;
        this.width = 50;
    }
    Egg.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return Egg;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.collisionArray = [];
        this.running = true;
        this.timer = 200;
        this.eggCollection = [];
        this.score = 1;
        this.spawn50 = false;
        this.spawn100 = false;
        var container = document.getElementById("container");
        this.yoshi = new Yoshi(container);
        this.koopa = new Koopa(container);
        this.goomba = new Goomba(container);
        this.flyingKoopa = new FlyingKoopa(container);
        this.collisionArray.push(this.koopa);
        this.collisionArray.push(this.goomba);
        this.collisionArray.push(this.flyingKoopa);
        console.log(this.collisionArray);
        this.score = 1;
        this.liveScore();
        document.getElementsByTagName("refreshPage")[0].addEventListener("click", function () { return _this.refreshPage(); });
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.checkCollision();
        this.yoshi.update();
        this.koopa.draw();
        this.goomba.draw();
        this.flyingKoopa.draw();
        for (var _i = 0, _a = this.eggCollection; _i < _a.length; _i++) {
            var egg = _a[_i];
            egg.draw();
        }
        this.liveScore();
        this.createEnemiesOnScore();
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
        var container = document.getElementById('container');
        for (var _i = 0, _a = this.collisionArray; _i < _a.length; _i++) {
            var enemy = _a[_i];
            if (Utils.checkCollision(this.yoshi, enemy)) {
                console.log(enemy + " raakt yoshi");
                this.yoshi.onEnemyCollision();
                this.gameOver();
            }
        }
        for (var _b = 0, _c = this.eggCollection; _b < _c.length; _b++) {
            var egg = _c[_b];
            for (var _d = 0, _e = this.collisionArray; _d < _e.length; _d++) {
                var enemy = _e[_d];
                if (Utils.checkCollision(egg, enemy)) {
                    console.log(egg + " raakt enemy");
                    this.addScore();
                    this.eggCollection.splice(egg, 1);
                    container.removeChild(egg.div);
                    enemy.x = 1000;
                    enemy.speed = Math.floor(Math.random() * -6) - 1;
                    if (enemy == this.collisionArray[2]) {
                        this.collisionArray[2].y = Math.floor(Math.random() * 300) + 1;
                    }
                    if (enemy == this.collisionArray[3]) {
                        this.collisionArray[3].y = Math.floor(Math.random() * 300) + 1;
                    }
                    if (enemy == this.collisionArray[4]) {
                        this.collisionArray[4].y = Math.floor(Math.random() * 300) + 1;
                    }
                }
            }
            if (egg.x >= 1200) {
                console.log(this.eggCollection);
                this.eggCollection.splice(egg, 1);
                container.removeChild(egg.div);
            }
        }
    };
    Game.prototype.liveScore = function () {
        this.score += 0.020;
        document.getElementById("liveScore").innerHTML = "Score: " + Math.floor(this.score);
    };
    Game.prototype.addScore = function () {
        this.score += 10;
    };
    Game.prototype.createEnemiesOnScore = function () {
        var container = document.getElementById("container");
        if (this.score > 50 && this.score < 70 && !this.spawn50) {
            this.flyingKoopa2 = new FlyingKoopa2(container);
            this.collisionArray.push(this.flyingKoopa2);
            this.spawn50 = true;
        }
        else if (this.score > 100 && this.score < 120 && !this.spawn100) {
            this.lakitu = new Lakitu(container);
            this.collisionArray.push(this.lakitu);
            this.spawn100 = true;
        }
        if (this.spawn50) {
            this.flyingKoopa2.draw();
        }
        if (this.spawn100) {
            this.lakitu.draw();
        }
    };
    Game.prototype.gameOver = function () {
        document.getElementById("tryAgain").innerHTML = "Game over! Score: " + Math.floor(this.score) + ". Click refresh button to try again.";
        document.getElementById("liveScore").remove();
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
    Game.prototype.addEgg = function (egg) {
        this.eggCollection.push(egg);
        console.log(this.eggCollection);
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
});
var Utils = (function () {
    function Utils() {
    }
    Utils.checkCollision = function (go1, go2) {
        return (go1.x < go2.x + go2.width &&
            go1.x + go1.width > go2.x &&
            go1.y < go2.y + go1.height &&
            go1.height + go1.y > go2.y);
    };
    return Utils;
}());
var VehicleCloud = (function (_super) {
    __extends(VehicleCloud, _super);
    function VehicleCloud(parent, _X, _Y) {
        _super.call(this);
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
}(GameObject));
var Yoshi = (function (_super) {
    __extends(Yoshi, _super);
    function Yoshi(parent) {
        var _this = this;
        _super.call(this);
        this.timer = 1;
        this.shooting = false;
        this.div = document.createElement("yoshi");
        parent.appendChild(this.div);
        this.speed = 0;
        this.jumpDirection = -3;
        this.x = 18;
        this.y = 340;
        this.height = 70;
        this.width = 70;
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
            this._behavior = new Move(this);
            this.onGoUp();
        }
        if (e.key == 's' && Game.getInstance().running == true) {
            this._behavior = new Move(this);
            this.onGoDown();
        }
        if (e.key == 'd' && Game.getInstance().running == true) {
            this._behavior = new Move(this);
            this.onGoForward();
        }
        if (e.key == 'a' && Game.getInstance().running == true) {
            this._behavior = new Move(this);
            this.onGoBack();
        }
        if (e.key == ' ' && Game.getInstance().running == true) {
            this.shooting = true;
            if (this.timer > 30) {
                this.timer = 1;
                this.shooting = false;
                this.onShoot();
            }
        }
    };
    Yoshi.prototype.update = function () {
        this._behavior.performBehavior();
        if (this.shooting = true) {
            this.timer++;
        }
    };
    Yoshi.prototype.onEnemyCollision = function () {
        this._behavior = new Dead(this);
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
    Yoshi.prototype.onShoot = function () {
        this._behavior = new Shoot(this.x, this.y);
    };
    return Yoshi;
}(GameObject));
var Dead = (function () {
    function Dead(y) {
        this.yoshi = y;
        this.yoshi.speed = 0;
        this.yoshi.div.style.backgroundImage = "url('images/yoshi-dead.gif')";
        this.yoshi.div.style.backgroundSize = "100%";
        this.yoshi.div.style.width = "70px";
        this.yoshi.div.style.height = "70px";
        ;
    }
    Dead.prototype.performBehavior = function () {
    };
    Dead.prototype.onGoUp = function () {
    };
    Dead.prototype.onGoDown = function () {
    };
    Dead.prototype.onGoForward = function () {
    };
    Dead.prototype.onGoBack = function () {
    };
    Dead.prototype.onShoot = function () {
    };
    return Dead;
}());
var Move = (function () {
    function Move(y) {
        this.yoshi = y;
    }
    Move.prototype.performBehavior = function () {
        this.yoshi.div.style.transform = "translate(" + this.yoshi.x + "px," + this.yoshi.y + "px)";
    };
    Move.prototype.onGoForward = function () {
        this.yoshi.speed = 7;
        this.yoshi.x += this.yoshi.speed;
    };
    Move.prototype.onGoBack = function () {
        this.yoshi.speed = 5;
        this.yoshi.x -= this.yoshi.speed;
        if (this.yoshi.x < 0) {
            this.yoshi.x = 0;
        }
    };
    Move.prototype.onGoUp = function () {
        this.yoshi.y -= this.yoshi.jumpDirection = 7;
        if (this.yoshi.y < 0) {
            this.yoshi.y = 0;
        }
    };
    Move.prototype.onGoDown = function () {
        this.yoshi.y += this.yoshi.jumpDirection = 7;
        if (this.yoshi.y > 332) {
            this.yoshi.y = 332;
        }
        console.log("this is Y: " + this.yoshi.y);
    };
    Move.prototype.onShoot = function () {
        this.shoot.onShoot();
    };
    return Move;
}());
var Shoot = (function () {
    function Shoot(x, y) {
        var egg = new Egg(document.getElementById("container"), y, x);
        Game.getInstance().addEgg(egg);
    }
    Shoot.prototype.performBehavior = function () {
    };
    Shoot.prototype.onShoot = function () {
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
    return Shoot;
}());
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(item, parent) {
        _super.call(this);
        this.div = document.createElement(item);
        parent.appendChild(this.div);
        this.speed = -4;
    }
    return Enemy;
}(GameObject));
var FlyingKoopa = (function (_super) {
    __extends(FlyingKoopa, _super);
    function FlyingKoopa(parent) {
        _super.call(this, "flying-koopa", parent);
        this.speed = -3;
        this.x = 1000;
        this.y = Math.floor(Math.random() * 270) + 1;
        this.height = 70;
        this.width = 70;
    }
    FlyingKoopa.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -130) {
            this.x = 900;
            this.y = Math.floor(Math.random() * 270) + 1;
            this.speed = Math.floor(Math.random() * -6) - 1;
            Game.getInstance().score -= 5;
        }
    };
    return FlyingKoopa;
}(Enemy));
var FlyingKoopa2 = (function (_super) {
    __extends(FlyingKoopa2, _super);
    function FlyingKoopa2(parent) {
        _super.call(this, "flying-koopa2", parent);
        this.speed = -3;
        this.x = 1000;
        this.y = Math.floor(Math.random() * 270) + 1;
        this.height = 70;
        this.width = 70;
    }
    FlyingKoopa2.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -130) {
            this.x = 900;
            this.y = Math.floor(Math.random() * 270) + 1;
            this.speed = Math.floor(Math.random() * -6) - 1;
            Game.getInstance().score -= 5;
        }
    };
    return FlyingKoopa2;
}(Enemy));
var Goomba = (function (_super) {
    __extends(Goomba, _super);
    function Goomba(parent) {
        _super.call(this, "goomba", parent);
        this.speed = -4;
        this.x = 850;
        this.y = 352;
        this.height = 50;
        this.width = 50;
    }
    Goomba.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -90) {
            this.x = 900;
            Game.getInstance().score -= 5;
        }
    };
    return Goomba;
}(Enemy));
var Koopa = (function (_super) {
    __extends(Koopa, _super);
    function Koopa(parent) {
        _super.call(this, "koopa", parent);
        this.speed = -5;
        this.x = 800;
        this.y = 352;
        this.height = 50;
        this.width = 50;
    }
    Koopa.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -90) {
            this.x = 900;
            Game.getInstance().score -= 5;
        }
    };
    return Koopa;
}(Enemy));
var Lakitu = (function (_super) {
    __extends(Lakitu, _super);
    function Lakitu(parent) {
        _super.call(this, "lakitu", parent);
        this.speed = -3;
        this.x = 1000;
        this.y = Math.floor(Math.random() * 270) + 1;
        this.height = 70;
        this.width = 70;
    }
    Lakitu.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -130) {
            this.x = 900;
            this.y = Math.floor(Math.random() * 270) + 1;
            this.speed = Math.floor(Math.random() * -6) - 1;
            Game.getInstance().score -= 5;
        }
    };
    return Lakitu;
}(Enemy));
//# sourceMappingURL=main.js.map