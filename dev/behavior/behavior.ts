interface Behavior{
    yoshi : Player.Yoshi;

    performBehavior() : void;
    onGoUp() : void;
    onGoDown() : void;
    onGoForward() : void;
    onGoBack() : void;
    onShoot(): void;
}