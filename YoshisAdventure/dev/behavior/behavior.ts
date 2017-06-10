interface Behavior{
    yoshi : Yoshi;

    performBehavior() : void;
    onGoUp() : void;
    onGoDown() : void;
    onGoForward() : void;
    onGoBack() : void;
    onIdle() : void;
    onDead() : void;
    onShoot(): void;
}