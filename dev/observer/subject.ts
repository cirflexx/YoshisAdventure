interface Subject{
    observers: Array <Observer>;
    subscribe(o:Observer) : void;
    unsubscribe(o:Observer) : void;
}