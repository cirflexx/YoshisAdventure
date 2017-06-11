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
        this.running = true;
        this.timer = 200;
        this.score = 1;
        this.eggCollection = [];
        this.collisionArray = [];
        this.spawn50 = false;
        this.spawn100 = false;
        var container = document.getElementById("container");
        this.yoshi = new Player.Yoshi(container);
        this.koopa = new Enemies.Koopa(container);
        this.goomba = new Enemies.Goomba(container);
        this.flyingKoopa = new Enemies.FlyingKoopaRed.FlyingKoopa(container);
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
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.yoshi.update();
        this.koopa.draw();
        this.goomba.draw();
        this.flyingKoopa.draw();
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
            if (Utils.checkCollision(this.yoshi, enemy)) {
                this.yoshi.onEnemyCollision();
                this.gameOver();
            }
        }
        for (var _b = 0, _c = this.eggCollection; _b < _c.length; _b++) {
            var egg_2 = _c[_b];
            for (var _d = 0, _e = this.collisionArray; _d < _e.length; _d++) {
                var enemy = _e[_d];
                if (Utils.checkCollision(egg_2, enemy)) {
                    this.addScore();
                    enemy.x = 1000;
                    enemy.speed = Math.floor(Math.random() * -6) - 1;
                    if (enemy == this.collisionArray[2]) {
                        this.flyingKoopa.y = Math.floor(Math.random() * 300) + 1;
                    }
                    if (enemy == this.collisionArray[3]) {
                        this.flyingKoopa2.y = Math.floor(Math.random() * 300) + 1;
                    }
                    if (enemy == this.collisionArray[4]) {
                        this.lakitu.y = Math.floor(Math.random() * 300) + 1;
                    }
                    this.eggCollection.splice(egg_2, 1);
                    egg_2.div.remove();
                }
            }
            if (egg_2.x >= 1200) {
                this.eggCollection.splice(egg_2, 1);
                egg_2.div.remove();
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
            this.flyingKoopa2 = new Enemies.FlyingKoopaGreen.FlyingKoopa(container);
            this.collisionArray.push(this.flyingKoopa2);
            this.spawn50 = true;
        }
        else if (this.score > 100 && this.score < 120 && !this.spawn100) {
            this.lakitu = new Enemies.Lakitu(container);
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
        TweenLite.to(refreshbtn, 2, { x: -380, y: 270, scale: 1.5 });
        this.timer--;
        if (this.timer < 1) {
            this.running = false;
        }
        console.log(this.timer);
    };
    Game.prototype.showScore = function () {
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
var Idle = (function () {
    function Idle(y) {
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
        this.yoshi.speed = 7;
        this.yoshi.x += this.yoshi.speed;
    };
    Move.prototype.onGoBack = function () {
        this.yoshi.speed = 7;
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
    };
    Move.prototype.onShoot = function () {
        this.shoot.onShoot();
    };
    return Move;
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
            this.x = 900;
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
            function FlyingKoopa(parent) {
                var _this = _super.call(this, "flying-koopa", parent) || this;
                _this.speed = -3;
                _this.x = 1000;
                _this.y = Math.floor(Math.random() * 270) + 1;
                _this.height = 80;
                _this.width = 70;
                return _this;
            }
            FlyingKoopa.prototype.draw = function () {
                this.x += this.speed;
                this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
                if (this.x <= -130) {
                    this.x = 900;
                    this.y = Math.floor(Math.random() * 270) + 1;
                    this.speed = Math.floor(Math.random() * -6) - 1;
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
            function FlyingKoopa(parent) {
                var _this = _super.call(this, "flying-koopa2", parent) || this;
                _this.speed = -3;
                _this.x = 1000;
                _this.y = Math.floor(Math.random() * 270) + 1;
                _this.height = 70;
                _this.width = 70;
                return _this;
            }
            FlyingKoopa.prototype.draw = function () {
                this.x += this.speed;
                this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
                if (this.x <= -130) {
                    this.x = 900;
                    this.y = Math.floor(Math.random() * 270) + 1;
                    this.speed = Math.floor(Math.random() * -6) - 1;
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
        function Goomba(parent) {
            var _this = _super.call(this, "goomba", parent) || this;
            _this.speed = -4;
            _this.x = 850;
            _this.y = 352;
            _this.height = 50;
            _this.width = 50;
            return _this;
        }
        Goomba.prototype.draw = function () {
            _super.prototype.draw.call(this);
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
            _super.prototype.draw.call(this);
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
        function Lakitu(parent) {
            var _this = _super.call(this, "lakitu", parent) || this;
            _this.speed = -3;
            _this.x = 1000;
            _this.y = Math.floor(Math.random() * 270) + 1;
            _this.height = 70;
            _this.width = 70;
            return _this;
        }
        Lakitu.prototype.draw = function () {
            this.x += this.speed;
            this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
            if (this.x <= -130) {
                this.x = 900;
                this.y = Math.floor(Math.random() * 270) + 1;
                this.speed = Math.floor(Math.random() * -6) - 1;
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
            _this.behavior = new Move(_this);
            window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
            return _this;
        }
        Yoshi.prototype.onKeyDown = function (e) {
            console.log(e.key);
            if (e.keyCode == Controls.UP && Game.getInstance().running == true) {
                this.behavior = new Move(this);
                this.onGoUp();
            }
            if (e.keyCode == Controls.DOWN && Game.getInstance().running == true) {
                this.behavior = new Move(this);
                this.onGoDown();
            }
            if (e.keyCode == Controls.RIGHT && Game.getInstance().running == true) {
                this.behavior = new Move(this);
                this.onGoForward();
            }
            if (e.keyCode == Controls.LEFT && Game.getInstance().running == true) {
                this.behavior = new Move(this);
                this.onGoBack();
            }
            if (e.keyCode == Controls.SPACE && Game.getInstance().running == true) {
                this.shooting = true;
                if (this.timer > 20) {
                    this.timer = 1;
                    this.shooting = false;
                    this.onShoot();
                }
            }
        };
        Yoshi.prototype.update = function () {
            this.behavior.performBehavior();
            if (this.shooting = true) {
                this.timer++;
            }
        };
        Yoshi.prototype.onEnemyCollision = function () {
            this.behavior = new Dead(this);
        };
        Yoshi.prototype.onGoUp = function () {
            this.behavior.onGoUp();
        };
        Yoshi.prototype.onGoDown = function () {
            this.behavior.onGoDown();
        };
        Yoshi.prototype.onGoForward = function () {
            this.behavior.onGoForward();
        };
        Yoshi.prototype.onGoBack = function () {
            this.behavior.onGoBack();
        };
        Yoshi.prototype.onShoot = function () {
            this.behavior = new Shoot(this.x, this.y);
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