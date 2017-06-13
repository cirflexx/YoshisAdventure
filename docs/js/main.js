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
var Game = (function () {
    function Game() {
        var _this = this;
        this.observers = new Array();
        this.timer = 200;
        this.speedTimer = 500;
        this.running = true;
        this.score = 0;
        this.powerupActive = false;
        this.eggCollection = [];
        this.collisionArray = [];
        this.spawn50 = false;
        this.spawn100 = false;
        this.spawn150 = false;
        var container = document.getElementById("container");
        this.yoshi = new Player.Yoshi(container);
        this.koopa = new Enemies.Koopa(container, this);
        this.goomba = new Enemies.Goomba(container, this);
        this.flyingKoopa = new Enemies.FlyingKoopaRed.FlyingKoopa(container, this);
        this.collisionArray.push(this.koopa);
        this.collisionArray.push(this.goomba);
        this.collisionArray.push(this.flyingKoopa);
        this.sky = document.getElementById("sky");
        this.plateau = document.getElementById("plateau");
        this.cloud = document.getElementById("cloud");
        TweenMax.to(this.sky, 3, { x: -800, y: 0, repeat: -1, ease: Linear.easeNone });
        TweenMax.to(this.plateau, 3, { x: -800, repeat: -1, ease: Linear.easeNone });
        TweenMax.to(this.cloud, 5, { x: -1200, repeat: -1, ease: Linear.easeNone });
        document.getElementsByTagName("refreshPage")[0].addEventListener("click", function () { return _this.refreshPage(); });
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Game.prototype.unsubscribe = function (o) {
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.yoshi.update();
        for (var _i = 0, _a = this.eggCollection; _i < _a.length; _i++) {
            var egg_1 = _a[_i];
            egg_1.draw();
        }
        this.liveScore();
        this.createEnemiesOnScore();
        this.checkCollision();
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
            enemy.draw();
            if (Utils.checkCollision(this.yoshi, enemy)) {
                this.yoshi.onEnemyCollision();
                this.gameOver();
            }
            if (this.powerup) {
                if (Utils.checkCollision(this.yoshi, this.powerup)) {
                    this.powerup.div.remove();
                    for (var _b = 0, _c = this.observers; _b < _c.length; _b++) {
                        var o = _c[_b];
                        o.notify();
                    }
                }
            }
        }
        for (var _d = 0, _e = this.eggCollection; _d < _e.length; _d++) {
            var egg_2 = _e[_d];
            for (var _f = 0, _g = this.collisionArray; _f < _g.length; _f++) {
                var enemy = _g[_f];
                if (Utils.checkCollision(egg_2, enemy)) {
                    this.addScore();
                    enemy.x = 1200;
                    if (!this.powerupActive) {
                        enemy.speed = Math.floor(Math.random() * -6) - 1;
                    }
                    if (enemy == this.collisionArray[2]) {
                        this.flyingKoopa.y = Math.floor(Math.random() * 300) + 1;
                    }
                    if (enemy == this.collisionArray[3]) {
                        this.flyingKoopa2.y = Math.floor(Math.random() * 300) + 1;
                    }
                    if (enemy == this.collisionArray[4]) {
                        this.lakitu.y = Math.floor(Math.random() * 300) + 1;
                    }
                    this.removeEgg(egg_2);
                }
            }
            if (egg_2.x <= -800) {
                this.removeEgg(egg_2);
            }
        }
    };
    Game.prototype.removeEgg = function (egg) {
        var i = this.eggCollection.indexOf(egg);
        if (i != -1) {
            this.eggCollection.splice(i, 1);
        }
        egg.div.remove();
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
            this.flyingKoopa2 = new Enemies.FlyingKoopaGreen.FlyingKoopa(container, this);
            this.collisionArray.push(this.flyingKoopa2);
            this.spawn50 = true;
        }
        else if (this.score > 100 && this.score < 120 && !this.spawn100) {
            this.lakitu = new Enemies.Lakitu(container, this);
            this.collisionArray.push(this.lakitu);
            this.spawn100 = true;
        }
        else if (this.score > 150 && this.score < 170 && !this.spawn150) {
            this.powerup = new Powerup(container);
            this.spawn150 = true;
        }
        if (this.spawn150) {
            this.powerup.draw();
        }
    };
    Game.prototype.gameOver = function () {
        var counter = { score: 0 };
        TweenMax.to(counter, 2, {
            score: Math.floor(this.score),
            onUpdate: function () {
                document.getElementById("endScore").innerHTML = " " + Math.floor(counter.score);
            },
            ease: Circ.easeOut
        });
        TweenMax.killTweensOf(this.sky);
        TweenMax.killTweensOf(this.plateau);
        TweenMax.killTweensOf(this.cloud);
        document.getElementById("score").innerHTML = "Score";
        document.getElementById("gameOver").innerHTML = "Game Over!";
        document.getElementById("tryAgain").innerHTML = "You are dead! Click refresh button to try again.";
        document.getElementById("liveScore").remove();
        var refreshbtn = document.getElementById("btn_refreshPage");
        TweenLite.to(refreshbtn, 2, { x: -365, y: 270, scale: 1.5 });
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
var GameObject = (function () {
    function GameObject() {
    }
    return GameObject;
}());
var Powerup = (function (_super) {
    __extends(Powerup, _super);
    function Powerup(parent) {
        var _this = _super.call(this) || this;
        _this.div = document.createElement("powerup");
        parent.appendChild(_this.div);
        _this.speed = -3;
        _this.x = 1200;
        _this.y = Math.floor(Math.random() * 270) + 1;
        _this.height = 60;
        _this.width = 60;
        return _this;
    }
    Powerup.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -130) {
            this.div.remove();
        }
    };
    return Powerup;
}(GameObject));
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
    Dead.prototype.move = function () {
    };
    Dead.prototype.onShoot = function () {
    };
    return Dead;
}());
var MoveDown = (function () {
    function MoveDown(y) {
        this.yoshi = y;
    }
    MoveDown.prototype.performBehavior = function () {
        this.yoshi.div.style.transform = "translate(" + this.yoshi.x + "px," + this.yoshi.y + "px)";
    };
    MoveDown.prototype.move = function () {
        this.yoshi.y += this.yoshi.jumpDirection = 4;
        if (this.yoshi.y > 332) {
            this.yoshi.y = 332;
        }
    };
    MoveDown.prototype.onShoot = function () {
    };
    return MoveDown;
}());
var MoveLeft = (function () {
    function MoveLeft(y) {
        this.yoshi = y;
    }
    MoveLeft.prototype.performBehavior = function () {
        this.yoshi.div.style.transform = "translate(" + this.yoshi.x + "px," + this.yoshi.y + "px)";
    };
    MoveLeft.prototype.move = function () {
        this.yoshi.speed = 4;
        this.yoshi.x -= this.yoshi.speed;
        if (this.yoshi.x < 0) {
            this.yoshi.x = 0;
        }
    };
    MoveLeft.prototype.onShoot = function () {
    };
    return MoveLeft;
}());
var MoveRight = (function () {
    function MoveRight(y) {
        this.yoshi = y;
    }
    MoveRight.prototype.performBehavior = function () {
        this.yoshi.div.style.transform = "translate(" + this.yoshi.x + "px," + this.yoshi.y + "px)";
    };
    MoveRight.prototype.move = function () {
        this.yoshi.speed = 4;
        this.yoshi.x += this.yoshi.speed;
        if (this.yoshi.x > 750) {
            this.yoshi.x = 750;
        }
    };
    MoveRight.prototype.onShoot = function () {
    };
    return MoveRight;
}());
var MoveUp = (function () {
    function MoveUp(y) {
        this.yoshi = y;
    }
    MoveUp.prototype.performBehavior = function () {
        this.yoshi.div.style.transform = "translate(" + this.yoshi.x + "px," + this.yoshi.y + "px)";
    };
    MoveUp.prototype.move = function () {
        this.yoshi.y -= this.yoshi.jumpDirection = 4;
        if (this.yoshi.y < 0) {
            this.yoshi.y = 0;
        }
    };
    MoveUp.prototype.onShoot = function () {
    };
    return MoveUp;
}());
var Shoot = (function () {
    function Shoot(x, y) {
        var egg = new Projectile.Egg(document.getElementById("container"), y, x);
        Game.getInstance().addEgg(egg);
    }
    Shoot.prototype.performBehavior = function () {
    };
    Shoot.prototype.onShoot = function () {
    };
    Shoot.prototype.move = function () {
    };
    return Shoot;
}());
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(item, parent) {
        var _this = _super.call(this) || this;
        _this.div = document.createElement(item);
        parent.appendChild(_this.div);
        _this.speed = -4;
        return _this;
    }
    Enemy.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -90) {
            this.x = 1200;
            Game.getInstance().score -= 10;
        }
    };
    return Enemy;
}(GameObject));
var Enemies;
(function (Enemies) {
    var FlyingKoopaRed;
    (function (FlyingKoopaRed) {
        var FlyingKoopa = (function (_super) {
            __extends(FlyingKoopa, _super);
            function FlyingKoopa(parent, subject) {
                var _this = _super.call(this, "flying-koopa", parent) || this;
                subject.subscribe(_this);
                _this.speed = -3;
                _this.x = 1000;
                _this.y = Math.floor(Math.random() * 270) + 1;
                _this.height = 80;
                _this.width = 70;
                return _this;
            }
            FlyingKoopa.prototype.notify = function () {
                this.changeMovementSpeed();
            };
            FlyingKoopa.prototype.changeMovementSpeed = function () {
                var _this = this;
                this.speed = -0.5;
                setInterval(function () { return _this.changeSpeedBack(); }, 5000);
            };
            FlyingKoopa.prototype.changeSpeedBack = function () {
                this.speed = -3;
            };
            FlyingKoopa.prototype.draw = function () {
                this.x += this.speed;
                this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
                if (this.x <= -130) {
                    this.x = 1200;
                    this.y = Math.floor(Math.random() * 270) + 1;
                    if (Game.getInstance().powerupActive == false) {
                        this.speed = Math.floor(Math.random() * -6) - 1;
                    }
                    Game.getInstance().score -= 10;
                }
            };
            return FlyingKoopa;
        }(Enemy));
        FlyingKoopaRed.FlyingKoopa = FlyingKoopa;
    })(FlyingKoopaRed = Enemies.FlyingKoopaRed || (Enemies.FlyingKoopaRed = {}));
})(Enemies || (Enemies = {}));
var fc1 = Enemies.FlyingKoopaRed.FlyingKoopa;
var Enemies;
(function (Enemies) {
    var FlyingKoopaGreen;
    (function (FlyingKoopaGreen) {
        var FlyingKoopa = (function (_super) {
            __extends(FlyingKoopa, _super);
            function FlyingKoopa(parent, subject) {
                var _this = _super.call(this, "flying-koopa2", parent) || this;
                subject.subscribe(_this);
                _this.speed = -3;
                _this.x = 1000;
                _this.y = Math.floor(Math.random() * 270) + 1;
                _this.height = 70;
                _this.width = 70;
                return _this;
            }
            FlyingKoopa.prototype.notify = function () {
                this.changeMovementSpeed();
            };
            FlyingKoopa.prototype.changeMovementSpeed = function () {
                var _this = this;
                this.speed = -0.5;
                setInterval(function () { return _this.changeSpeedBack(); }, 5000);
            };
            FlyingKoopa.prototype.changeSpeedBack = function () {
                this.speed = -3;
            };
            FlyingKoopa.prototype.draw = function () {
                this.x += this.speed;
                this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
                if (this.x <= -130) {
                    this.x = 1200;
                    this.y = Math.floor(Math.random() * 270) + 1;
                    if (Game.getInstance().powerupActive == false) {
                        this.speed = Math.floor(Math.random() * -6) - 1;
                    }
                    Game.getInstance().score -= 10;
                }
            };
            return FlyingKoopa;
        }(Enemy));
        FlyingKoopaGreen.FlyingKoopa = FlyingKoopa;
    })(FlyingKoopaGreen = Enemies.FlyingKoopaGreen || (Enemies.FlyingKoopaGreen = {}));
})(Enemies || (Enemies = {}));
var fc2 = Enemies.FlyingKoopaGreen.FlyingKoopa;
var Enemies;
(function (Enemies) {
    var Goomba = (function (_super) {
        __extends(Goomba, _super);
        function Goomba(parent, subject) {
            var _this = _super.call(this, "goomba", parent) || this;
            subject.subscribe(_this);
            _this.speed = -4;
            _this.x = 850;
            _this.y = 352;
            _this.height = 50;
            _this.width = 50;
            return _this;
        }
        Goomba.prototype.notify = function () {
            this.changeMovementSpeed();
        };
        Goomba.prototype.changeMovementSpeed = function () {
            var _this = this;
            this.speed = -0.5;
            setInterval(function () { return _this.changeSpeedBack(); }, 5000);
        };
        Goomba.prototype.changeSpeedBack = function () {
            this.speed = -5;
        };
        return Goomba;
    }(Enemy));
    Enemies.Goomba = Goomba;
})(Enemies || (Enemies = {}));
var goomba = Enemies.Goomba;
var Enemies;
(function (Enemies) {
    var Koopa = (function (_super) {
        __extends(Koopa, _super);
        function Koopa(parent, subject) {
            var _this = _super.call(this, "koopa", parent) || this;
            subject.subscribe(_this);
            _this.speed = -5;
            _this.x = 800;
            _this.y = 352;
            _this.height = 50;
            _this.width = 50;
            return _this;
        }
        Koopa.prototype.notify = function () {
            this.changeMovementSpeed();
        };
        Koopa.prototype.changeMovementSpeed = function () {
            var _this = this;
            this.speed = -0.5;
            setInterval(function () { return _this.changeSpeedBack(); }, 5000);
        };
        Koopa.prototype.changeSpeedBack = function () {
            this.speed = -5;
        };
        return Koopa;
    }(Enemy));
    Enemies.Koopa = Koopa;
})(Enemies || (Enemies = {}));
var koopa = Enemies.Koopa;
var Enemies;
(function (Enemies) {
    var Lakitu = (function (_super) {
        __extends(Lakitu, _super);
        function Lakitu(parent, subject) {
            var _this = _super.call(this, "lakitu", parent) || this;
            subject.subscribe(_this);
            _this.speed = -3;
            _this.x = 1000;
            _this.y = Math.floor(Math.random() * 270) + 1;
            _this.height = 70;
            _this.width = 70;
            return _this;
        }
        Lakitu.prototype.notify = function () {
            this.changeMovementSpeed();
        };
        Lakitu.prototype.changeMovementSpeed = function () {
            var _this = this;
            this.speed = -0.5;
            setInterval(function () { return _this.changeSpeedBack(); }, 5000);
        };
        Lakitu.prototype.changeSpeedBack = function () {
            this.speed = -3;
        };
        Lakitu.prototype.draw = function () {
            this.x += this.speed;
            this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
            if (this.x <= -130) {
                this.x = 1200;
                this.y = Math.floor(Math.random() * 270) + 1;
                if (Game.getInstance().powerupActive == false) {
                    this.speed = Math.floor(Math.random() * -6) - 1;
                }
                Game.getInstance().score -= 10;
            }
        };
        return Lakitu;
    }(Enemy));
    Enemies.Lakitu = Lakitu;
})(Enemies || (Enemies = {}));
var lakitu = Enemies.Lakitu;
var Controls;
(function (Controls) {
    Controls[Controls["LEFT"] = 65] = "LEFT";
    Controls[Controls["RIGHT"] = 68] = "RIGHT";
    Controls[Controls["DOWN"] = 83] = "DOWN";
    Controls[Controls["UP"] = 87] = "UP";
    Controls[Controls["SPACE"] = 32] = "SPACE";
})(Controls || (Controls = {}));
var Player;
(function (Player) {
    var VehicleCloud = (function (_super) {
        __extends(VehicleCloud, _super);
        function VehicleCloud(parent, _X, _Y) {
            var _this = _super.call(this) || this;
            _this.div = document.createElement("vehicleCloud");
            parent.appendChild(_this.div);
            _this.speed = 0;
            _this.x = _X;
            _this.y = _Y;
            _this.height = 50;
            _this.width = 50;
            _this.div.style.transform = "translate(" + _this.x + "px," + _this.y + "px)";
            return _this;
        }
        return VehicleCloud;
    }(GameObject));
    Player.VehicleCloud = VehicleCloud;
})(Player || (Player = {}));
var vh = Player.VehicleCloud;
var Player;
(function (Player) {
    var Yoshi = (function (_super) {
        __extends(Yoshi, _super);
        function Yoshi(parent) {
            var _this = _super.call(this) || this;
            _this.timer = 1;
            _this.shooting = false;
            _this.div = document.createElement("yoshi");
            parent.appendChild(_this.div);
            _this.speed = 0;
            _this.jumpDirection = -3;
            _this.x = 18;
            _this.y = 340;
            _this.height = 70;
            _this.width = 70;
            var vehicleCloud = new Player.VehicleCloud(_this.div, -18, 50);
            _this.behavior = new MoveLeft(_this);
            window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
            window.addEventListener("mousedown", function (e) { return _this.onKeyDown(e); });
            return _this;
        }
        Yoshi.prototype.onKeyDown = function (e) {
            if (e instanceof KeyboardEvent) {
                if (e.keyCode == Controls.UP && Game.getInstance().running == true) {
                    this.behavior = new MoveUp(this);
                }
                if (e.keyCode == Controls.DOWN && Game.getInstance().running == true) {
                    this.behavior = new MoveDown(this);
                }
                if (e.keyCode == Controls.RIGHT && Game.getInstance().running == true) {
                    this.behavior = new MoveRight(this);
                }
                if (e.keyCode == Controls.LEFT && Game.getInstance().running == true) {
                    this.behavior = new MoveLeft(this);
                }
                if (e.keyCode == Controls.SPACE && Game.getInstance().running == true) {
                    this.onShoot();
                }
            }
            if (e instanceof MouseEvent) {
                this.onShoot();
            }
        };
        Yoshi.prototype.update = function () {
            this.behavior.performBehavior();
            this.behavior.move();
            if (this.shooting = true) {
                this.timer++;
            }
        };
        Yoshi.prototype.onEnemyCollision = function () {
            this.behavior = new Dead(this);
        };
        Yoshi.prototype.onShoot = function () {
            this.shooting = true;
            if (this.timer > 20) {
                this.timer = 1;
                this.shooting = false;
                this.behavior = new Shoot(this.x, this.y);
            }
        };
        return Yoshi;
    }(GameObject));
    Player.Yoshi = Yoshi;
})(Player || (Player = {}));
var yoshi = Player.Yoshi;
var Projectile;
(function (Projectile) {
    var Egg = (function (_super) {
        __extends(Egg, _super);
        function Egg(parent, y, x) {
            var _this = _super.call(this) || this;
            _this.div = document.createElement("egg");
            parent.appendChild(_this.div);
            _this.speed = 5;
            _this.y = y;
            _this.x = x;
            _this.height = 50;
            _this.width = 50;
            return _this;
        }
        Egg.prototype.draw = function () {
            this.x += this.speed;
            this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        };
        return Egg;
    }(GameObject));
    Projectile.Egg = Egg;
})(Projectile || (Projectile = {}));
var egg = Projectile.Egg;
//# sourceMappingURL=main.js.map